import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ItemsComponent } from './items/items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { ItemsNewComponent } from './items-new/items-new.component';
import { ItemsImportComponent } from './items-import/items-import.component';

import { HotToastModule } from '@ngneat/hot-toast'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    ItemsComponent,
    ItemsNewComponent,
    ItemsImportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    HotToastModule.forRoot({
      position: 'top-right'
      // theme: 'snackbar'
    })
    ,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'items/create', component: ItemsNewComponent },
      { path: 'items/import', component: ItemsImportComponent },
      { path: 'items/edit/:id', component: ItemsNewComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
