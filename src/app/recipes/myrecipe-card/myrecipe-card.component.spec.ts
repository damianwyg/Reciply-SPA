import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrecipeCardComponent } from './myrecipe-card.component';

describe('MyrecipeCardComponent', () => {
  let component: MyrecipeCardComponent;
  let fixture: ComponentFixture<MyrecipeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrecipeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
