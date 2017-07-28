import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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
  @HostListener('keydown') handleKey($event) {
    console.log($event)
  };
}
