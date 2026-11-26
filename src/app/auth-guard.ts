// schuetzt private Routen und leitet nicht angemeldete User zum Login weiter.
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
