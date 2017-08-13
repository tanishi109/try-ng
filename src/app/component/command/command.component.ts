import { Component, Input } from '@angular/core';


export const size = 94;
export const topMargin = 16;
export const outerSize = size + topMargin;

@Component({
  selector: 'app-command-component',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css'],
})
export class CommandComponent {
  @Input() command: string;
  wrapperStyle = {
    'width.px': size,
    'height.px': size,
    'margin-top.px': topMargin,
  };
}
