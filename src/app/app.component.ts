import { Component, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AppService } from './app.service';

export class Player {
  entry: number;
  name: string;
  commands: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService],
})
export class AppComponent {
  title = 'My First Angular App';
  player: Player = {
    entry: 1,
    name: 'Player',
    commands: [],
  };
  private keyEvents = new Subject();
  private commandEvents = new Subject();
  constructor(private appService: AppService) {
    this.keyEvents
      .filter((keyCode: number) => {
        return [37, 38, 39, 40].includes(keyCode);
      })
      .timeout(100)
      .retry()
      .buffer(Observable.interval(100))
      .map((keyCodes: number[]) => {
        if (keyCodes.includes(39) && keyCodes.includes(40)) {
          return '9';
        }
        return appService.getCommandFromKeyCode(keyCodes[0]);
      })
      .filter((command: string) => !!command)
      .subscribe((command: string) => {
        this.commandEvents.next(command);
      });
    this.commandEvents
      .buffer(Observable.interval(1000))
      .subscribe((commands: string[]) => {
        if (commands.includes('6') && commands.includes('8') && commands.includes('9')) {
          console.log('!!');
        }
        this.player.commands = commands;
      })
  }
  @HostListener('keydown') handleKey($event) {
    const keyCode = $event.keyCode;
    this.keyEvents.next(keyCode);
  };
}
