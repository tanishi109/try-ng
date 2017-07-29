import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  keyMap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };
  getCommandFromKeyCode(code: number): string {
    return this.keyMap[code];
  }
}
