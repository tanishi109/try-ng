import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-command-component',
  template: `
    <div>
      command component
      {{command}}
    </div>
  `
})
export class CommandComponent {
  @Input() command: string;
}
