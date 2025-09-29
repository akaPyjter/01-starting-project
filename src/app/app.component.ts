import { Component, inject, Input } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  message = 'Temprary message'
  search = "empty search"
  private httpClient = inject(HttpClient);
  onRemoved(message: string){
    this.message = message;
  }
  // czy tutaj nie zaczna sie mieszac nazwy?
  onInput(text: string){
    if (text === ''){
      this.search = "search cleared";
      return;
    }
    this.search = text;
    console.log(this.search)
  }
  ngOnInit(){
    this.httpClient.get('https://ipscelo.com/api/competitions')
  }
}
