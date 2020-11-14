import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsAnnoncePageRoutingModule } from './details-annonce-routing.module';

import { DetailsAnnoncePage } from './details-annonce.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsAnnoncePageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetailsAnnoncePage]
})
export class DetailsAnnoncePageModule {}
