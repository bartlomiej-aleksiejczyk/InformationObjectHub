import { Component } from '@angular/core';
import { FormType } from '../../core/models/form-type.model';
import { InfoobjectFormComponent } from '../../shared/infoobject-form/infoobject-form.component';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-infoobject-new',
  standalone: true,
  imports: [InfoobjectFormComponent],
  templateUrl: './infoobject-new.component.html',
  styleUrl: './infoobject-new.component.scss',
})
export class InfoobjectNewComponent {
  activeFormType: FormType = FormType.textForm;
  FormType = FormType;

  setActiveFormType(formType: FormType): void {
    this.activeFormType = formType;
  }
}
