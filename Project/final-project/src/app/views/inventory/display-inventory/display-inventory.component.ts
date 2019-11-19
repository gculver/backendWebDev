import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-inventory',
  templateUrl: './display-inventory.component.html',
  styleUrls: ['./display-inventory.component.css']
})
export class DisplayInventoryComponent implements OnInit, OnDestroy {

  inventory: Inventory[] = [];
  private inventorySub: Subscription;

displayedColumns: string[] = ['make', 'model', 'instock', 'sold', 'difference'];
dataSource = this.inventory;

constructor(public inventoryService: InventoryService ) {}

  ngOnInit() {
    this.inventoryService.getInventory();
    this.inventorySub = this.inventoryService.getInventoryUpdateListener()
      .subscribe((inventory: Inventory[]) => {
        this.inventory = inventory;
      });
  }

  ngOnDestroy() {
    this.inventorySub.unsubscribe();
  }

}
