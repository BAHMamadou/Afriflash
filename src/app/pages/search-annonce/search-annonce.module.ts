import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchAnnoncePageRoutingModule } from './search-annonce-routing.module';

import { SearchAnnoncePage } from './search-annonce.page';
import {ComponentsModule} from '../../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchAnnoncePageRoutingModule,
        ComponentsModule,
        NgxPaginationModule
    ],
  declarations: [SearchAnnoncePage]
})
export class SearchAnnoncePageModule {}
