import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAnnoncesPage } from './my-annonces.page';

const routes: Routes = [
  {
    path: '',
    component: MyAnnoncesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAnnoncesPageRoutingModule {}
