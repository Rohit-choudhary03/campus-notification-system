import axios from 'axios';
import { Notification, FetchParams } from '../types';

const API_BASE = '/api';

export const fetchNotificationsAPI = async (params: FetchParams): Promise<Notification[]> => {
    const { data } = await axios.get(`${API_BASE}/notifications`, { params });
    
    // The API wraps the array in a "notifications" object and uses PascalCase
    const rawList = data.notifications || data || [];
    
    return rawList.map((item: any) => ({
        id: item.ID || item.id,
        type: item.Type || item.type,
        message: item.Message || item.message,
        timestamp: item.Timestamp || item.timestamp,
    }));
};
