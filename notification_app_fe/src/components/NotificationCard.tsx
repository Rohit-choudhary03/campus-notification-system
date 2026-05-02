import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Notification } from '../types';

export default function NotificationCard({ data }: { data: Notification }) {
    const date = new Date(data.timestamp).toLocaleString();
    
    const chipColor = 
        data.type === 'Placement' ? 'error' : 
        data.type === 'Result' ? 'warning' : 'info';

    return (
        <Card 
            sx={{ 
                mb: 2, 
                borderLeft: data.read ? 'none' : '5px solid #1976d2',
                backgroundColor: data.read ? '#ffffff' : '#f0f7ff',
                borderRadius: 3,
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                    boxShadow: '0 12px 28px rgba(0,0,0,0.12)', 
                    transform: 'translateY(-4px)' 
                }
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip label={data.type} color={chipColor} size="small" />
                    <Typography variant="caption" color="text.secondary">
                        {date}
                    </Typography>
                </Box>
                <Typography variant="body1" fontWeight={data.read ? 400 : 700}>
                    {data.message}
                </Typography>
            </CardContent>
        </Card>
    );
}
