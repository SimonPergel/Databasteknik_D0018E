import { Component, input, output, Input } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  template: `
    <button class="bg-blue-500 text-white w-full border px-5 py-2 rounded-xl shadow-md hover:opacity-90" (click)="handleClick()">
      {{ label() }}

    </button>
  `,
  styleUrl: './primary-button.component.scss'
})

export class PrimaryButtonComponent {
  label = input('');
  @Input() action: string = '';

  buttonClicked = output();

  handleClick() {
    if (this.action === "logout") {
      localStorage.removeItem("token");
    }
    else {
      this.buttonClicked.emit();
    }
  }
}
