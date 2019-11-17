import { Inventory } from './inventory.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private inventory: Inventory[] = [];
  private inventoryUpdated = new Subject<Inventory[]>();

  getInventory() {
    return [...this.inventory];
  }

  getInventoryUpdateListener() {
    return this.inventoryUpdated.asObservable();
  }

  addInventory( make: string, model: string, year: number, stockNumber: string ) {
    const newInventory: Inventory = {make, model, year, stockNum: stockNumber};
    this.inventory.push(newInventory);
    this.inventoryUpdated.next([...this.inventory]);

  }
}
