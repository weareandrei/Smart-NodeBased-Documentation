import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Container component="footer" maxWidth="lg" sx={{ marginTop: '2rem' }}>
            <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} Your Website Name
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                <Link color="inherit" href="/privacy-policy">
                    Privacy Policy
                </Link>{' '}
                |{' '}
                <Link color="inherit" href="/terms-of-service">
                    Terms of Service
                </Link>
            </Typography>
        </Container>
    );
};

export default Footer;
