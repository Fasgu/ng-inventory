import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ItemsComponent } from './items/items.component';
import { ItemsNewComponent } from './items-new/items-new.component';
import { ItemsImportComponent } from './items-import/items-import.component';

import { CustomersListComponent } from './persons/customers-list/customers-list.component';
import { CustomersCreateComponent } from './persons/customers-create/customers-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    ItemsComponent,
    ItemsNewComponent,
    ItemsImportComponent,
    CustomersListComponent,
    CustomersCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    DataTablesModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'items/create', component: ItemsNewComponent },
      { path: 'items/import', component: ItemsImportComponent },
      { path: 'items/edit/:id', component: ItemsNewComponent },
      { path: 'customers', component: CustomersListComponent },
      { path: 'customers/create', component: CustomersCreateComponent },
      { path: 'customers/edit/:id', component: CustomersCreateComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
