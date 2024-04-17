import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InfoobjectFormStoreService {
  private form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      content: [''],
      topic: [''],
      tag: [''],
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  patchFormValues(values: { content?: string, topic?: string, tag?: string }): void {
    this.form.patchValue(values);
  }
}
