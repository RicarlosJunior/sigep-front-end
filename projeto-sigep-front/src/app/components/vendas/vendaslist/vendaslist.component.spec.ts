import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaslistComponent } from './vendaslist.component';

describe('VendaslistComponent', () => {
  let component: VendaslistComponent;
  let fixture: ComponentFixture<VendaslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendaslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
