import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from '../components/todo-form/utils/todo';

@Injectable({
  providedIn: 'root',
})
export class InfoobjectFormStoreService {
  private form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      content: [''],
      topic: [''],
      tag: [''],
      todos: this.formBuilder.array([]),
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  patchFormValues(values: {
    content?: string;
    topic?: string;
    tag?: string;
    todos?: Todo[];
  }): void {
    this.form.patchValue(values);
  }
}
