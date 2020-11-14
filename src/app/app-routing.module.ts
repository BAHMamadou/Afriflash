import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const home = './pages/home/home.module#HomePageModule';
const registration = './pages/registration/registration.module#RegistrationPageModule';
const informations = './pages/informations/informations.module#InformationsPageModule';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: home},
    {path: 'registration', loadChildren: registration},
    {path: 'informations', loadChildren: informations},
    {
        path: 'publish-annonce',
        loadChildren: () => import('./pages/publish-annonce/publish-annonce.module').then(m => m.PublishAnnoncePageModule)
    },
    {
        path: 'search-annonce',
        loadChildren: () => import('./pages/search-annonce/search-annonce.module').then(m => m.SearchAnnoncePageModule)
    },
    {
        path: 'details-annonce',
        loadChildren: () => import('./pages/details-annonce/details-annonce.module').then(m => m.DetailsAnnoncePageModule)
    },
    {
        path: 'my-annonces',
        loadChildren: () => import('./pages/my-annonces/my-annonces.module').then(m => m.MyAnnoncesPageModule)
    },

    {
        path: 'update-annonce',
        loadChildren: () => import('./pages/update-annonce/update-annonce.module').then(m => m.UpdateAnnoncePageModule)
    }


];

/*

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  }

];
*/

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
