import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { keycloakInterceptor } from '../interceptor/keyclock.interceptor';


@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private keycloak: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['']); // Redirect to login if not authenticated
      return false;
    }
    return true;
  }
}