import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AppComponent, GridComponent],
  imports: [BrowserModule, AppRoutingModule, AgGridModule.withComponents([])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
