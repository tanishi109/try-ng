import { Component, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AppService } from './app.service';

import GamePadManager from './GamePadManager';

export class Player {
  entry: number;
  name: string;
  commands: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent {
  title = 'My First Angular App';
  player: Player = {
    entry: 1,
    name: 'Player',
    commands: [],
  };
  private keyEvents = new Subject();
  private commandEvents = new Subject();
  private gamePadEvents = new Subject();
  constructor(private appService: AppService) {
    this.keyEvents
      .filter((keyCode: number) => {
        return [37, 38, 39, 40].includes(keyCode);
      })
      .timeout(100)
      .retry()
      .buffer(Observable.interval(100))
      .map((keyCodes: number[]) => {
        if (keyCodes.includes(39) && keyCodes.includes(40)) {
          return '9';
        }
        return appService.getCommandFromKeyCode(keyCodes[0]);
      })
      .filter((command: string) => !!command)
      .subscribe((command: string) => {
        this.commandEvents.next(command);
      });

    this.commandEvents
      .scan((acc: string[], value: string) => {
        const commands = acc.concat(value);

        if (commands.length < 3) {
          return commands;
        }
        return commands.slice(commands.length - 3, commands.length);
      }, [])
      .timeout(1000)
      .retry()
      .subscribe((commands: string[]) => {
        if (commands[0] === '6' && commands[1] === '8' && commands[2] === '9') {
          console.log('!!');
        }
        this.player.commands = commands;
      })

    let n = '0';
    this.gamePadEvents
      .subscribe((command: string) => {
        if (command !== n && command !== '5') {
          this.commandEvents.next(command);
        }

        n = command;
      })

    new GamePadManager((gamepad: Gamepad) => { // tslint:disable-line
      const crossKeyCode = gamepad.axes[gamepad.axes.length - 1];
      const command = appService.getCommandFromProConKeyCode(crossKeyCode);

      this.gamePadEvents.next(command);
    });
  }
  @HostListener('keydown') handleKey($event) {
    const keyCode = $event.keyCode;
    this.keyEvents.next(keyCode);
  };
}
