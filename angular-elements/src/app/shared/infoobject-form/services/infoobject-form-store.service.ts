import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
    this.form.patchValue({
      content: values.content,
      topic: values.topic,
      tag: values.tag,
    });

    this.setTodos(values.todos);
  }
  private setTodos(todos?: Todo[]): void {
    const todoArray = this.form.get('todos') as FormArray;
    todoArray.clear(); // Clear existing entries in the form array

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
