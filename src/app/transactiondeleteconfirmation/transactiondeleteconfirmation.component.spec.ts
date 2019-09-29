import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactiondeleteconfirmationComponent } from './transactiondeleteconfirmation.component';

describe('TransactiondeleteconfirmationComponent', () => {
  let component: TransactiondeleteconfirmationComponent;
  let fixture: ComponentFixture<TransactiondeleteconfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactiondeleteconfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactiondeleteconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
