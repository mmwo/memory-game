import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  template: `
    <app-modal-template (exit)="modal.close()" (submit)="modal.dismiss(true)">
      <p>
        <strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong>
      </p>
      <p>
        All information associated to this user profile will be permanently deleted.
        <span class="text-danger">This operation can not be undone.</span>
      </p>
    </app-modal-template>
  `,
})
export class ConfirmModalComponent {
  constructor(public modal: NgbActiveModal) {}
}
