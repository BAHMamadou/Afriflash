import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AfriflashModalProvider } from '../../../providers/afriflash-modal/afriflash-modal.provider';

@Component({
  selector: 'app-afriflash-open-button',
  templateUrl: './afriflash-open-button.component.html',
  styleUrls: ['./afriflash-open-button.component.scss'],
})
export class AfriflashOpenButtonComponent implements OnInit {

  /**
   * Titre du bouton
   */
  @Input() title: string;

  /**
   * Titre du bouton
   */
  @Input() public action: string;

  /**
   * Paramètre de configuration du visuel du bouton
   */
  @Input() theme: string;

  /**
   * id de l'utilisateur
   */
  @Input() public userId;

  /**
   * Role de l'utilisateur
   */
  @Input() public role;

  /**
   * source de la paage
   */
  @Input() public source;


  /**
   * Liste des adresses de l'utilisateurs
   */
  @Input() public adresses: {
    adresseId: string,
    idHome: string,
    country: string,
    region: string,
    commune: string,
    district: string,
    sector: string,
    home: string,
    state?: string
  }[];

  /**
   * adresse à rechercher
   */
  @Input() public adressToProspect: {
    adresseId: string,
    idHome: string,
    country: string,
    region: string,
    commune: string,
    district: string,
    sector: string,
    home: string,
    state?: string
  };

  /**
   * Evenement émis lors du click du bouton
   */
  @Output() clickButton = new EventEmitter<string>();

  constructor( private modal: AfriflashModalProvider) { }

  ngOnInit() {
  }
 public async onAction() {
  }
}
