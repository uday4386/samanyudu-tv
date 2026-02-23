export type NewsType = 'Political' | 'Accident' | 'Education' | 'Crime' | 'Weather' | 'Sports' | 'Business' | 'Social' | 'Others';

export interface NewsItem {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string; // Note: In DB table this is snake_case 'video_url', we'll map it
    liveLink?: string;
    area: string;
    type: NewsType;
    isBreaking: boolean; // DB: is_breaking
    timestamp: string;
    author?: string;
    status?: 'published' | 'pending' | 'rejected';
    likes?: number; // Optional until DB is updated
}

export interface ShortItem {
    id: string;
    title: string;
    videoUrl: string; // DB: video_url
    duration: number;
    timestamp: string;
    likes?: number; // Optional until DB is updated
}

export interface Advertisement {
    id: string;
    mediaUrl: string; // DB: media_url
    intervalMinutes: number; // DB: interval_minutes
    clickUrl?: string; // DB: click_url
    isActive: boolean; // DB: is_active
    timestamp: string;
}
