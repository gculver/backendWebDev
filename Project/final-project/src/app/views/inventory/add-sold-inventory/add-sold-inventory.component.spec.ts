import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoldInventoryComponent } from './add-sold-inventory.component';

describe('AddSoldInventoryComponent', () => {
  let component: AddSoldInventoryComponent;
  let fixture: ComponentFixture<AddSoldInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSoldInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoldInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
