import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from '../../../core/models/todo';

@Injectable({
  providedIn: 'root',
})
//Stop this from being Singelton as it cause problems during SPA transistion
export class InfoobjectFormStoreService {
  private form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      content: [''],
      markdownContent: [''],
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
    markdownContent?: string;
    topic?: string;
    tag?: string;
    todos?: Todo[];
  }): void {
    this.form.patchValue({
      content: values.content,
      markdownContent: values.markdownContent,
      topic: values.topic,
      tag: values.tag,
    });

    this.setTodos(values.todos);
  }
  private setTodos(todos?: Todo[]): void {
    const todoArray = this.form.get('todos') as FormArray;
    todoArray.clear();

    if (todos) {
      todos.forEach((todo) => {
        todoArray.push(
          this.formBuilder.group({
            id: todo.id,
            content: todo.content,
            isDone: todo.isDone,
          })
        );
      });
    }
  }
}
