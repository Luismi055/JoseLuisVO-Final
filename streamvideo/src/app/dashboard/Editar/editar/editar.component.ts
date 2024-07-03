import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class EditarComponent {
  email: string = '';
  newEmail: string = '';

  constructor(private loginService: LoginService, private toastr: ToastrService) {}

  editUser() {
    this.loginService.getUsersByEmail(this.email).then(users => {
      const user = users[0];
      if (user) {
        this.loginService.updateUser(user.uid, this.newEmail)
          .then(() => {
            this.toastr.success('Usuario editado exitosamente');
            this.email = '';
            this.newEmail = '';
          })
          .catch((error) => {
            this.toastr.error(error.message, 'Edición fallida');
          });
      } else {
        this.toastr.error('Usuario no encontrado');
      }
    }).catch((error) => {
      this.toastr.error('Error al buscar el usuario');
    });
  }
}