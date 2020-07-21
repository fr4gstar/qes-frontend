import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameboxComponent } from './gamebox.component';

describe('GameboxComponent', () => {
  let component: GameboxComponent;
  let fixture: ComponentFixture<GameboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
