import { Component } from '@angular/core';
import { KeycloakAuthService } from '../../keyclock-Config/keycloak-config';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private keycloak: KeycloakAuthService,private router: Router) {}
  logout(): void {
    this.keycloak.logout();
    this.router.navigate(['/']);
  }

}
 