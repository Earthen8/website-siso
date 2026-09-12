import type {
  Article,
  BPHMember,
  ContactInfo,
  Division,
  FAQ,
  FormSubmissionPayload,
  MediaAsset,
  Organization,
  ProgramKerja,
  Section,
  Achievement,
} from "./types";

export type {
  Article,
  BPHMember,
  ContactInfo,
  Division,
  FAQ,
  FormSubmissionPayload,
  MediaAsset,
  Organization,
  ProgramKerja,
  Section,
  Achievement,
};

function getApiBase(): string {
  if (typeof window === "undefined") {
    return (
      process.env.INTERNAL_API_BASE_URL ??
      process.env.NEXT_PUBLIC_API_BASE_URL ??
      "http://localhost:8000/api/v1"
    );
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getApiBase()}${path}`;
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`API error ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json() as Promise<T>;
}

export function fetchSections(page: string): Promise<Section[]> {
  return apiFetch<Section[]>(`/sections/?page=${page}&visible=true`, {
    next: { revalidate: 60 },
  });
}

export function fetchOrganization(): Promise<Organization> {
  return apiFetch<Organization>("/organization/", {
    next: { revalidate: 300 },
  });
}

export function fetchMembers(generation?: number): Promise<BPHMember[]> {
  const query = generation ? `?generation=${generation}` : "";
  return apiFetch<BPHMember[]>(`/members/${query}`, {
    next: { revalidate: 300 },
  });
}

export function fetchDivisions(): Promise<Division[]> {
  return apiFetch<Division[]>("/divisions/", { next: { revalidate: 300 } });
}

export function fetchDivision(slug: string): Promise<Division> {
  return apiFetch<Division>(`/divisions/${slug}/`, {
    next: { revalidate: 300 },
  });
}

export interface FetchProgramsParams {
  category?: string;
  featured?: boolean;
  upcoming?: boolean;
  limit?: number;
}

export async function fetchPrograms(
  params?: string | FetchProgramsParams
): Promise<ProgramKerja[]> {
  const query = new URLSearchParams({ visible: "true" });

  if (typeof params === "string") {
    if (params) query.set("category", params);
  } else if (params && typeof params === "object") {
    if (params.category) query.set("category", params.category);
    if (params.featured) query.set("featured", "true");
    if (params.upcoming) query.set("upcoming", "true");
    if (params.limit) query.set("limit", String(params.limit));
  }

  return apiFetch<ProgramKerja[]>(`/programs/?${query.toString()}`, {
    next: { revalidate: 60 },
  });
}

export function fetchProgram(slug: string): Promise<ProgramKerja> {
  return apiFetch<ProgramKerja>(`/programs/${slug}/`, {
    next: { revalidate: 60 },
  });
}

export async function fetchAchievements(limit?: number): Promise<Achievement[]> {
  const query = limit ? `?limit=${limit}` : "";
  return apiFetch<Achievement[]>(`/achievements/${query}`, {
    next: { revalidate: 300 },
  });
}

export interface FetchMediaParams {
  limit?: number;
  type?: "photo" | "video";
}

export async function fetchMedia(
  params?: number | FetchMediaParams
): Promise<MediaAsset[]> {
  let query = "";
  if (typeof params === "number") {
    query = `?limit=${params}`;
  } else if (params && typeof params === "object") {
    const q = new URLSearchParams();
    if (params.limit) q.set("limit", String(params.limit));
    if (params.type) q.set("type", params.type);
    const qs = q.toString();
    if (qs) query = `?${qs}`;
  }

  return apiFetch<MediaAsset[]>(`/media-assets/${query}`, {
    next: { revalidate: 300 },
  });
}

export function fetchArticles(category?: string): Promise<Article[]> {
  const query = category ? `?category=${category}` : "";
  return apiFetch<Article[]>(`/articles/${query}`, {
    next: { revalidate: 300 },
  });
}

export function fetchArticle(slug: string): Promise<Article> {
  return apiFetch<Article>(`/articles/${slug}/`, {
    next: { revalidate: 300 },
  });
}

export function fetchContact(): Promise<ContactInfo> {
  return apiFetch<ContactInfo>("/contact/", { next: { revalidate: 3600 } });
}

export function fetchFAQs(): Promise<FAQ[]> {
  return apiFetch<FAQ[]>("/faq/", { next: { revalidate: 3600 } });
}

export async function submitForm(data: FormSubmissionPayload): Promise<void> {
  const url = `${getApiBase()}/contact/submissions/`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Form submission failed: ${res.status} ${res.statusText}`);
  }
}