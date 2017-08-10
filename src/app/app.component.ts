import { Component, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AppService, Commands } from './app.service';
import { times, isEqual } from 'lodash';

import GamePadManager from './GamePadManager';

// Task

interface ITask {
  move: Commands[];
  finished: boolean;
}

export class Task implements ITask {
  move = [];
  finished = false;

  constructor(move, finished = false) {
    this.move = move;
    this.finished = finished;
  }
}

// Player

interface IPlayer {
  commands: string[];
  taskQueue: Task[];
  score: number;
  currentMoveIndex: number;
}

export class Player implements IPlayer {
  commands = [];
  taskQueue = [];
  score = 0;
  currentMoveIndex = 1;

  constructor(params = {}) {
    Object.keys(params).forEach((key) => {
      this[key] = params[key];
    });
  }

  getCurrentMove() {
    return this.taskQueue[this.currentMoveIndex].move;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent {
  player: Player = new Player();
  private keyEvents = new Subject();
  private commandEvents = new Subject();
  private gamePadEvents = new Subject();
  constructor(private appService: AppService) {
    // これはPlayerにやらせる
    times(this.player.currentMoveIndex + 1).forEach(() => {
      this.player.taskQueue.push(
        new Task(this.appService.rollMoveDice()) // rollはTaskの中でやってくれ
      );
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
        // ここでgetするんじゃ無く、playerにcurrentCommandみたいなのをセットして
        // 上のifはPlayerのドメインモデルが持てる
        return appService.getCommandFromKeyCode(keyCodes[0]);
      })
      .filter((command: string) => !!command)
      .subscribe((command: string) => {
        // getCurrentCommandすると取得できるとか？
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
        // これもPlayerが持つ. isEq(commandsQueue)
        if (isEqual(this.player.getCurrentMove(), commands)) {
          // ここはPlayerでやる
          // player.doneMove()
          // add new move
          this.player.taskQueue = [
            {
              move: appService.rollMoveDice(),
              finished: false,
            },
            ...this.player.taskQueue,
          ];
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

    // Gamepadインフラストラクチャ
    new GamePadManager((gamepad: Gamepad) => { // tslint:disable-line
      const crossKeyCode = gamepad.axes[gamepad.axes.length - 1]; // getCrossKeyにする
      const command = appService.getCommandFromProConKeyCode(crossKeyCode);
      const pad = gamepad.buttons.map((button, index) => {
        if (button.pressed) {
          // これはGamepadドメインモデルにconverter的に定義したい(腐敗防止層)
          // appServiceは分割されるべきっぽい
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
