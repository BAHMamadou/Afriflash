import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'afriflash-info-bulle',
  templateUrl: './afriflash-info-bulle.component.html',
  styleUrls: ['./afriflash-info-bulle.component.scss'],
})
export class AfriflashInfoBulleComponent implements OnInit {

  /**
   * Définit le type d'InfoBulle (validate, warning, error, info)
   */
  @Input() type: string;

  
  /**
   * Message de l'InfoBulle
   */
  @Input() message: string;
  
  constructor() { }

  ngOnInit() {}

}
