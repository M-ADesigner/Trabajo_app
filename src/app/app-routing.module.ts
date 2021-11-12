import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetProductosComponent } from './backend/set-productos/set-productos.component';
import { HomePage } from './pages/home/home.page';
import { LoginComponent } from './pages/login/login.component';
import { ProfilePage } from './pages/profile/profile.page';


const routes: Routes = [

  { path: 'home',               component: HomePage }, //Importamos
  { path: 'Producto:id',        component: SetProductosComponent },
  { path: 'Login',              component: LoginComponent },
  { path: 'Perfil:',            component: ProfilePage },
  { path: '',                   component: HomePage },





  { path: '**',redirectTo: 'Login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
