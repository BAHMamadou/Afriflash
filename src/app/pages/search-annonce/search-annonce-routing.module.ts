import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchAnnoncePage } from './search-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: SearchAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchAnnoncePageRoutingModule {}
