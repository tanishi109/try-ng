import { Task } from './Task';
import { Commands } from './Command';

// Player

interface IPlayer {
  commands: string[];
  taskQueue: Task[];
  score: number;
  currentMoveIndex: number;
  currentCommands: Commands[];
}

export class Player implements IPlayer {
  commands = [];
  taskQueue = [];
  score = 0;
  currentMoveIndex = 1;
  currentCommands = [];

  constructor(params = {}) {
    Object.keys(params).forEach((key) => {
      this[key] = params[key];
    });
  }

  getCurrentCommand() {
    if (
      this.currentCommands.includes(Commands.Left) &&
      this.currentCommands.includes(Commands.Down)
    ) {
      return Commands.LeftDown;
    }
    if (
      this.currentCommands.includes(Commands.Right) &&
      this.currentCommands.includes(Commands.Down)
    ) {
      return Commands.RightDown;
    }
    if (
      this.currentCommands.includes(Commands.Left) &&
      this.currentCommands.includes(Commands.Up)
    ) {
      return Commands.LeftUp;
    }
    if (
      this.currentCommands.includes(Commands.Right) &&
      this.currentCommands.includes(Commands.Up)
    ) {
      return Commands.RightUp;
    }

    return this.currentCommands[0];
  }

  getCurrentMove() {
    return this.taskQueue[this.currentMoveIndex].move;
  }
}
