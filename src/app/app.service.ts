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
}
