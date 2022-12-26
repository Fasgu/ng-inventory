import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../models/item';
import { ValidationError } from '../models/validationError';

@Component({
  selector: 'app-items-new',
  templateUrl: './items-new.component.html',
  styleUrls: ['./items-new.component.css']
})
export class ItemsNewComponent {

  item_id: number = 0;
  item: Item = new Item();
  edit: boolean = false;
  errors = []
  validation_errors: ValidationError[] = [];
  form_message = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  

  ngOnInit(): void {    
    this.item_id = this.route.snapshot.params['id'];

    if(this.item_id !== undefined && this.item_id != 0) {
      this.edit = true;
      
    }

    if(this.edit) {
      this.getItem(this.item_id)
    }
  }

  redirect() {
    this.router.navigate(['/items']);
  }

  getItem(item_id: number) {
    this.http.get<Item>('/api/items/' + item_id)
    .subscribe(data => {
      this.item = data
    })
  }

  saveItem(item: Item) {
    this.http.post('/api/items/', item)
    .subscribe(
      result => {
        this.redirect()
      },
      error => {
        this.validationError(error)
      }
    )
  }

  updateItem(item: Item) {
    console.log(item)
    this.http.put(`/api/items/${this.item_id}/`, item)
    .subscribe(
      result => {
        this.redirect()
      },
      error => {
        this.validationError(error)
      }
    )
  }

  validationError(error: any) {
    this.validation_errors = []
    this.errors = error.error.detail

    console.log(this.errors)

    if(typeof this.errors == "string"){
      this.form_message = this.errors
    }
    else {
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
    }    
  }
}