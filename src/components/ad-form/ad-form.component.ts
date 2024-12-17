import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ad } from '../../models/ad.model';
import { AdType } from '../../enums/ad-type.enum';
import { MatError, MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatDialogContent } from '@angular/material/dialog';
import { KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-ad-form',
    standalone: true,
    imports: [ReactiveFormsModule,
        KeyValuePipe,
        MatFormField,
        MatLabel, 
        MatOption, MatDialogContent,
        MatFormFieldModule,
        MatFormField
    ],
    templateUrl: './ad-form.component.html',
    styleUrl: './ad-form.component.css'
})
export class AdFormComponent {
    @Input() isOpen: boolean;
    @Input() isEditMode: boolean;
    @Input() item: Ad;
    @Output() closeModal = new EventEmitter<void>();
    @Output() saveItem = new EventEmitter<Ad>();

    adForm: FormGroup;
    selectedAdImage: File | null = null;
    adTypes = AdType;

    constructor(private fb: FormBuilder) {
        this.adForm = this.fb.group({
            title: ['', Validators.required],
            type: ['', Validators.required],
            location: ['', Validators.required],
            description: ['', Validators.required],
            imageAdUrl: [''],
            imageAdvertiserUrl: [''],
            postedDate: [new Date()],
            likes: [0],
            creatorId: [1] // Replace with actual creator ID logic
        });
    }

    ngOnChanges() {
        if (this.isEditMode && this.item) {
            this.adForm.patchValue(this.item);
        }
    }

    onFileChange(event: any, type: any) {
        if (event.target.files.length > 0) {
            this.selectedAdImage = event.target.files[0];
        }
    }

    onSubmit() {
        if (this.adForm.valid) {
            const newAd: Ad = { ...this.adForm.value }; // Example ID generation
            if (this.selectedAdImage) {
                // Handle image upload logic here
                // For example, upload the image to a server and get the URL
                // newAd.imageAdUrl = await this.uploadImage(this.selectedAdImage);
            }
            this.saveItem.emit(newAd);
        }
    }

    close() {
        this.closeModal.emit();
    }

    // Example image upload method
    private uploadImage(file: File): Promise<string> {
        // Implement your image upload logic here
        return Promise.resolve('uploaded-image-url'); // Replace with actual URL
    }
}