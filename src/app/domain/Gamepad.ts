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

const joyConLAxesMap = {
  '0.7142857313156128': Commands.Left,
  '0.4285714626312256': Commands.LeftDown,
  '0.14285719394683838': Commands.Down,
  '-0.1428571343421936': Commands.RightDown,
  '-0.4285714030265808': Commands.Right,
  '1.2857143878936768': Commands.Neutral,
  '1': Commands.LeftUp,
  '-1': Commands.Up,
  '-0.7142857313156128': Commands.RightUp,
};

const joyConLButtonsMap = {
  '0': Commands.P,
  '1': Commands.P,
  '2': Commands.P,
  '3': Commands.P,
};

export default {
  getCommandFromKeyCode(code: number): Commands {
    return keyMap[code];
  },

  getCommandFromProConKeyCode(code: number): Commands {
    const codeString = `${code.toFixed(4)}`;

    return proConMap[codeString];
  },

  getCommandFromJoyConLKeyCode(code: number, type: 'axes' | 'buttons' = 'axes'): Commands {
    const codeString = `${code}`;
    const map = type === 'axes' ? joyConLAxesMap : joyConLButtonsMap;

    return map[codeString];
  },
};
