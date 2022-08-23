import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XatComponent } from './xat.component';

describe('XatComponent', () => {
  let component: XatComponent;
  let fixture: ComponentFixture<XatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
