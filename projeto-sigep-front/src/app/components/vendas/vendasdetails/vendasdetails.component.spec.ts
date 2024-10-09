import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasdetailsComponent } from './vendasdetails.component';

describe('VendasdetailsComponent', () => {
  let component: VendasdetailsComponent;
  let fixture: ComponentFixture<VendasdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendasdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
