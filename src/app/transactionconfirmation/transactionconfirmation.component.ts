import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactionconfirmation',
  templateUrl: './transactionconfirmation.component.html',
  styleUrls: ['./transactionconfirmation.component.css']
})
export class TransactionconfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  aceptar() {

    this.router.navigate(['/launcher']);
  }

}
