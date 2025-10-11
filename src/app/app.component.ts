import {
  Component,
  DestroyRef,
  inject,
  Input,
  ɵgenerateStandaloneInDeclarationsError,
} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HttpClient } from '@angular/common/http';
import { MatchType, Shooter } from './models/shootersInterface';
import { TableComponent } from './table/table.component';
import { DevisionButtonComponent } from './devision-button/devision-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TableComponent, DevisionButtonComponent],
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
  // czy tutaj nie zaczna sie mieszac nazwy?
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
    // tutaj trzeba zlokalizowac ktory to indeks w tabeli a nie this.division
    const currentPick = this.divisions[this.match][this.division].id;
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
    console.log(division);
    console.log(this.match);
    this.onMatchChange(this.match!);
  }
}
