import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InfoobjectFormComponent } from '../../../../shared/infoobject-form/infoobject-form.component';
import { Todo } from '../../../../core/models/todo.model';
import { InfoobjectRequest } from '../../../../core/models/infoobject-request.model';

@Component({
  selector: 'app-infoobject-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule, InfoobjectFormComponent],
  templateUrl: './infoobject-edit-modal.component.html',
  styleUrl: './infoobject-edit-modal.component.scss',
})
//TODO: Remove ! near inputs
export class InfoobjectEditModalComponent {
  @Input() infoObjectId!: number;
  @Input() content!: string;
  @Input() topic!: string;
  @Input() tag!: string;
  @Input() todos!: Todo[];
  @Input() markdownContent!: string;
  @Input() isVisible!: boolean;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      content: new FormControl(''),
      markdownContent: new FormControl(''),
      topic: new FormControl(''),
      tag: new FormControl(''),
    });
  }

  ngOnChanges(): void {
    this.form.setValue({
      content: this.content,
      markdownContent: new FormControl(''),
      topic: this.topic,
      tag: this.tag,
    });
  }

  onSave(data: InfoobjectRequest): void {
    this.save.emit(data);
  }

  onClose(): void {
    this.close.emit();
  }
}
