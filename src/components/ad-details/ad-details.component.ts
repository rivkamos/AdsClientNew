import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ad } from '../../models/ad.model';
import { AdTypeColorDirective } from '../../directives/ad-type-color.directive';
import { AdTypePipe } from '../../pipes/ad-type.pipe';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ad-details',
  standalone: true,
  imports: [DatePipe, AdTypeColorDirective, AdTypePipe, AsyncPipe],
  templateUrl: './ad-details.component.html',
  styleUrl: './ad-details.component.css'
})
export class AdDetailsComponent {
  @Input() ad : Ad;
  @Input() currentUser$: Observable<User | null>;
  @Output() deleteAdEvent : EventEmitter<any> = new EventEmitter<any>();

  updateAd(){

  }

  deleteAd(){
    this.deleteAdEvent.emit(this.ad);
  }
}
