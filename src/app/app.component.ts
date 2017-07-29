import { Component, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

export class Player {
  entry: number;
  name: string;
  commands: number[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'My First Angular App';
  player: Player = {
    entry: 1,
    name: 'Player',
    commands: [],
  };
  private keyEvents = new Subject();
  constructor() {
    this.keyEvents
      .filter((keyCode: number) => {
        return [37, 38, 39, 40].includes(keyCode);
      })
      .buffer(Observable.interval(100))
      .filter((keyCodes: number[]) => {
        return keyCodes.includes(39) && keyCodes.includes(40);
      })
      .subscribe((keyCode) => {
        console.log("↘︎")
      });
  }
  @HostListener('keydown') handleKey($event) {
    const keyCode = $event.keyCode;
    this.keyEvents.next(keyCode);
  };
}
