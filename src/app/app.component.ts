import { Component, DestroyRef, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HttpClient } from '@angular/common/http';
import { MatchType, Shooter } from './models/shootersInterface';
import { TableComponent } from './table/table.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, TableComponent, CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  message = '';
  search = 'empty search';
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  shooters?: Shooter[];
  division: number = 0;
  match: MatchType | undefined;
  divisions = {
    shotgun: [
      { id: 11, name: 'Open' },
      { id: 12, name: 'Modified' },
      { id: 13, name: 'Standard' },
      { id: 14, name: 'Standard Manual' },
    ],
    handgun: [
      { id: 4, name: 'Production' },
      { id: 5, name: 'Production Optics' },
      { id: 1, name: 'Open' },
      { id: 2, name: 'Standard' },
      { id: 3, name: 'Classic' },
      { id: 6, name: 'Revolver' },
    ],
    pcc: [
      { id: 15, name: 'PCC Optics' },
      { id: 16, name: 'PCC Iron' },
    ],
    rifle: [
      { id: 7, name: 'Semi Auto Open' },
      { id: 9, name: 'Semi Auto Standard' },
      { id: 36, name: 'Manual Action Contemporary' },
      { id: 37, name: 'Manual Action Bolt' },
    ],
    minirifle: [
      { id: 19, name: 'Minirifle Open' },
      { id: 27, name: 'Minirifle Standard' },
    ],
  };

  onRemoved(message: string) {
    this.message = message;
  }

  onInput(text: string) {
    if (text === '') {
      this.search = 'search cleared';
      return;
    }
    this.search = text;
    console.log(this.search);
  }
  // czy to zostawic w komponencie czy zrobic serwis?
  onMatchChange(matchName: MatchType) {
    this.match = matchName;
    let index = this.divisions[this.match].findIndex(
      (division) => division.id === this.division
    );
    index = index > -1 ? index : 0;

    const currentPick = this.divisions[this.match][index].id;
    const getRequest = this.httpClient
      .get<Shooter[]>(
        `https://ipscelo.com/api/elorankings?divisionid=${currentPick}&rfilter=&cfilter=&search=&sort=rank&order=asc`
      )
      .subscribe({ next: (data) => (this.shooters = data) });
    this.destroyRef.onDestroy(() => {
      getRequest.unsubscribe();
    });
  }

  onDivisionChange(division: number) {
    this.division = division;
    this.onMatchChange(this.match!);
  }
}
