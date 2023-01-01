import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx'
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-items-import',
  templateUrl: './items-import.component.html',
  styleUrls: ['./items-import.component.css']
})
export class ItemsImportComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement2!: DataTableDirective;

  dtTrigger2: Subject<any> = new Subject<any>();

  excelData: any = [];
  excelName: string = '';

  dtOptions2: DataTables.Settings = {};

  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.toast.success('Productos guardados correctamente');
    this.dtOptions2 = {
      pagingType: 'full_numbers',
      processing: true
    };
  }

  readExcelItems(event: any) {
    let file = event.target.files[0];

    this.excelName = file.name

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, {type: 'binary'});
      console.log(workBook)
      var sheetNames = workBook.SheetNames;
      console.log(sheetNames)
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      console.log(this.excelData)
    }

    this.dtTrigger2.next(this.excelData);
  }

  deleteItemImport(index: number) {
    this.excelData.splice(index, 1);
  }

  saveItems() {    
    this.http.post('/api/items/bulk/', this.excelData)
    .subscribe(
      result => {
        this.toast.success('Productos guardados correctamente');
        this.reset()
      },
      error => {
        this.toast.error('Error al importar productos');
      }
    )
  }

  reset() {
    this.excelData = [];
    this.excelName = '';
  }
}
