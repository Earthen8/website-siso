export interface Section {
  id: number;
  page: string;
  section_type: string;
  is_visible: boolean;
  order: number;
  config: Record<string, unknown>;
}

export interface Organization {
  id: number;
  slogan: string;
  visi: string;
  misi: string;
  nilai: string[];
  filosofi_logo: string;
  logo: string | null;
}

export interface Division {
  id: number;
  name: string;
  slug: string;
  group_photo: string | null;
  jobdesc: string;
  order: number;
}

export interface BPHMember {
  id: number;
  name: string;
  photo: string | null;
  role: string;
  division: number | null;
  order: number;
  generation_year: number;
}

export type ProgramCategory = "event" | "workshop" | "seminar" | "competition" | "pengmas";

export interface MediaAsset {
  id: number;
  file: string;
  type: "photo" | "video";
  caption?: string | null;
}

export interface ProgramKerja {
  id: number;
  title: string;
  slug: string;
  category: ProgramCategory;
  description: string;
  date: string | null;
  cover_image: string | null;
  is_visible: boolean;
  location?: string | null;
  registration_url?: string | null;
  media_assets: MediaAsset[];
}

export interface Achievement {
  id: number;
  student_name: string;
  title: string;
  description: string;
  date: string | null;
  image: string | null;
}

export type ArticleCategory = "jurnal" | "kajian" | "achievement" | "beasiswa";

export interface Article {
  id: number;
  title: string;
  slug: string;
  body: string;
  category: ArticleCategory;
  published_at: string | null;
  is_visible: boolean;
}

export interface ContactInfo {
  id: number;
  email: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  spotify: string;
  whatsapp: string;
  line: string;
  location: string;
  maps_embed: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  is_visible: boolean;
}

export interface FormSubmissionPayload {
  type: "kritik_saran" | "request_seminar";
  payload: Record<string, unknown>;
}
