import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionconfirmationComponent } from './transactionconfirmation.component';

describe('TransactionconfirmationComponent', () => {
  let component: TransactionconfirmationComponent;
  let fixture: ComponentFixture<TransactionconfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionconfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
