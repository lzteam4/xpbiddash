export interface IProduct {
    Id: string;
    Name: string;
    Code: string;
    Price: number;
    StarRating: number;
    Description: string;
    ImageUrl: string;
    Category: string;
    Tags: string[];
    ReleaseTimestamp: Date;
    CreatedTimestamp: Date;
}