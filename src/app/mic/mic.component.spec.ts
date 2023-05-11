import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicComponent } from './mic.component';

describe('MicComponent', () => {
  let component: MicComponent;
  let fixture: ComponentFixture<MicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
