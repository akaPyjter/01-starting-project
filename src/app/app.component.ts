import {
  Component,
  DestroyRef,
  inject,
  Input,
  ɵgenerateStandaloneInDeclarationsError,
} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HttpClient } from '@angular/common/http';
import { Shooter } from './models/shootersInterface';
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
  divisions = [
    { id: 11, name: 'Open' },
    { id: 12, name: 'Modified' },
    { id: 13, name: 'Standard' },
    { id: 14, name: 'Standard Manual' },
  ];
  division = this.divisions[0].id;
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
  // czy nazewnictwo jest OK, jest to troche mylace TBH
  onMatchChange(matchName: string) {
    if (matchName === 'shotgun') this.message = 'Shotgun';
    const getRequest = this.httpClient
      .get<Shooter[]>(
        `https://ipscelo.com/api/elorankings?divisionid=${this.division}&rfilter=&cfilter=&search=&sort=rank&order=asc`
      )
      .subscribe({ next: (data) => (this.shooters = data) });
    this.destroyRef.onDestroy(() => {
      getRequest.unsubscribe();
    });
  }
  onDivisionChange(division: number) {
    this.division = division;
    if (this.message === '') return;
    this.onMatchChange('shotgun');
  }
}
