import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAdsComponent } from './filter-ads.component';

describe('FilterAdsComponent', () => {
  let component: FilterAdsComponent;
  let fixture: ComponentFixture<FilterAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterAdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
