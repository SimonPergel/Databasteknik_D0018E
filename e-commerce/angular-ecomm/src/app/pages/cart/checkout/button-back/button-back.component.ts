import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-back',
  template: `
    <button class="bg-sky-500 text-black w-full px-5 py-2 rounded-xl shadow-md hover:bg-1" (click)="buttonClicked.emit()">
      {{ label }}
    </button>
  `,
  styleUrls: ['./button-back.component.scss']
})

export class ButtonBackComponent {
  // Using @Input() to accept the label from the parent component
  @Input() label!: string;

  // @Output() event emitter to notify the parent when the button is clicked ( not nessasary due to that routerLink is used!)
  @Output() buttonClicked = new EventEmitter<void>();
}
