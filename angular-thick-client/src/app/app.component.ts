import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoobjectListComponent } from './features/infoobject-list/infoobject-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfoobjectListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-thick-client';
}
