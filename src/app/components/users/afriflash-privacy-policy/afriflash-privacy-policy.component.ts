import { Component, OnInit } from '@angular/core';
import {AfriflashModalProvider} from '../../../../providers/afriflash-modal/afriflash-modal.provider';

@Component({
  selector: 'app-afriflash-privacy-policy',
  templateUrl: './afriflash-privacy-policy.component.html',
  styleUrls: ['./afriflash-privacy-policy.component.scss'],
})
export class AfriflashPrivacyPolicyComponent implements OnInit {
  constructor( private modal: AfriflashModalProvider,) { }

  ngOnInit() {}

  /**
   * Close la modal
   */
  public closeModal() {
    this.modal.dismiss({ displayRegistrationConfirmation: false });
  }


}
