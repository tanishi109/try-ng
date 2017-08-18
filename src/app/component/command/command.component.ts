import { Component, Input, AfterViewInit } from '@angular/core';

export const innerSize = 30;
export const size = 94;
export const topMargin = 16;
export const outerSize = size + topMargin;

@Component({
  selector: 'app-command-component',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css'],
})
export class CommandComponent implements AfterViewInit  {
  @Input() command: string;
  @Input() index: number;
  innerStyle = {
    'width.px': innerSize,
    'height.px': innerSize,
  };
  wrapperStyle = {
    'width.px': size,
    'height.px': size,
    'margin-top.px': topMargin,
  };

  ngAfterViewInit() {
    if (this.index === 0) {
      console.log("zero")
      this.wrapperStyle['margin-left.px'] = 0;
    }
  }
}
