import { Component, OnInit } from '@angular/core';
import { KeycloakAuthService } from './keyclock-Config/keycloak-config';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from "./component/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private keycloak: KeycloakAuthService) {}

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.keycloak.isAuthenticated(); // ✅ Await the async function
    this.keycloak.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.keycloak.getToken().then((token) => {
          console.log('Keycloak Token:', token);
        }).catch((err) => {
          console.error('Failed to get token:', err);
        });
      } else {
        console.error('User is not logged in.');
      }
    });
  }

 
}
