import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

function CompanyCard({ company }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={company.imageUrl}
        alt={company.name}
      />
      <CardContent>
        <Typography variant="h6">{company.name}</Typography>
      </CardContent>
    </Card>
  );
}

export default CompanyCard;