import { Component } from '@angular/core';
import { FireBaseAuthService } from './services/fire-base-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private fireBaseAuthService: FireBaseAuthService ) {
    this.fireBaseAuthService.gerUid();
  }
}
