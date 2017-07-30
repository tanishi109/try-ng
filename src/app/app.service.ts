import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  /*
  1 2 3  ↖︎ ↑ ↗︎
  4 5 6  ←   →
  7 8 9  ↙ ︎↓ ↘︎
  */
  keyMap = {
    37: '4',
    38: '2',
    39: '6',
    40: '8',
  };
  proConMap = {
    '0.7143': '4',
    '-1.0000': '2',
    '1.2857': '5',
    '-0.4286': '6',
    '0.1429': '8',
    '-0.1429': '9',
  };
  getCommandFromKeyCode(code: number): string {
    return this.keyMap[code];
  }
  getCommandFromProConKeyCode(code: number): string {
    const codeString = `${code.toFixed(4)}`;

    return this.proConMap[codeString];
  }
}
