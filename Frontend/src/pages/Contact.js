import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    setStatus({
      type: 'success',
      message: 'Thank you for your message! We will get back to you soon.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: '#FF7F50' }} />,
      title: 'Office Location',
      details: ['123 Tech Street', 'San Francisco, CA 94105', 'United States']
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: '#FF7F50' }} />,
      title: 'Email',
      details: ['contact@jobportal.com']
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: '#FF7F50' }} />,
      title: 'Phone',
      details: ['(555) 123-4567']
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40, color: '#FF7F50' }} />,
      title: 'Hours',
      details: ['Monday - Friday', '9:00 AM - 6:00 PM PST']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Contact Us
        </Typography>
        <Typography 
          variant="h5" 
          align="center"
          sx={{ 
            mb: 6,
            color: '#666666',
            fontWeight: 500,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Contact Information Cards */}
        <Grid item xs={12} md={5}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={2}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} key={index}>
                  <motion.div variants={itemVariants}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: 2,
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.07)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px 0 rgba(31,38,135,0.1)',
                          backgroundColor: 'rgba(255,255,255,1)',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: 'rgba(255,127,80,0.1)',
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: '#1a1a1a',
                              mb: 1
                            }}
                          >
                            {info.title}
                          </Typography>
                          {info.details.map((detail, idx) => (
                            <Typography
                              key={idx}
                              variant="body1"
                              sx={{
                                color: '#666666',
                                lineHeight: 1.6
                              }}
                            >
                              {detail}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.07)',
              }}
            >
              {status.message && (
                <Alert 
                  severity={status.type} 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      fontSize: '1.5rem'
                    }
                  }}
                  onClose={() => setStatus({ type: '', message: '' })}
                >
                  {status.message}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          '& fieldset': {
                            borderColor: '#e0e0e0',
                            transition: 'all 0.3s ease',
                          },
                          '&:hover fieldset': {
                            borderColor: '#FF7F50',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#FF7F50',
                            borderWidth: '2px',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FF7F50',
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          '& fieldset': {
                            borderColor: '#e0e0e0',
                            transition: 'all 0.3s ease',
                          },
                          '&:hover fieldset': {
                            borderColor: '#FF7F50',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#FF7F50',
                            borderWidth: '2px',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FF7F50',
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          '& fieldset': {
                            borderColor: '#e0e0e0',
                            transition: 'all 0.3s ease',
                          },
                          '&:hover fieldset': {
                            borderColor: '#FF7F50',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#FF7F50',
                            borderWidth: '2px',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FF7F50',
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          '& fieldset': {
                            borderColor: '#e0e0e0',
                            transition: 'all 0.3s ease',
                          },
                          '&:hover fieldset': {
                            borderColor: '#FF7F50',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#FF7F50',
                            borderWidth: '2px',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#FF7F50',
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        py: 1.5,
                        backgroundColor: '#FF7F50',
                        color: '#fff',
                        fontWeight: 600,
                        letterSpacing: 0.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#FF6B3D',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(255,127,80,0.4)',
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;