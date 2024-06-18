import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { initializeDatabase, getDatos } from '../../../app/database/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  // getDatos(){
  //   // getDatos()
  //   //   .subscribe(arg => {
  //   //     console.log("Datos:");
  //   //     console.log(arg);
  //   //   });
  //   // ;
  // }

}
