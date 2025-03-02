import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class KeycloakAuthService {
  constructor(private keycloak: KeycloakService) {}

  async isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  async getToken(): Promise<string | null> {
    const token = this.keycloak.getKeycloakInstance().token;
    return token ? token : null; // ✅ Convert `undefined` to `null`
  }

  async isAuthenticated(): Promise<boolean> {  // ✅ Added method
    return this.keycloak.isLoggedIn();
  }

  logout(): void {  // ✅ Added method
    this.keycloak.logout();
  }
}
