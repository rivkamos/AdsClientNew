import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdService } from '../../services/ad.service';
import { Ad } from '../../models/ad.model';
import { FilterAdsComponent } from '../filter-ads/filter-ads.component';
import { AdDetailsComponent } from '../ad-details/ad-details.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AdFormComponent } from '../ad-form/ad-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ad-list',
  standalone: true,
  imports: [FilterAdsComponent, AdDetailsComponent, AdFormComponent, AsyncPipe],
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit, OnDestroy {

  ads: Ad[] = [];
  filteredAds: Ad[] = [];
  filterText: string = '';
  currentUser$: Observable<User | null>;
  isModalOpen = false;
  isEditMode = false;
  selectedItem: any;
  private currentUserSubscription: Subscription; // Subscription for currentUser

  constructor(private adService: AdService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.adService.ads$.subscribe((ads: Ad[]) => {
      this.ads = ads;
      this.filteredAds = ads; 
    });

    this.adService.fetchAds();

    // Get currentUser observable
    this.currentUser$ = this.authService.getCurrentUser();
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  openAddModal() {
    this.selectedItem = null; // Reset for new item
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  openEditModal(item: any) {
    this.selectedItem = { ...item }; // Copy item for editing
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  onFilterChange(filterText: any) {
    this.filterText = filterText;
    this.filteredAds = this.ads.filter(ad =>
      ad.title.toLowerCase().includes(filterText) ||
      ad.location.city.toLowerCase().includes(filterText) ||
      ad.location.area.toLowerCase().includes(filterText)
    );
  }

  canEditOrDelete(ad: Ad): any{
    return this.currentUser$.pipe(
      map(user => user ? user.id === ad.creatorId : false)
    );
  }

  addAd(newAd: Ad): void {
    if (this.authService.isLoggedIn()) {
      this.ads.push(newAd);
      this.filteredAds = [...this.ads]; 
    } else {
      alert('You must be logged in to add an ad.');
    }
  }

  deleteAd(ad: any): void {
    this.currentUser$.subscribe(user => {
      if (user && user.id === ad.creatorId) {
        this.ads = this.ads.filter(a => a.id !== ad.id);
        this.filteredAds = [...this.ads]; // Refresh the filtered ads
      } else {
        alert('You do not have permission to delete this ad.');
      }
    });
  }

  updateAd(updatedAd: Ad): void {
    this.currentUser$.subscribe(user => {
      if (user && user.id === updatedAd.creatorId) {
        const index = this.ads.findIndex(a => a.id === updatedAd.id);
        if (index !== -1) {
          this.ads[index] = updatedAd;
          this.filteredAds = [...this.ads]; // Refresh the filtered ads
        }
      } else {
        alert('You do not have permission to update this ad.');
      }
    });
  }
}
