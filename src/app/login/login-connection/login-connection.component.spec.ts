import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConnectionComponent } from './login-connection.component';

describe('LoginConnectionComponent', () => {
  let component: LoginConnectionComponent;
  let fixture: ComponentFixture<LoginConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginConnectionComponent]
    });
    fixture = TestBed.createComponent(LoginConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
