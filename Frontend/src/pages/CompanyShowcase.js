import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Using static data with real company images
        const staticCompanies = [
          {
            id: 1,
            name: 'Tech Corp',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&h=400&q=80',
            description: 'Leading technology company specializing in software development and digital innovation.'
          },
          {
            id: 2,
            name: 'Web Solutions Inc',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=400&q=80',
            description: 'Innovative web solutions provider helping businesses transform their digital presence.'
          },
          {
            id: 3,
            name: 'Digital Innovations',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=400&q=80',
            description: 'Pioneering digital transformation solutions for the modern enterprise.'
          },
          {
            id: 4,
            name: 'Cloud Systems',
            image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&h=400&q=80',
            description: 'Cloud infrastructure and services provider enabling seamless digital operations.'
          }
        ];
        setCompanies(staticCompanies);
      } catch (err) {
        setError('Failed to fetch companies');
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) return (
    <Typography 
      sx={{ 
        p: 3, 
        textAlign: 'center',
        color: '#666666',
        fontSize: '1.2rem'
      }}
    >
      Loading companies...
    </Typography>
  );
  
  if (error) return (
    <Typography 
      sx={{ 
        p: 3, 
        textAlign: 'center',
        color: 'error.main',
        fontSize: '1.2rem'
      }}
    >
      {error}
    </Typography>
  );

  return (
    <Box 
      sx={{ 
        py: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
          backdropFilter: 'blur(10px)',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
              color: '#1a1a1a',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Featured Companies
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              textAlign: 'center',
              mb: 6,
              color: '#666666',
              fontWeight: 500,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Discover innovative companies that are shaping the future of technology
          </Typography>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} direction="column">
            {companies.map((company) => (
              <Grid item key={company.id}>
                <motion.div variants={itemVariants}>
                  <Card 
                    sx={{ 
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      minHeight: { xs: 'auto', md: '250px' },
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      boxShadow: '0 8px 32px 0 rgba(31,38,135,0.07)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px 0 rgba(31,38,135,0.1)',
                        backgroundColor: 'rgba(255,255,255,1)',
                        '& .company-image': {
                          transform: 'scale(1.05)'
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{ 
                        position: 'relative',
                        width: { xs: '100%', md: '400px' },
                        height: { xs: '200px', md: '100%' },
                        overflow: 'hidden'
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={company.image}
                        alt={company.name}
                        className="company-image"
                        sx={{ 
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                          display: { xs: 'block', md: 'none' }
                        }}
                      />
                    </Box>
                    <CardContent 
                      sx={{ 
                        flex: 1,
                        p: { xs: 3, md: 4 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: { xs: 'relative', md: 'static' },
                        zIndex: 1
                      }}
                    >
                      <Typography 
                        variant="h4" 
                        component="h2"
                        sx={{ 
                          fontWeight: 700,
                          mb: 2,
                          color: '#1a1a1a',
                          fontSize: { xs: '1.75rem', md: '2rem' }
                        }}
                      >
                        {company.name}
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={{ 
                          color: '#666666',
                          lineHeight: 1.8,
                          fontSize: '1.1rem'
                        }}
                      >
                        {company.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CompanyShowcase;