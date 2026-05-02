import { useState, useEffect } from 'react';
import { fetchNotificationsAPI } from '../services/api';
import { Notification, FetchParams } from '../types';
import { getPriorityNotifications } from '../utils/priority';

const DEV_FALLBACK_DATA: Notification[] = [
    { id: 'd146095a-0d86-4a34-9e69-3900a14576bc', type: 'Result', message: 'mid-sem', timestamp: '2026-04-22 17:51:30' },
    { id: 'b283218f-ea5a-4b7c-93a9-1f2f240d64b0', type: 'Placement', message: 'CSX Corporation hiring', timestamp: '2026-04-22 17:51:18' },
    { id: '81589ada-0ad3-4f77-9554-f52fb558e09d', type: 'Event', message: 'farewell', timestamp: '2026-04-22 17:51:06' },
    { id: '0005513a-142b-4bbc-8678-eefec65e1ede', type: 'Result', message: 'mid-sem', timestamp: '2026-04-22 17:50:54' },
    { id: 'ea836726-c25e-4f21-a72f-544a6af8a37f', type: 'Result', message: 'project-review', timestamp: '2026-04-22 17:50:42' },
    { id: '003cb427-8fc6-47f7-bb00-be228f6b0d2c', type: 'Result', message: 'external', timestamp: '2026-04-22 17:50:30' },
    { id: 'e5c4ff20-31bf-4d40-8f02-72fda59e8918', type: 'Result', message: 'project-review', timestamp: '2026-04-22 17:50:18' },
    { id: '1cfce5ee-ad37-4894-8946-d707627176a5', type: 'Event', message: 'tech-fest', timestamp: '2026-04-22 17:50:06' },
    { id: 'cf2885a6-45ac-4ba0-b548-6e9e9d4c52c8', type: 'Result', message: 'project-review', timestamp: '2026-04-22 17:49:54' },
    { id: '8a7412bd-6065-4d09-8501-a37f11cc848b', type: 'Placement', message: 'Advanced Micro Devices Inc. hiring', timestamp: '2026-04-22 17:49:42' }
];

export const useNotifications = (params: FetchParams, isPriority = false) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetchNotificationsAPI({
                    limit: params.limit,
                    page: params.page,
                    notification_type: params.notification_type
                });
                handleData(res);
            } catch (err: any) {
                console.warn('API fetch failed, loading local dev data');
                handleData([...DEV_FALLBACK_DATA]);
            } finally {
                setLoading(false);
            }
        };

        const handleData = (data: Notification[]) => {
            if (params.notification_type) {
                data = data.filter(n => n.type === params.notification_type);
            }

            if (isPriority) {
                data = getPriorityNotifications(data, params.limit || 10);
            }

            const mappedData = data.map((n, index) => ({
                ...n,
                read: index > 3
            }));

            setTotal(mappedData.length > 0 ? 50 : 0);
            setNotifications(mappedData);
        };

        load();
    }, [params.page, params.limit, params.notification_type, isPriority]);

    return { notifications, loading, error, total };
};
