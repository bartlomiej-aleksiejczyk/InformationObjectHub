import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { InfoobjectFormStoreService } from '../../services/infoobject-form-store.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formStore: InfoobjectFormStoreService
  ) {
    this.form = this.formStore.getForm();
  }

  ngOnInit() {
    if (!this.todosFormArray) {
      this.form.setControl('todos', this.fb.array([]));
    }
  }

  get todosFormArray(): FormArray {
    return this.form.get('todos') as FormArray;
  }

  addTodo() {
    const newTodoGroup = this.fb.group({
      id: Date.now(),
      content: '',
      isDone: false,
    });
    this.todosFormArray.push(newTodoGroup);
  }

  removeTodo(index: number) {
    this.todosFormArray.removeAt(index);
  }

  moveTodo(index: number, direction: 'up' | 'down') {
    const currentIndex = index;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= this.todosFormArray.length) return;

    const currentGroup = this.todosFormArray.at(currentIndex);
    this.todosFormArray.removeAt(currentIndex);
    this.todosFormArray.insert(newIndex, currentGroup);
  }
}
