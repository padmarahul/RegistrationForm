import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

import { keycloakInterceptor } from './interceptor/keyclock.interceptor';
import { routes } from './routes/app.routes';

// ✅ Keycloak Initialization Function
function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    if (typeof window !== 'undefined') {
      return keycloak.init({
        config: {
          url: 'http://localhost:8085',
          realm: 'registration_form',
          clientId: 'angular-client'
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        },
        enableBearerInterceptor: true
      }).then(() => {
        console.log('Keycloak initialized successfully.');
      }).catch((err) => {
        console.error('Keycloak initialization failed:', err);
      });
    }
    return Promise.resolve();
  };
}

// ✅ Application Configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([keycloakInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    KeycloakService
  ]
};