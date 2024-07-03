import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class EliminarComponent {
  email: string = '';

  constructor(private loginService: LoginService, private toastr: ToastrService) {}

  deleteUser() {
    this.loginService.deleteUser(this.email)
      .then(() => {
        this.toastr.success('Usuario eliminado exitosamente');
        this.email = '';
      })
      .catch((error) => {
        this.toastr.error(error.message, 'Eliminación fallida');
      });
  }
}