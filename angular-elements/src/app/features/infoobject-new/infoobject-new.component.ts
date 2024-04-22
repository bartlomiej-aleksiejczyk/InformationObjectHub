import { Component } from '@angular/core';
import { FormType } from '../../core/models/form-type';

@Component({
  selector: 'app-infoobject-new',
  standalone: true,
  imports: [],
  templateUrl: './infoobject-new.component.html',
  styleUrl: './infoobject-new.component.scss',
})
export class InfoobjectNewComponent {
  activeFormType: FormType = FormType.textForm;

  setFormType(formType: FormType): void {
    this.activeFormType = formType;
  }
}
