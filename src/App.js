// src/App.js
import React from 'react';
import FlashcardList from './components/FlashcardList';
import Dashboard from './components/Dashboard';
import { Box, Container, Typography, AppBar, Toolbar } from '@mui/material';

function App() {
  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5', mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Flashcard Learning Tool
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <FlashcardList />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Dashboard />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
