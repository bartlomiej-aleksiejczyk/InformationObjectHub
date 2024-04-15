import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormType } from './utils/form-type';

@Component({
  selector: 'app-infoobject-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './infoobject-form.component.html',
  styleUrl: './infoobject-form.component.scss',
})
export class InfoobjectFormComponent {
  @Input() content: string = '';
  @Input() topic: string = '';
  @Input() tag: string = '';
  @Input() formType?: FormType;
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup = new FormGroup({
    content: new FormControl(''),
    topic: new FormControl(''),
    tag: new FormControl(''),
  });

  ngOnChanges(): void {
    this.form.patchValue({
      content: this.content,
      topic: this.topic,
      tag: this.tag,
    });
  }

  onSave(): void {
    this.formSubmit.emit(this.form.value);
  }

  onSubmit(): void {
    this.formSubmit.emit(this.form.value);
  }
}
