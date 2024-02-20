import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMesActualComponent } from './productos-mes-actual.component';

describe('ProductosComponent', () => {
  let component: ProductosMesActualComponent;
  let fixture: ComponentFixture<ProductosMesActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosMesActualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosMesActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
