import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver'; 

const ExportHistoryButton = () => {
  const history = useSelector((state) => state.timers.history);

  const exportHistory = () => {
    const json = JSON.stringify(history, null, 2); 
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'timer-history.json'); 
  };

  return (
    <Button onClick={exportHistory} variant="contained" color="primary">
      Export Timer History
    </Button>
  );
};

export default ExportHistoryButton;
