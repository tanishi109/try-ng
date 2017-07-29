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
  getCommandFromKeyCode(code: number): string {
    return this.keyMap[code];
  }
}
