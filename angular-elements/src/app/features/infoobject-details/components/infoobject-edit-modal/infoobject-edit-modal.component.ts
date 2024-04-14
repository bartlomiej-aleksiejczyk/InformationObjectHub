import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-infoobject-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './infoobject-edit-modal.component.html',
  styleUrl: './infoobject-edit-modal.component.scss',
})
export class InfoobjectEditModalComponent {
  @Input() infoObjectId!: string;
  @Input() content!: string;
  @Input() topic!: string;
  @Input() tag!: string;
  @Input() isVisible!: boolean;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      content: new FormControl(''),
      topic: new FormControl(''),
      tag: new FormControl(''),
    });
  }

  ngOnChanges(): void {
    this.form.setValue({
      content: this.content,
      topic: this.topic,
      tag: this.tag,
    });
  }

  onSave(): void {
    this.save.emit(this.form.value);
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
