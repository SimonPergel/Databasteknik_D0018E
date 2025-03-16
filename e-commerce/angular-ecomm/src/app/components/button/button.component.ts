import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button class=" text-black w-full px-5 py-2 rounded-xl shadow-md hover:bg-1" (click)="buttonClicked.emit()">
      {{ label() }}

    </button>
  `,
  styleUrl: './button.component.scss'
})

export class ButtonComponent {
  label = input('');

  buttonClicked = output();
}
