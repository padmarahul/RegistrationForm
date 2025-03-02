import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetaisComponent } from './personal-detais.component';

describe('PersonalDetaisComponent', () => {
  let component: PersonalDetaisComponent;
  let fixture: ComponentFixture<PersonalDetaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalDetaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
