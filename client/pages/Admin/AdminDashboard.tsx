import React from 'react';
import { Typography, Paper, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

export default function AdminDashboard() {
    // In the future, you would fetch this data from your API
    const stats = {
        products: 150,
        orders: 32,
        users: 12,
    };

    return (
        <>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Dashboard
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flexGrow: 1, minWidth: '300px' }}>
                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <InventoryIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                        <Box>
                            <Typography variant="h6">Total Products</Typography>
                            <Typography component="p" variant="h4">{stats.products}</Typography>
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: '300px' }}>
                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <ShoppingCartIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                        <Box>
                            <Typography variant="h6">Recent Orders</Typography>
                            <Typography component="p" variant="h4">{stats.orders}</Typography>
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: '300px' }}>
                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                        <Box>
                            <Typography variant="h6">New Users</Typography>
                            <Typography component="p" variant="h4">{stats.users}</Typography>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}