import { AdType } from "../enums/ad-type.enum";
import { AdLocation } from "./location.model";

export interface Ad {
    id: number
    title: string;
    type: AdType;
    location: AdLocation;
    description: string
    imageAdUrl: string,
    imageAdvertiserUrl: string
    postedDate: Date,
    likes: number,
    creatorId: string
    //public IFormFile AdFile { get; set; }
    //public IFormFile AdvertiserFile { get; set; }
}