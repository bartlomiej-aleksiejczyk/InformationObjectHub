import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../../../shared/models/todo';

@Component({
  selector: 'app-infoobject-todo-preview',
  standalone: true,
  imports: [],
  templateUrl: './infoobject-todo-preview.component.html',
  styleUrl: './infoobject-todo-preview.component.scss'
})
export class InfoobjectTodoPreviewComponent implements OnInit {
  @Input() todos: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}

