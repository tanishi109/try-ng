import { Commands } from './Command';

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
