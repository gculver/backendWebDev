import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-sold-inventory',
  templateUrl: './add-sold-inventory.component.html',
  styleUrls: ['./add-sold-inventory.component.css']
})

export class AddSoldInventoryComponent implements OnInit {
  soldForm: FormGroup;

  constructor(public inventoryService: InventoryService) {}
  onAddInventory(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.inventoryService.addInventory(
      form.value.year,
      form.value.make,
      form.value.model,
      form.value.stockNumber
    );
    form.resetForm();
  }
  ngOnInit() {
    this.soldForm = new FormGroup({
      upload: new FormControl(null, { validators: [] })
    });
  }


  // Adding Sold Inventory File
// this.soldForm = new FormGroup({
//     soldUpload: new FormControl(null, {validators: []})
//   });

 // Sold File Picked for Upload
  onSoldInventoryPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.soldForm.patchValue({soldUpload: file});
    // this.soldForm.get('soldUpload').updateValueAndValidity();  // What does this do??
    this.inventoryService.addSoldFile(file);
  }
}
