export interface Listing {
  title: string;
  tagLine: string;
  description: string;
  images: Images;
  contact: Contact;
  networks: Social[];
  addresses: string[];
  categories: string[];
  tags: string[];
  workHours: ListingWorkDays;
}

export interface Contact {
  email: string;
  phoneNumber: string;
  websiteUrl: string;
}

export interface Social {
  type: string;
  url: string;
}

export interface WorkDayEntry {
  FROM: string;
  TO: string;
}

export interface Images {
  logo: Logo;
  coverImage: CoverImage;
  galleryImages: Gallery[];
}

export interface Logo {
  url: string;
  preview: string;
}

export interface CoverImage {
  url: string;
  preview: string;
}

export interface Gallery {
  url: string;
  preview: string;
}

export interface ListingWorkDays {
  Mon: {
    hours: WorkDayEntry[];
  };

  Tue: {
    hours: WorkDayEntry[];
  };

  Wed: {
    hours: WorkDayEntry[];
  };

  Thu: {
    hours: WorkDayEntry[];
  };

  Fri: {
    hours: WorkDayEntry[];
  };

  Sat: {
    hours: WorkDayEntry[];
  };

  Sun: {
    hours: WorkDayEntry[];
  };
}
