import { Component, input } from '@angular/core';
import { Shooter } from '../models/shootersInterface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  shooters = input<Shooter[]>();
  header = input<String>();
}
