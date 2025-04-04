import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

function JobCard({ job }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{job.title}</Typography>
        <Typography variant="body2">{job.description}</Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {job.lastUpdated}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" href={job.applyLink} target="_blank">
          Apply
        </Button>
      </CardActions>
    </Card>
  );
}

export default JobCard;