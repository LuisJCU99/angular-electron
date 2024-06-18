import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { initializeDatabase, getDatos } from '../../../app/database/database';
// import { UserService } from '../user.service';
import { pruebaService } from '../services/prueba.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: pruebaService) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  getDatos() {
    this.userService.readUsers().then((users: any[]) => {
      console.log(users);
    });
  }

}
