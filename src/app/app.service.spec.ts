import { AppService, Commands, CommandDial } from './app.service';
import {times} from 'lodash';

describe('AppService', () => {
  let s: AppService;

  beforeEach(() => {
    s = new AppService();
  });

  it('should ***', (() => {
    const command = s.getCommandFromKeyCode(37);

    expect(command).toBe(Commands.Left);
  }));
});

describe('CommandDial', () => {
  describe('start rotate() from Down command', () => {
    let c: CommandDial;

    beforeEach(() => {
      c = new CommandDial(Commands.Down);
    });

    it('should return command clockwise', () => {
      c.rotate(true, 1);
      expect(c.command).toBe(Commands.LeftDown);

      c.rotate(true, 1);
      expect(c.command).toBe(Commands.Left);

      c.rotate(true, 1);
      expect(c.command).toBe(Commands.LeftUp);

      c.rotate(true, 1);
      expect(c.command).toBe(Commands.Up);

      c.rotate(true, 1);
      expect(c.command).toBe(Commands.RightUp);

      c.rotate(true, 1);
      expect(c.command).toBe(Commands.Right);

      c.rotate(true, 1);
      expect(c.command).toBe(Commands.RightDown);

      c.rotate(true, 1);
      expect(c.command).toBe(Commands.Down);

      c.rotate(true, 1);
      expect(c.command).toBe(Commands.LeftDown);
    });

    it('should return twice next command when step specified', () => {

      c.rotate(true, 2);
      expect(c.command).toBe(Commands.Left);
    });

  });
});
