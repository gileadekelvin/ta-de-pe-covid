import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipAjudaComponent } from './tooltip-ajuda.component';

describe('TooltipAjudaComponent', () => {
  let component: TooltipAjudaComponent;
  let fixture: ComponentFixture<TooltipAjudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooltipAjudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
