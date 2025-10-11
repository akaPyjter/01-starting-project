import { Component, input, output } from '@angular/core';
import { Divisions, Shooter } from '../models/shootersInterface';
import { DevisionButtonComponent } from '../devision-button/devision-button.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DevisionButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  selectedId: number | null = null;

  shooters = input<Shooter[]>();
  header = input<String>();
  divisions = input<Divisions>();
  divisionId = output<number>();
  onDivisionChange(division: number) {
    this.divisionId.emit(division);
    this.selectedId = division;
  }
}
