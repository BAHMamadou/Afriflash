import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishAnnoncePageRoutingModule } from './publish-annonce-routing.module';

import { PublishAnnoncePage } from './publish-annonce.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishAnnoncePageRoutingModule,
    ComponentsModule
  ],
  declarations: [PublishAnnoncePage]
})
export class PublishAnnoncePageModule {}
