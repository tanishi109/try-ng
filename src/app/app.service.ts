import { Injectable } from '@angular/core';

export enum Commands {
  LeftDown = '1',
  Down = '2',
  RightDown = '3',
  Left = '4',
  Neutral = '5',
  Right = '6',
  LeftUp = '7',
  Up = '8',
  RightUp = '9',
  P = 'p', // TODO: A B X Y
}

type keyboards = '37' | '38' | '39' | '40' | '90';

type keyMap = {
  [key in keyboards]: Commands
}

type proConAxes = '0.7143' | '-1.0000' | '1.2857' | '-0.4286' | '0.1429' | '-0.1429';
type proConButtons = '0.0000' | '1.0000' | '2.0000' | '3.0000';
type proConKeys = proConAxes | proConButtons;

type proConMap = {
  [key in proConKeys]: Commands
}

interface IAppService {
  keyMap: keyMap;
  proConMap: proConMap;
}

@Injectable()
export class AppService implements IAppService {
  /*
  7 8 9  ↖︎ ↑ ↗︎
  4 5 6  ←   →
  1 2 3  ↙ ︎↓ ↘︎
  */
  keyMap = {
    '37': Commands.Left,
    '38': Commands.Up,
    '39': Commands.Right,
    '40': Commands.Down,
    '90': Commands.P,
  };
  proConMap = {
    '0.7143': Commands.Left,
    '-1.0000': Commands.Up,
    '1.2857': Commands.Neutral,
    '-0.4286': Commands.Right,
    '0.1429': Commands.Down,
    '-0.1429': Commands.RightDown,
    '0.0000': Commands.P,
    '1.0000': Commands.P,
    '2.0000': Commands.P,
    '3.0000': Commands.P,
  };
  getCommandFromKeyCode(code: number): string {
    return this.keyMap[code];
  }
  getCommandFromProConKeyCode(code: number): string {
    const codeString = `${code.toFixed(4)}`;

    return this.proConMap[codeString];
  }
  rollMoveDice(): Commands[] {
    const dial = new CommandDial(this.rollCrossCommandDice());
    const clockwise = this.rollDice(0, 1) === 0;
    const step = this.rollDice(1, 2);
    const first = dial.command;
    const second = dial.rotate(clockwise, step).command;
    const third = (() => {
      if (step === 2) {
        return dial.rotate(!clockwise, 1).command;
      }

      return dial.rotate(clockwise, 1).command;
    })();

    return [first, second, third];
  }
  rollCrossCommandDice(): Commands {
    const crossCommands = [Commands.Down, Commands.Right, Commands.Left, Commands.Up];
    const index = this.rollDice(0, crossCommands.length - 1);

    return crossCommands[index];
  }
  rollDice(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}

interface ICommandDial {
  command: string;
  index: number;
}

export class CommandDial {
  command = null;
  index = null;
  dial = [
    Commands.Up, Commands.RightUp, Commands.Right,
    Commands.RightDown, Commands.Down, Commands.LeftDown,
    Commands.Left, Commands.LeftUp
  ];
  constructor(command: Commands) {
    this.command = command;
    this.index = this.dial.indexOf(command);
  }
  rotate(clockwise: boolean, step = 1) {
    if (step > this.dial.length) {
      new Error("minus overflow will occured. please fix rotate() method..."); // tslint:disable-line
    }

    const direction = clockwise ? 1 : -1;
    const delta = direction * step;
    const nextIndex = (this.index + this.dial.length + delta) % this.dial.length;
    const nextCommand = this.dial[nextIndex];

    this.index = nextIndex;
    this.command = nextCommand;

    return this;
  }
}
