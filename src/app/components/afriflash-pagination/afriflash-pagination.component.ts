import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-afriflash-pagination',
  templateUrl: './afriflash-pagination.component.html',
  styleUrls: ['./afriflash-pagination.component.scss'],
})
export class AfriflashPaginationComponent implements OnInit {

  /**
   * numéro des pages
   */
  @Input() positions: Array<number>;

  /**
   * Emet la position souhaitée
   * REMARQUE : quand c'est precedent: -1, quand c'est suivant: -2
   */
  @Output() position = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  sendPosition(position: number) {
    this.position.emit(position);
  }

}
