import { Component, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AppService, Commands } from './app.service';
import { times, isEqual } from 'lodash';

import GamePadManager from './GamePadManager';

interface PlayerMove {
  move: Commands[];
  finished: boolean;
}

export class Player {
  entry: number;
  name: string;
  commands: string[];
  move: PlayerMove[];
  score: number;

  getCurrentMove?() {
    const currentMoveIndex = 1;
    
    return this.move[currentMoveIndex];
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent {
  title = 'My First Angular App';
  player: Player = { // TODO: new Player() にする？
    entry: 1,
    name: 'Player',
    commands: [],
    move: [],
  };
    score: 0,
  private keyEvents = new Subject();
  private commandEvents = new Subject();
  private gamePadEvents = new Subject();
  constructor(private appService: AppService) {
    times(currentMoveIndex + 1).forEach(() => {
      this.player.move.push({
        move: this.appService.rollMoveDice(),
        finished: false,
      });
    });

    this.keyEvents
      .filter((keyCode: number) => {
        return [37, 38, 39, 40, 90].includes(keyCode);
      })
      .timeout(100)
      .retry()
      .buffer(Observable.interval(100))
      .map((keyCodes: number[]) => {
        if (keyCodes.includes(37) && keyCodes.includes(40)) {
          return Commands.LeftDown;
        }
        if (keyCodes.includes(39) && keyCodes.includes(40)) {
          return Commands.RightDown;
        }
        if (keyCodes.includes(37) && keyCodes.includes(38)) {
          return Commands.LeftUp;
        }
        if (keyCodes.includes(39) && keyCodes.includes(38)) {
          return Commands.RightUp;
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
      .timeout(1000) // TODO: 20f
      .retry()
      .subscribe((commands: string[]) => {
        if (isEqual(this.player.move, commands)) {
          this.player.move = appService.rollMoveDice();
          this.player.score += 1;
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

  getMoveView() {
    return this.player.move.map((command) => {
      return commandName[command];
    });
  }
}

const commandName = {
  '1': '↙',
  '2': '↓',
  '3': '︎↘︎',
  '4': '←',
  // '5': '',
  '6': '→',
  '7': '↖︎',
  '8': '↑ ',
  '9': '↗︎',
  'p': 'P',
};
