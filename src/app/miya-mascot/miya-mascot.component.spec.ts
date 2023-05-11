import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiyaMascotComponent } from './miya-mascot.component';

describe('MiyaMascotComponent', () => {
  let component: MiyaMascotComponent;
  let fixture: ComponentFixture<MiyaMascotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiyaMascotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiyaMascotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
