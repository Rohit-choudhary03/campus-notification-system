import { Notification } from '../types';

/**
 * Sorts notifications by priority weight and recency.
 * @param data Array of notifications to sort
 * @param limit Optional limit for top N elements
 * @returns Sorted array of notifications
 */
export const getPriorityNotifications = (data: Notification[], limit: number = 10): Notification[] => {
    const weights: Record<string, number> = { Placement: 3, Result: 2, Event: 1 };
    
    // Sort logic
    const sorted = [...data].sort((a, b) => {
        const wA = weights[a.type] || 0;
        const wB = weights[b.type] || 0;
        
        // Primary sort: Weight descending
        if (wA !== wB) return wB - wA;
        
        // Secondary sort: Timestamp descending (recency)
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return sorted.slice(0, limit);
};
