import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InfoobjectFormStoreService } from './services/infoobject-form-store.service';
import { FormType } from '../../core/models/form-type';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { Todo } from '../../core/models/todo';

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
  @Input() markdownContent: string = '';
  @Input() formType?: FormType;
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup;
  fieldVisibility = {
    content: false,
    markdownContent: false,
    topic: false,
    tag: false,
    todos: false,
  };

  constructor(private formStore: InfoobjectFormStoreService) {
    this.form = this.formStore.getForm();
  }

  ngOnChanges(): void {
    this.formStore.patchFormValues({
      content: this.content,
      markdownContent: this.markdownContent,
      topic: this.topic,
      tag: this.tag,
      todos: this.todos,
    });
    this.updateFieldVisibility();
    console.log(this.fieldVisibility);
  }

  updateFieldVisibility(): void {
    switch (this.formType) {
      case FormType.textForm:
        this.fieldVisibility = {
          content: true,
          markdownContent: false,
          topic: true,
          tag: true,
          todos: false,
        };
        break;
      case FormType.todoForm:
        this.fieldVisibility = {
          content: false,
          markdownContent: false,
          topic: true,
          tag: true,
          todos: true,
        };
        break;
      case FormType.markdownForm:
        this.fieldVisibility = {
          content: false,
          markdownContent: true,
          topic: true,
          tag: true,
          todos: false,
        };
        break;
      default:
        if (this.content) this.fieldVisibility.content = true;
        if (this.markdownContent) this.fieldVisibility.markdownContent = true;
        if (this.topic) this.fieldVisibility.topic = true;
        if (this.tag) this.fieldVisibility.tag = true;
        if (this.todos) this.fieldVisibility.todos = true;
    }
  }

  onSubmit(): void {
    this.formSubmit.emit(this.form.value);
  }
}
