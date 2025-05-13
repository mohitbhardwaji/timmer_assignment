import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const ProgressBar = ({ progress }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
    </Box>
  </Box>
);

export default ProgressBar;
