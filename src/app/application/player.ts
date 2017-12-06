import { Player } from 'app/domain/Player';
import { Task } from 'app/domain/Task';
import { Commands } from 'app/domain/Command';
import commandApp from './command';

import { times, isEqual } from 'lodash';

export default {
  init(): Player {
    const player = new Player();

    times(player.currentMoveIndex + 1).forEach(() => {
      player.taskQueue.push(
        new Task(commandApp.rollMoveDice())
      );
    });

    return player;
  },

  setCurrentCommand(player: Player, commands: Commands[]) {
    player.currentCommands = commands;
  },

  getCurrentCommand(player: Player): Commands {
    return player.getCurrentCommand();
  },

  isEq(player, commands): boolean {
    return isEqual(player.getCurrentMove(), commands);
  },

  lastEqIndex(player, commands): number {
    const move = player.getCurrentMove();
    const latestCommand = commands[commands.length - 1];

    const i = move.indexOf(latestCommand);

    if (i > 0) {
      let n = i;
      let l = 1;
      while (n--) {
        l++;
        if (move[n] === commands[commands.length - l]) {
          // console.log("ok")
        } else {
          // console.log("ng")
          return 0;
        }
      }
    }

    return i === -1 ? 0 : i;
  },

  doneTask(player) {
    player.taskQueue = [
      {
        move: commandApp.rollMoveDice(),
        finished: false,
      },
      ...player.taskQueue,
    ];

    player.score += 1;
  },
};

