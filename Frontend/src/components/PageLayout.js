import React from 'react';
import { Box } from '@mui/material';

const PageLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #FFE5D9 0%, #FFD6CC 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Circle */}
      <Box
        sx={{
          position: 'fixed',
          right: -100,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFA07A 0%, #FF7F50 100%)',
          opacity: 0.2,
          zIndex: 0
        }}
      />
      
      {/* Content */}
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout; 