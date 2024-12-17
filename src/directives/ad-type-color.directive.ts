import { Directive, ElementRef, Input } from '@angular/core';
import { AdType } from '../enums/ad-type.enum';

@Directive({
  selector: '[appAdTypeColor]',
  standalone: true
})
export class AdTypeColorDirective {
  @Input() appAdTypeColor: AdType;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const color = this.getColor(this.appAdTypeColor);
    this.el.nativeElement.style.backgroundColor = color;
  }

  private getColor(adType: AdType): string {
    switch (adType) {
      case AdType.Buy_Sell: 
        return 'pink';
      case AdType.Events:
        return 'lightgreen';
      case AdType.Rent:
        return 'lightcoral';
      case AdType.Travel:
        return 'lightcoral';
      default:
        return 'lightgray'; 
    }
  }
}
