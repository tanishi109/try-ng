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

