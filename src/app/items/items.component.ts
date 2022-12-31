import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Item } from '../models/item';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();

  items: Item[] = [];

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

    this.getItems()
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getItems()      
    });
  }

  redirect() {
    this.router.navigate(['/items/']);
  }

  getItems()  {
    this.http.get<Item[]>(`/api/items/`).subscribe((result:any) => {
        this.items = result
        this.dtTrigger.next(result);
      }
    )
  }

  deleteItem(item_id: number) {
    this.http.delete(`/api/items/${item_id}/`).subscribe(
      result => {
        this.rerender()
      }
    )
  }
}
