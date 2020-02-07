import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mailconfirmation',
  templateUrl: './mailconfirmation.component.html',
  styleUrls: ['./mailconfirmation.component.css']
})
export class MailconfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  aceptar() {
    this.router.navigate(['/launcher']);
  }


}
