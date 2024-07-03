import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UsuariosComponent implements OnInit {
  users: any[] = [];

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}