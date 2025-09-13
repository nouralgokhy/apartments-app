'use client';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar position="sticky" color="inherit" elevation={1} sx={{ backdropFilter: 'blur(6px)', minWidth: 0 }}>
            <Container maxWidth="lg" sx={{ px: { xs: 0.5, sm: 2 } }}>
                <Toolbar disableGutters sx={{ gap: { xs: 0.5, sm: 2 }, px: { xs: 0.5, sm: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, mr: 1, minWidth: 0 }}>
                        <Typography
                            component={Link}
                            href="/"
                            variant="h6"
                            sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700, cursor: 'pointer' }}
                        >
                            Apartments
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: { xs: 0.5, sm: 2 }, minWidth: 0 }} />

                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: { xs: 0.5, sm: 1 }, minWidth: 0 }}>
                        <Button
                            variant="contained"
                            startIcon={<></>}
                            onClick={() => router.push('/apartment/add')}
                            sx={{ textTransform: 'none' }}
                        >
                            Add listing
                        </Button>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', sm: 'none', color:'black' }, ml: 'auto', minWidth: 0 }}>
                        <IconButton onClick={handleMenu} aria-label="menu">
                            :
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    router.push('/');
                                }}
                            >
                                Apartments
                            </MenuItem>
                            <MenuItem onClick={() => { handleClose(); router.push('/apartment/add'); }}>Add listing</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
