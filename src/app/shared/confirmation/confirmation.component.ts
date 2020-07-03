import { constants } from './../../app.constants';
import { EmitterService } from './../../core/services/emitter.service';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  data: any;
  isConfirm = true;

  constructor(
    public ngbActiveModal: NgbActiveModal,
    private emitterService: EmitterService
  ) {}

  ngOnInit(): void {
    this.emitterService.subscribe(constants.events.loadUsersCount, () =>
      this.deleteUser(true)
    );
  }

  deleteUser(isConfirm) {
    if (isConfirm === true) {
      this.ngbActiveModal.close(this.data);
      this.emitterService.emit(constants.events.loadUsersCount);
    } else {
      this.ngbActiveModal.dismiss('cancel click');
    }
  }

  closeWindow() {
    this.ngbActiveModal.dismiss('Cross click');
  }
}
