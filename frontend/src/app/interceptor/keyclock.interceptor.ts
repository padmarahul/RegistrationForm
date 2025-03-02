import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const keycloakInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const keycloak = inject(KeycloakService);

  if (keycloak.isLoggedIn()) {
    return new Observable<HttpRequest<unknown>>((observer) => {
      keycloak.getToken().then((token) => {
        if (token) {
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          observer.next(clonedReq);
        } else {
          observer.next(req);
        }
        observer.complete();
      });
    }).pipe(switchMap((clonedReq: HttpRequest<unknown>) => next(clonedReq)));
  }

  return next(req);
};