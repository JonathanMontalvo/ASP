import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMascotasComponent } from './ver-mascotas.component';

describe('VerMascotasComponent', () => {
  let component: VerMascotasComponent;
  let fixture: ComponentFixture<VerMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerMascotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
