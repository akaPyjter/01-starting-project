import { Component, DestroyRef, inject, Input } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  message = '';
  search = 'empty search';
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  shooters?: {
    rank: number;
    'regions.name': string;
    'shooters.firstname': string;
    'shooters.lastname': string;
    display_rating: number;
  }[];
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
    // tutaj powien doleciec jakis komponent z kategoriami
    if (matchName === 'shotgun') this.message = 'Shotgun';
    // to cale zapytanie nie czaje
    // tutaj dodac sortowanie czy aby napewno jest dobrze wyswietlane
    // czy tutaj robic sam komponent tabeli ? chyba tak 
    const getRequest = this.httpClient
      .get<
        {
          rank: number;
          'regions.name': string;
          'shooters.firstname': string;
          'shooters.lastname': string;
          display_rating: number;
        }[]
      >(
        'https://ipscelo.com/api/elorankings?divisionid=13&rfilter=&cfilter=&search=&sort=rank&order=asc'
      )
      .subscribe({ next: (data) => (this.shooters = data) });
    this.destroyRef.onDestroy(() => {
      getRequest.unsubscribe();
    });
  }
}
