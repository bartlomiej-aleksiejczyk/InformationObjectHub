import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InfoobjectFormStoreService } from './services/infoobject-form-store.service';
import { FormType } from './utils/form-type';
import { Todo } from '../models/todo';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

@Component({
  selector: 'app-infoobject-form',
  standalone: true,
  imports: [ReactiveFormsModule, TodoFormComponent],
  templateUrl: './infoobject-form.component.html',
  styleUrls: ['./infoobject-form.component.scss'],
})
export class InfoobjectFormComponent {
  @Input() content: string = '';
  @Input() topic: string = '';
  @Input() tag: string = '';
  @Input() todos: Todo[] = [];
  @Input() formType?: FormType;
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup;
  fieldVisibility = {
    content: true,
    topic: true,
    tag: true,
    todos: true,
  };

  constructor(private formStore: InfoobjectFormStoreService) {
    this.form = this.formStore.getForm();
  }

  ngOnChanges(): void {
    this.formStore.patchFormValues({
      content: this.content,
      topic: this.topic,
      tag: this.tag,
      todos: this.todos,
    });
    this.updateFieldVisibility();
  }

  updateFieldVisibility(): void {
    switch (this.formType) {
      case FormType.textForm:
        this.fieldVisibility = {
          content: true,
          topic: true,
          tag: true,
          todos: false,
        };
        break;
      case FormType.todoForm:
        this.fieldVisibility = {
          content: true,
          topic: true,
          tag: true,
          todos: true,
        };
        break;
      default:
        if (this.content) this.fieldVisibility.content = true;
        if (this.topic) this.fieldVisibility.topic = true;
        if (this.tag) this.fieldVisibility.tag = true;
        if (this.todos) this.fieldVisibility.todos = true;
    }
  }

  onSubmit(): void {
    this.formSubmit.emit(this.form.value);
  }
}
