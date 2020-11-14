import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAnnoncesPageRoutingModule } from './my-annonces-routing.module';

import { MyAnnoncesPage } from './my-annonces.page';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MyAnnoncesPageRoutingModule,
        ComponentsModule
    ],
  declarations: [MyAnnoncesPage]
})
export class MyAnnoncesPageModule {}
