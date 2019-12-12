import { NgModule } from '@angular/core';
import { DisplayInventoryComponent } from './display-inventory/display-inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DisplayInventoryComponent,
    AddInventoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ],
  // exports: [
  //   DisplayInventoryComponent,
  //   AddInventoryComponent,
  // ]

})
export class PostsModule {}
