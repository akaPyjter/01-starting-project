import { Component, computed, input, output, signal } from '@angular/core';
import { MATCHES, ABOUT } from '../selectTexts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchType } from '../models/shootersInterface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  headerText = input<string>();
  search = output<string>();
  selectedMatch = output<MatchType>();
  enteredSearch = signal<string>('');
  matches = signal<string[]>(MATCHES);
  about = signal<{ name: string; link: string }[]>(ABOUT);

  onMatchChange(event: Event) {
    const selectedElement = event.target as HTMLSelectElement;
    const selected: MatchType =
      selectedElement.value.toLocaleLowerCase() as MatchType;
    this.selectedMatch.emit(selected);
  }
  onAboutChange(event: Event) {
    const selectedElement = event.target as HTMLSelectElement;
    const selected: string = selectedElement.value;
    for (const about in ABOUT) {
      if (ABOUT[about].name === selected) {
        window.location.href = `https://ipscelo.com/${ABOUT[about].link}`;
      }
    }
  }

  // remove computed when no need to change the image dynamically
  logoPatch = computed(() => {
    return 'assets/ipsc-logo.png';
  });
  trashPath = computed(() => {
    return 'assets/trash.png';
  });

  clearInput() {
    this.enteredSearch.set('');
    this.search.emit('');
  }

  onInput(event: Event) {
    //[(ngModel)]="enteredSearch" czy [value]="enteredSearch()"
    const value = (event.target as HTMLInputElement).value;
    this.enteredSearch.set(value);
    this.search.emit(value);
  }
}
