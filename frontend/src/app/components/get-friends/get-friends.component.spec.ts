import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFriendsComponent } from './get-friends.component';

describe('GetFriendsComponent', () => {
  let component: GetFriendsComponent;
  let fixture: ComponentFixture<GetFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
