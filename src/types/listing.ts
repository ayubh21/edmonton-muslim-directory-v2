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
  logo: string;
  coverImage: string;
  galleryImages: string[];
}

export interface WorkDay {
  hours: WorkDayEntry[];
  checkBoxType: string;
}

export interface ListingWorkDays {
  Mon: WorkDay;
  Tue: WorkDay;
  Wed: WorkDay;
  Thu: WorkDay;
  Fri: WorkDay;
  Sat: WorkDay;
  Sun: WorkDay;
}
