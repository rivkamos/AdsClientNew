import { Pipe, PipeTransform } from '@angular/core';
import { AdType } from '../enums/ad-type.enum';

@Pipe({
  name: 'adType',
  standalone: true
})
export class AdTypePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
        case AdType.Events:
            return "Events";
        case AdType.Buy_Sell:
            return "Buy/Sell";
        case AdType.Rent:
            return "Rent";
        case AdType.Travel:
            return "Travel";
        default:
            return "Unknown"; // Fallback for unknown types
    }
}
}
