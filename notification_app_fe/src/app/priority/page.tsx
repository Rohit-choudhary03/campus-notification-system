'use client';

import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationCard from '../../components/NotificationCard';
import { useRouter } from 'next/navigation';

export default function PriorityNotificationsPage() {
    const [limit, setLimit] = useState(10);
    const { notifications, loading, error } = useNotifications({ limit }, true);
    const router = useRouter();

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="error">
                        Priority Inbox
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Top most critical updates based on type and recency.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl size="small" sx={{ mr: 2, minWidth: 120 }}>
                        <InputLabel id="limit-label">Top 'N'</InputLabel>
                        <Select
                            labelId="limit-label"
                            value={limit}
                            label="Top 'N'"
                            onChange={(e) => setLimit(Number(e.target.value))}
                        >
                            <MenuItem value={5}>Top 5</MenuItem>
                            <MenuItem value={10}>Top 10</MenuItem>
                            <MenuItem value={15}>Top 15</MenuItem>
                            <MenuItem value={20}>Top 20</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" onClick={() => router.push('/')}>
                        Back to All
                    </Button>
                </Box>
            </Box>

            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>}
            {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

            {!loading && notifications.map((n) => (
                <NotificationCard key={n.id} data={n} />
            ))}
        </Container>
    );
}
