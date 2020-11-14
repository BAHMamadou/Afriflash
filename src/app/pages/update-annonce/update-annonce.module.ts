import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAnnoncePageRoutingModule } from './update-annonce-routing.module';

import { UpdateAnnoncePage } from './update-annonce.page';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UpdateAnnoncePageRoutingModule,
        ComponentsModule
    ],
  declarations: [UpdateAnnoncePage]
})
export class UpdateAnnoncePageModule {}
