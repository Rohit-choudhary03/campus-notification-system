export interface Notification {
    id: string;
    type: 'Placement' | 'Result' | 'Event';
    message: string;
    timestamp: string;
    read?: boolean;
}

export interface FetchParams {
    page?: number;
    limit?: number;
    notification_type?: string;
}
