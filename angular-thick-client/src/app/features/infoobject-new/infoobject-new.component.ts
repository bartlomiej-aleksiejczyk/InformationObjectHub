import { Component } from '@angular/core';
import { FormType } from '../../core/models/form-type.model';
import { InfoobjectFormComponent } from '../../shared/infoobject-form/infoobject-form.component';
import { InfoobjectStoreService } from '../../core/services/infoobject-store-service';
import { InfoobjectRequest } from '../../core/models/infoobject-request.model';

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

  constructor(
    private infoobjectStoreService: InfoobjectStoreService,
  ) {  }

  setActiveFormType(formType: FormType): void {
    this.activeFormType = formType;
  }

  onSave (infoobjectRequest: InfoobjectRequest) {
          this.infoobjectStoreService.createInfoObject(infoobjectRequest).subscribe({
        next: (newInfoObject) => {
        },
        error: (error) => {
          console.error('Failed to create info object:', error);
        }
      });
    }
}
