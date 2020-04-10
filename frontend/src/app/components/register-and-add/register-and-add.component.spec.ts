import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAndAddComponent } from './register-and-add.component';

describe('RegisterAndAddComponent', () => {
  let component: RegisterAndAddComponent;
  let fixture: ComponentFixture<RegisterAndAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAndAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAndAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
