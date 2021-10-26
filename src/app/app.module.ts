import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { MyCounterComponent } from './my-counter/my-counter.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';

@NgModule({
  declarations: [AppComponent, GridComponent, MyCounterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    StoreModule.forRoot({ myStore: reducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
