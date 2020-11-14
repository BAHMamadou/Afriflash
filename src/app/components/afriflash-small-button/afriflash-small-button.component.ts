import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'afriflash-small-button',
  templateUrl: './afriflash-small-button.component.html',
  styleUrls: ['./afriflash-small-button.component.scss'],
})
export class AfriflashSmallButtonComponent implements OnInit {

  /**
   * theme du bouton
   */
  @Input() theme: string;

  /**
   * titre du bouton
   */
  @Input() title: string;

  /**
   * Evenement émis lors du click du bouton
   */
  @Output() clickButton = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

}
