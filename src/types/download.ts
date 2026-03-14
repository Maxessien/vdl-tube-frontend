export interface DownloadProgress {
  status?: string;
  fragment_index?: number;
  fragment_count?: number;
  total_bytes?: number;
  total_bytes_estimate?: number;
  downloaded_bytes?: number;
}

export interface ProcessingInfo {
  progressId: string;
  progressInfo: Partial<DownloadProgress>;
  isActive: boolean;
}

export interface Chapter {
  title: string;
  start_time?: number | string | null;
  end_time?: number | string | null;
  start?: number;
}

export interface VideoFormat {
  format_id: string;
  height: number;
  filesize?: number | null;
  tbr?: number | null;
}

export interface Thumbnail {
  url: string;
  height?: number | null;
}

export interface VideoInfoResponse {
  formats: VideoFormat[];
  url: string;
  title: string;
  thumbnails: Thumbnail[];
  chapters: Chapter[];
  duration: number;
}

export interface LinkResponse {
  url: string;
}