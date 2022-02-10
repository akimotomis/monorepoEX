import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const material = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatDividerModule,

  MatRadioModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
];

@NgModule({
  declarations: [],
  exports: [material],
})
export class MaterialModule {}
