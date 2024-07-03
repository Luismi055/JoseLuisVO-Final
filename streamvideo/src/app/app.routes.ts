import { RouterModule, Routes,} from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardLoginComponent } from './components/dashboard-login/dashboard-login.component';
import { BrowseComponent } from './Pages/browse/browse.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { RegistrarComponent } from './dashboard/Registrar/registrar/registrar.component';
import { EliminarComponent } from './dashboard/Eliminar/eliminar/eliminar.component';
import { UsuariosComponent } from './dashboard/VerUsuarios/usuarios/usuarios.component';
import { EditarComponent } from './dashboard/Editar/editar/editar.component';
import { NgModule } from '@angular/core';
import { NuevoComponent } from './dashboard/Añadir/nuevo/nuevo.component';
import { VideoPlayerComponent } from './Pages/video-player/video-player.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'browse', component: BrowseComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-login', component: DashboardLoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'registrar', component: RegistrarComponent },
      { path: 'eliminar', component: EliminarComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'editar', component: EditarComponent },
      {path: 'añadir', component: NuevoComponent}
    ]
  },
  { path: 'video-player', component: VideoPlayerComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }