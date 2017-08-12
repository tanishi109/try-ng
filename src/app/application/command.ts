import { Commands } from '../domain/Command';

export default {
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

    return [first, second, third, Commands.P];
  },

  rollCrossCommandDice(): Commands {
    const crossCommands = [Commands.Down, Commands.Right, Commands.Left, Commands.Up];
    const index = this.rollDice(0, crossCommands.length - 1);

    return crossCommands[index];
  },

  rollDice(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  },
}

interface ICommandDial {
  command: string;
  index: number;
  dial: Commands[];
}

export class CommandDial implements ICommandDial {
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
