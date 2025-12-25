import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemDetails } from './product-item-details';

describe('ProductItemDetails', () => {
  let component: ProductItemDetails;
  let fixture: ComponentFixture<ProductItemDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductItemDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
