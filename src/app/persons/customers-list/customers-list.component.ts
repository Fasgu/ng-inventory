import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Person } from '../../models/person';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})

export class CustomersListComponent {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();

  customers: Person[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true
    };

    this.getCustomers()
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getCustomers()      
    });
  }

  getCustomers()  {
    this.http.get<Person[]>(`/api/persons/C/`).subscribe((result:any) => {
      this.customers = result
      this.dtTrigger.next(result);
    })
  }

  deleteCustomer(item_id: number) {
    this.http.delete(`/api/persons/${item_id}/`).subscribe(
      result => {
        this.rerender()
      }
    )
  }
}
