import { Component, input, OnChanges, output } from '@angular/core';
import { Divisions, Shooter } from '../models/shootersInterface';
import { DevisionButtonComponent } from '../devision-button/devision-button.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    DevisionButtonComponent,
    CommonModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  selectedId: number = 0;
  shooters = input<Shooter[]>();
  header = input<String>();
  divisions = input.required<Divisions>();
  divisionId = output<number>();
  pageSize = 10;
  pageIndex = 0;
  pagedShooters: Shooter[] = [];

  onDivisionChange(division: number) {
    this.divisionId.emit(division);
    this.selectedId = division;
  }

  ngOnChanges(): void {
    // to leci 2 razy przy pierwszy requescie
    const currentDivisions = this.divisions();
    this.selectedId =
      currentDivisions.find((d) => d.id === this.selectedId)?.id ??
      currentDivisions[0].id;
    const shooters = this.shooters();
    if (shooters) {
      const start = this.pageIndex * this.pageSize;
      this.pagedShooters = shooters.slice(start, start + this.pageSize);
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const start = this.pageIndex * this.pageSize;
    this.pagedShooters = this.shooters()!.slice(start, start + this.pageSize);
  }
}
