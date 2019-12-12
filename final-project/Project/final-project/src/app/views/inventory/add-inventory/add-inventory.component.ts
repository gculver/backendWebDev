import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  enteredYear;
  enteredMake = '';
  enteredModel = '';
  enteredStockNum;


  constructor(public inventoryService: InventoryService) {}

  onAddInventory(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    this.inventoryService.addInventory(form.value.year, form.value.make, form.value.model, form.value.stockNumber);
    form.resetForm();
  }

  ngOnInit() {
  }

}
