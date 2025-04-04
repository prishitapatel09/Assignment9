import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          align="center"
          sx={{ 
            mb: 1,
            fontWeight: 700,
            color: '#1a1a1a',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          About Our Job Portal
        </Typography>
        <Typography 
          variant="h5" 
          align="center"
          sx={{ 
            mb: 6,
            color: '#666666',
            fontWeight: 500
          }}
        >
          Connecting Talent with Opportunity
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)'
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                  color: '#1a1a1a',
                  fontWeight: 600,
                  mb: 3
                }}
              >
                Our Mission
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  color: '#444444',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  mb: 3
                }}
              >
                We strive to create a seamless connection between talented professionals and innovative companies. 
                Our platform serves as a bridge, making it easier for job seekers to find their ideal positions 
                and for employers to discover exceptional talent.
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: '#444444',
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}
              >
                With a focus on the technology sector, we understand the unique needs of both job seekers 
                and employers in this fast-paced industry.
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)'
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                  color: '#1a1a1a',
                  fontWeight: 600,
                  mb: 3
                }}
              >
                Our Vision
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  color: '#444444',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  mb: 3
                }}
              >
                We envision a future where finding the perfect job or candidate is not just about matching skills, 
                but about creating meaningful connections that drive innovation and growth.
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: '#444444',
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}
              >
                Our platform is designed to be more than just a job board - it's a community where professionals 
                can grow their careers and companies can build their teams.
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Typography 
          variant="h3" 
          align="center"
          sx={{ 
            mt: 8,
            mb: 4,
            color: '#1a1a1a',
            fontWeight: 700
          }}
        >
          Why Choose Us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  color: '#1a1a1a',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                User-Friendly
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: '#444444',
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}
              >
                Intuitive interface designed for the best user experience
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  color: '#1a1a1a',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Quality Matches
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: '#444444',
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}
              >
                Advanced matching system to connect the right talent with the right opportunities
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default About;