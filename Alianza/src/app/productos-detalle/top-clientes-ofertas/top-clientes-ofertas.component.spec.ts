import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClientesOfertasComponent } from './top-clientes-ofertas.component';

describe('TopClientesOfertasComponent', () => {
  let component: TopClientesOfertasComponent;
  let fixture: ComponentFixture<TopClientesOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopClientesOfertasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopClientesOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
