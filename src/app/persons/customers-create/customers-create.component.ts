import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../models/person';
import { ValidationError } from '../../models/validationError';

@Component({
  selector: 'app-customers-create',
  templateUrl: './customers-create.component.html',
  styleUrls: ['./customers-create.component.css']
})
export class CustomersCreateComponent {

  person_id: number = 0;
  person: Person = new Person();
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
    this.person_id = this.route.snapshot.params['id'];

    if(this.person_id !== undefined && this.person_id != 0) {
      this.edit = true;
      
    }

    if(this.edit) {
      this.getPerson(this.person_id)
    }
  }

  getPerson(person_id: number) {
    this.http.get<Person>('/api/persons/detail/' + person_id)
    .subscribe(data => {
      this.person = data
    })
  }


  save(person: Person) {
    person.type = 'C';
    this.http.post('/api/persons/', person)
    .subscribe(
      result => {
        this.redirect()
      },
      error => {
        this.validationError(error)
      }
    )
  }

  update(person: Person) {
    console.log(person)
    this.http.put(`/api/persons/${this.person_id}/`, person)
    .subscribe(
      result => {
        this.redirect()
      },
      error => {
        this.validationError(error)
      }
    )
  }

  redirect() {
    this.router.navigate(['/customers']);
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
