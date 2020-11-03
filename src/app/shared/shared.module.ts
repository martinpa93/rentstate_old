import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { getSpaPaginatorIntl } from './spa-paginator-intl';
import {MatTabsModule} from '@angular/material/tabs';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { FileSizePipe } from './pipes/file-size.pipe.';
import { OnlyNumber } from './directives/only-number.directive';
import { NgxCurrencyModule } from "ngx-currency";
import { customCurrencyMaskConfig } from './currency';
import { Ng5SliderModule } from 'ng5-slider';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTableModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    Ng5SliderModule,
    MatExpansionModule
  ],
  declarations: [
    FileSizePipe,
    OnlyNumber
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: MatPaginatorIntl, useValue: getSpaPaginatorIntl()},
    {provide: MAT_DATE_LOCALE, useValue: 'es-SP'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }
  ],
  exports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTableModule,
    FileSizePipe,
    OnlyNumber,
    NgxCurrencyModule,
    Ng5SliderModule,
    MatExpansionModule
  ]
})
export class SharedModule {
 }
