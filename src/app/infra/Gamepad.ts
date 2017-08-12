import {times, compact} from 'lodash';

type handler = (gp: Gamepad) => void;

export class GamepadInfra {
  private handleGamepad: handler;

  constructor(handleGamepad: handler) {
    window.addEventListener('gamepadconnected', this.onConnect, false);
    window.addEventListener('gamepaddisconnected', this.onDisconnect, false);

    this.handleGamepad = handleGamepad;
    this.update();
  }

  private update() {
    this.updateGamepads();

    requestAnimationFrame(this.update.bind(this));
  }

  private updateGamepads() {
    const gamepads = this.getGamepads();

    gamepads.forEach(this.handleGamepad);
  }

  private getGamepads() {
    const gamepads = navigator.getGamepads();

    return compact(
      times(gamepads.length)
        .map((index) => gamepads[index]),
    );
  }

  private onConnect(e: GamepadEvent) {
    console.log('*** CONNECTED ***'); // tslint:disable-line no-console
  }

  private onDisconnect(e: GamepadEvent) {
    console.log('*** DISCONNECTED ***'); // tslint:disable-line no-console
  }
}
