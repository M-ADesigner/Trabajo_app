import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home/home.page';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilePage } from './profile/profile.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  declarations: [HomePage,LoginComponent,ProfilePage]
})
export class PagesPageModule {}
