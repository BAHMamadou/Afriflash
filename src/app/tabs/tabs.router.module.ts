import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const home = '../pages/home/home.module#HomePageModule';
const registration = '../pages/registration/registration.module#RegistrationPageModule';
const informations = '../pages/informations/informations.module#InformationsPageModule';

const routes: Routes = [

          {
            path: '',
            component: TabsPage,
            children: [
              {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
              },
              {
                path: 'home',
                loadChildren: home
              },
              {
                path: 'registration',
                loadChildren: registration
              },

              {
                path: 'consult-informations',
                loadChildren: informations
              }

            ]
          }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
