import { Inventory } from './inventory.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private inventory: Inventory[] = [];
  private inventoryUpdated = new Subject<Inventory[]>();

  constructor(private http: HttpClient) {}

  getInventory() {
    this.http.get<{message: string, inventories: Inventory[]}>('http://localhost:3000/api/inventory')
      .subscribe((inventroyData) => {
        this.inventory = inventroyData.inventories;
        this.inventoryUpdated.next([...this.inventory]);
      });
  }

  getInventoryUpdateListener() {
    return this.inventoryUpdated.asObservable();
  }

  addInventory( make: string, model: string, year: number, stockNumber: string ) {
    const newInventory: Inventory = {id: null, make, model, year, stockNum: stockNumber};
    this.http.post<{message: string}>('http://localhost:3000/api/inventory', newInventory)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.inventory.push(newInventory);
        this.inventoryUpdated.next([...this.inventory]);
      });
  }
}
