import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';

class DataTablesResponse {
  data: any[] = [];
  draw: number = 1;
  recordsFiltered: number = 0;
  recordsTotal: number = 0;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  items: Item[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      },
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .get<DataTablesResponse>(
            '/api/items/',
            dataTablesParameters
          ).subscribe((resp:any) => {
            this.items = resp;

            callback({
              recordsTotal: 10,
              recordsFiltered: 3,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'code' }, { data: 'name' }]
    };
  }
}
