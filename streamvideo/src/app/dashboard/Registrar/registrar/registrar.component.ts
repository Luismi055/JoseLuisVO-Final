import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class RegistrarComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private toastr: ToastrService) {}

  registerUser() {
    this.loginService.register(this.email, this.password)
      .then(() => {
        this.toastr.success('Usuario registrado exitosamente');
        this.email = '';
        this.password = '';
      })
      .catch((error) => {
        this.toastr.error(error.message, 'Registro fallido');
      });
  }
}