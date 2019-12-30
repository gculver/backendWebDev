import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddcurrentInventoryComponent } from './app-addcurrent-inventory.component';

describe('AppAddcurrentInventoryComponent', () => {
  let component: AppAddcurrentInventoryComponent;
  let fixture: ComponentFixture<AppAddcurrentInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAddcurrentInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddcurrentInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
