import { Component, OnInit } from '@angular/core';
import {AfriflashModalProvider} from '../../../../providers/afriflash-modal/afriflash-modal.provider';

@Component({
  selector: 'app-afriflash-use-terms',
  templateUrl: './afriflash-use-terms.component.html',
  styleUrls: ['./afriflash-use-terms.component.scss'],
})
export class AfriflashUseTermsComponent implements OnInit {

  constructor( private modal: AfriflashModalProvider,) { }

  ngOnInit() {}

  /**
   * Close la modal
   */
  public closeModal() {
    this.modal.dismiss({ displayRegistrationConfirmation: false });
  }


}
