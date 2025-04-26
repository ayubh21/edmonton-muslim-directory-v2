export interface Listing {
  title: string;
  tagLine: string;
  Description: string;
  logo: string;
  coverImage: string;
  galleryImages: string[];
  contact: Contact;
  networks: Social;
  address: string[];
  categories: string[];
  tags: string[];
  workHours: WorkDays;
}

interface Contact {
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

export interface WorkDays {
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
