export interface Bullet {
  number: string;
  text: string;
}

export interface SocialLink {
  label: string;
  url: string;
  highlight?: boolean;
}

export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
}

export interface SectionData {
  id: string;
  navLabel: string;
  bgTitle: string;
  badge: string;
  title: string;
  bullets?: Bullet[];
  description?: string;
  formFields?: FormField[];
  socialLinks?: SocialLink[];
  contactLead?: string;
}

export interface VideoSegment {
  name: string;
  startProgress: number;
  endProgress: number;
  startTime: number;
  endTime: number;
}

export interface VideoGlide {
  atProgress: number;
  xPercent: number;
}

export interface SectionEntrance {
  selector: string;
  position: number;
  from: Record<string, number | string>;
  to: Record<string, number | string>;
  duration: number;
  ease?: string;
  stagger?: number;
}

export interface SectionTimeline {
  enter: number;
  exit: number;
  entranceAnimations: SectionEntrance[];
  exitAnimations: SectionEntrance[];
}
