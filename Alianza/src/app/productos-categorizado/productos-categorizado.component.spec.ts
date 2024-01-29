import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCategorizadoComponent } from './productos-categorizado.component';

describe('ProductosCategorizadoComponent', () => {
  let component: ProductosCategorizadoComponent;
  let fixture: ComponentFixture<ProductosCategorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosCategorizadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosCategorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
