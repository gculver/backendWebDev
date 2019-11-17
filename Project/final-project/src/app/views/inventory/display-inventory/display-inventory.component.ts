import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';
import { Subscription } from 'rxjs';


// const ELEMENT_DATA: InventoryData[] = [
//   {Make: 'chevy', Model: 'Tahoe'},
//   {Make: 'chevy', Model: 'Tahoe'},
//   {Make: 'chevy', Model: 'Tahoe'},
//   {Make: 'chevy', Model: 'Tahoe'}
// ];
@Component({
  selector: 'app-display-inventory',
  templateUrl: './display-inventory.component.html',
  styleUrls: ['./display-inventory.component.css']
})
export class DisplayInventoryComponent implements OnInit, OnDestroy {

inventory: Inventory[] = [];
private inventorySub: Subscription;

displayedColumns: string[] = ['make', 'model'];
dataSource = this.inventory;

constructor(public inventoryService: InventoryService ) {}

  ngOnInit() {
    this.inventory = this.inventoryService.getInventory();
    this.inventorySub = this.inventoryService.getInventoryUpdateListener()
      .subscribe((inventory: Inventory[]) => {
        this.inventory = inventory;
      });
  }

  ngOnDestroy() {
    this.inventorySub.unsubscribe();
  }

}
