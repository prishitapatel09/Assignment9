import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Chip, Box } from '@mui/material';

// Sample job data
const jobPosts = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    description: 'Looking for an experienced software engineer to join our team...'
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Web Solutions Inc',
    location: 'New York, NY',
    salary: '$90,000 - $120,000',
    skills: ['JavaScript', 'React', 'TypeScript', 'CSS'],
    description: 'Join our frontend team to build amazing user experiences...'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'Digital Innovations',
    location: 'Remote',
    salary: '$100,000 - $130,000',
    skills: ['Python', 'Django', 'React', 'PostgreSQL'],
    description: 'Seeking a full stack developer to work on our cloud platform...'
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    location: 'Seattle, WA',
    salary: '$130,000 - $160,000',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    description: 'Help us build and maintain our cloud infrastructure...'
  }
];

const JobListings = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Job Listings
      </Typography>
      <Grid container spacing={3}>
        {jobPosts.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {job.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {job.company} • {job.location}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {job.salary}
                </Typography>
                <Typography variant="body2" paragraph>
                  {job.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Required Skills:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {job.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobListings;