import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoobjectListComponent } from './infoobject-list/infoobject-list.component';
import { InfoobjectNewComponent } from './features/infoobject-new/infoobject-new.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfoobjectListComponent, InfoobjectNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-thick-client';
}
