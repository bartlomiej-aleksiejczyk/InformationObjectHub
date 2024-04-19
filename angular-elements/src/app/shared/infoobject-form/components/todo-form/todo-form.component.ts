import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfoobjectFormStoreService } from '../../services/infoobject-form-store.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formStore: InfoobjectFormStoreService
  ) {
    this.form = this.formStore.getForm();
  }

  ngOnInit() {
    this.ensureTodosFormArray();
  }

  ensureTodosFormArray() {
    if (!this.form.get('todos')) {
      this.form.setControl('todos', this.formBuilder.array([]));
    }
    console.log(this.form.controls['todos'].value);
  }

  get todosFormArray(): FormArray {
    return this.form.get('todos') as FormArray;
  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  addTodo() {
    const newTodoGroup = this.formBuilder.group({
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
