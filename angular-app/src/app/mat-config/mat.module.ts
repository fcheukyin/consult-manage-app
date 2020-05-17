import { NgModule } from '@angular/core';

//Material Component
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCtrl } from './matPaginatorInitCtrl';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule,MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS  } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider'
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY/MM',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY/MM',
  },
};


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatMomentDateModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatGridListModule,
    MatDividerModule,
    MatChipsModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
              {provide: MatPaginatorIntl, useClass: MatPaginatorIntlCtrl},
              {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
              {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
              {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
            ],
  exports: [
    BrowserAnimationsModule,
    MatMomentDateModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatGridListModule,
    MatDividerModule,
    MatChipsModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
})
export class MatModule { }