'use client';

import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Pagination, Box, MenuItem, Select, Button } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import NotificationCard from '../components/NotificationCard';
import { useRouter } from 'next/navigation';

export default function AllNotificationsPage() {
    const [page, setPage] = useState(1);
    const [type, setType] = useState('');
    const router = useRouter();

    const { notifications, loading, error, total } = useNotifications({ 
        page, 
        limit: 10, 
        notification_type: type 
    });

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">All Notifications</Typography>
                <Box>
                    <Select
                        value={type}
                        onChange={(e) => { setType(e.target.value); setPage(1); }}
                        displayEmpty
                        size="small"
                        sx={{ width: 150, mr: 2 }}
                    >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="Placement">Placement</MenuItem>
                        <MenuItem value="Result">Result</MenuItem>
                        <MenuItem value="Event">Event</MenuItem>
                    </Select>
                    <Button variant="contained" color="secondary" onClick={() => router.push('/priority')}>
                        View Priority
                    </Button>
                </Box>
            </Box>

            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>}
            {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
            
            {!loading && notifications.length === 0 && (
                <Alert severity="info">No notifications found.</Alert>
            )}

            {!loading && notifications.map((n) => (
                <NotificationCard key={n.id} data={n} />
            ))}

            {!loading && notifications.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination 
                        count={total ? Math.ceil(total / 10) : 5} 
                        page={page} 
                        onChange={(_, val) => setPage(val)} 
                        color="primary" 
                    />
                </Box>
            )}
        </Container>
    );
}
