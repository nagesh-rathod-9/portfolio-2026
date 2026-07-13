// Footer.jsx (with proper links)
import React from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <Box 
      id="contact" 
      sx={{ 
        py: 12, 
        bgcolor: '#0a0a0a', 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Background Glow */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '500px', 
          height: '500px', 
          bgcolor: '#e94560', 
          borderRadius: '50%', 
          filter: 'blur(100px)', 
          opacity: 0.05, 
          zIndex: 0 
        }} 
      />
      
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 900, 
            color: 'rgba(255,255,255,0.05)', 
            fontSize: { xs: '4rem', md: '8rem' }, 
            letterSpacing: 5 
          }}
        >
          THANK YOU
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700, 
            color: '#fff', 
            mt: -6, 
            mb: 4 
          }}
        >
          2026
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4 }}>
          {/* LinkedIn */}
          <IconButton 
            component="a"
            href="https://linkedin.com/in/nagesh-rathod-580383283"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            sx={{ 
              color: '#888', 
              transition: 'all 0.3s ease',
              '&:hover': { 
                color: '#e94560', 
                transform: 'translateY(-3px)',
                background: 'rgba(233, 69, 96, 0.1)',
              } 
            }}
          >
            <LinkedInIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {/* Instagram */}
          <IconButton 
            component="a"
            href="https://www.instagram.com/nagesh_rathod_9/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            sx={{ 
              color: '#888', 
              transition: 'all 0.3s ease',
              '&:hover': { 
                color: '#e94560', 
                transform: 'translateY(-3px)',
                background: 'rgba(233, 69, 96, 0.1)',
              } 
            }}
          >
            <InstagramIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {/* WhatsApp */}
          <IconButton 
            component="a"
            href="https://wa.me/917666969836"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Chat"
            sx={{ 
              color: '#888', 
              transition: 'all 0.3s ease',
              '&:hover': { 
                color: '#e94560', 
                transform: 'translateY(-3px)',
                background: 'rgba(233, 69, 96, 0.1)',
              } 
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>
        
        <Typography sx={{ color: '#444', fontSize: '0.8rem', letterSpacing: 2 }}>
          © 2026 NAGESH RATHOD. FULL STACK DEVELOPER
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;