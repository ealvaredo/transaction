import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactiondeleteconfirmation',
  templateUrl: './transactiondeleteconfirmation.component.html',
  styleUrls: ['./transactiondeleteconfirmation.component.css']
})
export class TransactiondeleteconfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  aceptar() {
    this.router.navigate(['/launcher']);
  }

}
