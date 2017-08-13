import { Component, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { Commands } from 'app/domain/Command';
import GamepadDomain from 'app/domain/Gamepad';
import playerApp from 'app/application/player';
import { GamepadInfra } from 'app/infra/Gamepad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent {
  player = playerApp.init();
  isMoving = false;
  moveDuration = 250;
  taskStyle = {
    'animation-duration': `${this.moveDuration}ms`,
  };
  private keyEvents = new Subject();
  private commandEvents = new Subject();
  private gamePadEvents = new Subject();

  constructor() {
    this.keyEvents
      .filter((keyCode: number) => {
        return [37, 38, 39, 40, 90].includes(keyCode);
      })
      .timeout(100)
      .retry()
      .buffer(Observable.interval(100))
      .map((keyCodes: number[]) => {
        const commands = keyCodes.map((c) => {
          return GamepadDomain.getCommandFromKeyCode(c);
        });

        playerApp.setCurrentCommand(this.player, commands);

        return playerApp.getCurrentCommand(this.player);
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
        if (playerApp.isEq(this.player, commands)) {
          this.animate();
          playerApp.doneTask(this.player);
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

    new GamepadInfra((gamepad: Gamepad) => { // tslint:disable-line
      const crossKeyCode = gamepad.axes[gamepad.axes.length - 1]; // getCrossKeyにする
      const command = GamepadDomain.getCommandFromProConKeyCode(crossKeyCode);
      const pad = gamepad.buttons.map((button, index) => {
        if (button.pressed) {
          return GamepadDomain.getCommandFromProConKeyCode(parseFloat(`${index}`));
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

  animate() {
    this.isMoving = true;
    setTimeout(() => {
      this.isMoving = false;
    }, this.moveDuration);
  }
}
