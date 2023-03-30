import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
}

//TODO: nauciti razliku izmedju shared i core:
// Core - snigletoni, instancirani jednom pri pokretanju aplikacije
// Shared - neovisni o ostatku aplikacije, za lazy loadanje
