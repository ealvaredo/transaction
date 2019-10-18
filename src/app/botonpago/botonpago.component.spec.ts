import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonpagoComponent } from './botonpago.component';

describe('BotonpagoComponent', () => {
  let component: BotonpagoComponent;
  let fixture: ComponentFixture<BotonpagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonpagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
