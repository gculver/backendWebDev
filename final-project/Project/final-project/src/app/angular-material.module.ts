import { NgModule } from '@angular/core';
import { MatSelectModule, MatCardModule, MatButtonModule, MatToolbarModule, MatTableModule,
  MatInputModule, MatDialogModule } from '@angular/material';

@NgModule({
  exports: [
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule {}
