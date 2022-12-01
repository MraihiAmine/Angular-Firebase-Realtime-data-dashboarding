import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempHumLineChartComponent } from './temp-hum-line-chart.component';

describe('TempHumLineChartComponent', () => {
  let component: TempHumLineChartComponent;
  let fixture: ComponentFixture<TempHumLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempHumLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempHumLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
