import { Component, Input, AfterViewInit } from '@angular/core';
import { Commands } from 'app/domain/Command';
import { innerSize } from '../command/command.component';

const pos = {
  [Commands.LeftUp]: [0, 0],
  [Commands.Up]: [1, 0],
  [Commands.RightUp]: [2, 0],

  [Commands.Left]: [0, 1],
  [Commands.Neutral]: [1, 1],
  [Commands.Right]: [2, 1],

  [Commands.LeftDown]: [0, 2],
  [Commands.Down]: [1, 2],
  [Commands.RightDown]: [2, 2],

  [Commands.P]: [0, 0],
};

@Component({
  selector: 'stroke-component',
  templateUrl: './stroke.component.html',
  styleUrls: ['./stroke.component.css'],
})
export class StrokeComponent implements AfterViewInit {
  @Input() command: string;
  rootStyle = {};

  ngAfterViewInit() {
    const [xMulti, yMulti] = pos[this.command];
    this.rootStyle = {
      'left.px': xMulti * innerSize + xMulti * 2,
      'top.px': yMulti * innerSize + yMulti * 2,
    };
  }
}
