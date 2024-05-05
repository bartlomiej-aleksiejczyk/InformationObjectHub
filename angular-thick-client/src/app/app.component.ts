import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoobjectListComponent } from './features/infoobject-list/infoobject-list.component';
import { InfoobjectNewComponent } from './features/infoobject-new/infoobject-new.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfoobjectListComponent, InfoobjectNewComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-thick-client';
}
