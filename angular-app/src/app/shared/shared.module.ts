import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableFilterModule } from 'mat-table-filter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatTableFilterModule, FlexLayoutModule, ScrollingModule],
  exports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatTableFilterModule, FlexLayoutModule, ScrollingModule]
})
export class SharedModule { }