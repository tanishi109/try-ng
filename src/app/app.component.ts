import { Component, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AppService, Commands } from './app.service';

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
        return [37, 38, 39, 40, 90].includes(keyCode);
      })
      .timeout(100)
      .retry()
      .buffer(Observable.interval(100))
      .map((keyCodes: number[]) => {
        if (keyCodes.includes(39) && keyCodes.includes(40)) {
          return Commands.RightDown;
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

        if (commands.length < 4) {
          return commands;
        }
        return commands.slice(commands.length - 4, commands.length);
      }, [])
      .timeout(1000)
      .retry()
      .subscribe((commands: string[]) => {
        if (commands[0] === Commands.Right && commands[1] === Commands.Down && commands[2] === Commands.RightDown && commands[3] === Commands.P) {
          console.log('٩( ᐛ )و');
        }
        if (commands[0] === Commands.Right && commands[1] === Commands.RightDown && commands[2] === Commands.Down && commands[3] === Commands.P) {
          console.log('_(┐「ε:)_');
        }
        if (commands[0] === Commands.Down && commands[1] === Commands.RightDown && commands[2] === Commands.Right && commands[3] === Commands.P) {
          console.log('三(卍^o^)卍');
        }
        this.player.commands = commands;
      })

    let prevValue = '0';
    this.gamePadEvents
      .subscribe((command: string) => {
        if (command !== prevValue && command !== Commands.Neutral) {
          this.commandEvents.next(command);
        }

        prevValue = command;
      })

    new GamePadManager((gamepad: Gamepad) => { // tslint:disable-line
      const crossKeyCode = gamepad.axes[gamepad.axes.length - 1];
      const command = appService.getCommandFromProConKeyCode(crossKeyCode);
      const pad = gamepad.buttons.map((button, index) => {
        if (button.pressed) {
          return appService.getCommandFromProConKeyCode(parseFloat(`${index}`));
        }
      });

      pad
        .filter((c) => !!c)
        .forEach((c) => {
          this.gamePadEvents.next(c);
        });

      this.gamePadEvents.next(command);
    });
  }
  @HostListener('keydown') handleKey($event) {
    const keyCode = $event.keyCode;
    this.keyEvents.next(keyCode);
  };
}
