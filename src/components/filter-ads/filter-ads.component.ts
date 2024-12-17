import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-ads',
  standalone: true,
  imports: [],
  templateUrl: './filter-ads.component.html',
  styleUrl: './filter-ads.component.css'
})
export class FilterAdsComponent {
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();

  onFilterChange(text: any) {

    this.filterChange.emit(text.toLowerCase());
  }
}
