import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(LoginService) private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    // Escuchar cambios en el estado del usuario y redirigir si no está autenticado
    return this.loginService.currentUser$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']); // Redirigir a 'login' si el usuario no está autenticado
          return false;
        }
      })
    );
  }
}




  /* const authState = authServiceEstate()
  const router = routerService()
  return authState.pipe(
    map((user: string) => {
      if (!user){
        router.navigateByUrl("/auth/log-in").then()
        return false
      }
      return true
    })
  );
};

export const publicGuard: CanActivateFn = (route, state)=>{
  const authState = authServiceEstate()
  const router = routerService()
  return authState.pipe(
    map(user =>{
      if (user){
        router.navigateByUrl("/dashboard").then()
        return false
      }
      return true
    })
  );*/

