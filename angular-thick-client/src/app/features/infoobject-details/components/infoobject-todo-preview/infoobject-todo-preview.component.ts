import { Component, Input } from '@angular/core';
import { Todo } from '../../../../core/models/todo.model';

@Component({
  selector: 'app-infoobject-todo-preview',
  standalone: true,
  imports: [],
  templateUrl: './infoobject-todo-preview.component.html',
  styleUrl: './infoobject-todo-preview.component.scss',
})
export class InfoobjectTodoPreviewComponent {
  @Input() todos: Todo[] = [];
}
