export type NewsType = 'Political' | 'Accident' | 'Education' | 'Crime' | 'Weather' | 'Sports' | 'Business' | 'Social' | 'Others';

export interface NewsItem {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string; // Note: In DB table this is snake_case 'video_url', we'll map it
    area: string;
    type: NewsType;
    isBreaking: boolean; // DB: is_breaking
    timestamp: string;
    author?: string;
    status?: 'published' | 'pending' | 'rejected';
}

export interface ShortItem {
    id: string;
    title: string;
    videoUrl: string; // DB: video_url
    duration: number;
    timestamp: string;
}
