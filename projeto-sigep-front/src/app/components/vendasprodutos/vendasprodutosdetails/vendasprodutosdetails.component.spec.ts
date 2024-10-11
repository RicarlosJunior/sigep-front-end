import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasprodutosdetailsComponent } from './vendasprodutosdetails.component';

describe('VendasprodutosdetailsComponent', () => {
  let component: VendasprodutosdetailsComponent;
  let fixture: ComponentFixture<VendasprodutosdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendasprodutosdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendasprodutosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
