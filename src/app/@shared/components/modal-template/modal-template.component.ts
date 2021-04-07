import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-template',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{ title }}</h4>
      <button
        type="button"
        class="close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="exit.emit()"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ng-content></ng-content>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="exit.emit()">Cancel</button>
      <button type="button" ngbAutofocus class="btn btn-danger" [disabled]="submitDisabled" (click)="submit.emit()">
        Ok
      </button>
    </div>
  `,
})
export class ModalTemplateComponent {
  @Input() title = '';
  @Input() submitDisabled = false;
  @Output() exit = new EventEmitter();
  @Output() submit = new EventEmitter();
  constructor() {}
}
