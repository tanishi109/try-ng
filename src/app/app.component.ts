import { Component } from '@angular/core';

export class Player {
  entry: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular App';
  player: Player = {
    entry: 1,
    name: 'Player',
  };
}
