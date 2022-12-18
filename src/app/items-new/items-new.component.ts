import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Item } from '../models/item';
import { ValidationError } from '../models/validationError';

@Component({
  selector: 'app-items-new',
  templateUrl: './items-new.component.html',
  styleUrls: ['./items-new.component.css']
})
export class ItemsNewComponent {

  constructor(private http: HttpClient, private router: Router) {}

  errors = []
  validation_errors: ValidationError[] = [];

  redirect() {
    this.router.navigate(['/items']);
  }

  saveItem(item: Item) {
    console.log(item)
    this.http.post('/api/items/', item)
    .subscribe(
      result => {
        this.redirect()
      },
      error => {
        this.validation_errors = []
        this.errors = error.error.detail

        this.errors.map(error => {

          let field_description
          
          switch (error['loc'][1]) {
            case 'code':
              field_description = 'Código'
              break;
            case 'name':
              field_description = 'Nombre'
              break;
              case 'description':
                field_description = 'Descripción'
                break;
            case 'purchase_price':
              field_description = 'Precio Compra'
              break;
            case 'sale_price':
                field_description = 'Precio Venta'
                break;
            default:
              field_description = ''
              
          }
          
          this.validation_errors.push({
            field: error['loc'][1],
            field_description: field_description,
            message: error['msg']
          })
        })        
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    )
  }
}
