import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-command-component',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css'],
})
export class CommandComponent {
  @Input() command: string;
}
