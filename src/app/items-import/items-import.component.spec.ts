import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsImportComponent } from './items-import.component';

describe('ItemsImportComponent', () => {
  let component: ItemsImportComponent;
  let fixture: ComponentFixture<ItemsImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
