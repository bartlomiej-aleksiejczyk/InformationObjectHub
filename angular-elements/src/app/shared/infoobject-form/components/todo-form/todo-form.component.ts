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
import {
  CdkDragDrop,
  moveItemInArray,
  DragDropModule,
  CdkDragPlaceholder,
  CdkDragPreview,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkDragPreview,
    CdkDragPlaceholder,
  ],
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

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.todosFormArray.controls,
      event.previousIndex,
      event.currentIndex
    );
  }
}
