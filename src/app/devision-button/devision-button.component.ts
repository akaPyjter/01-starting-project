import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-devision-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devision-button.component.html',
  styleUrl: './devision-button.component.css',
})
export class DevisionButtonComponent {
  active = input<boolean>();
}
