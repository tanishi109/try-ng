import { Commands } from './Command';

type keyboards = '37' | '38' | '39' | '40' | '90';

type proConAxes = '0.7143' | '-1.0000' | '1.2857' | '-0.4286' | '0.1429' | '-0.1429';
type proConButtons = '0.0000' | '1.0000' | '2.0000' | '3.0000';
type proConKeys = proConAxes | proConButtons;

type keyMap = {
  [key in keyboards]: Commands
}

type proConMap = {
  [key in proConKeys]: Commands
}

/*
  7 8 9  ↖︎ ↑ ↗︎
  4 5 6  ←   →
  1 2 3  ↙ ︎↓ ↘︎
*/
const keyMap = {
  '37': Commands.Left,
  '38': Commands.Up,
  '39': Commands.Right,
  '40': Commands.Down,
  '90': Commands.P,
};

const proConMap = {
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

export default {
  getCommandFromKeyCode(code: number): Commands {
    return keyMap[code];
  },

  getCommandFromProConKeyCode(code: number): Commands {
    const codeString = `${code.toFixed(4)}`;

    return proConMap[codeString];
  },
};