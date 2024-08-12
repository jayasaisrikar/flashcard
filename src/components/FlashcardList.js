// src/components/FlashcardList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import { Box, Button, IconButton, CircularProgress, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/flashcards')
      .then(res => {
        setFlashcards(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const nextFlashcard = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (flashcards.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5" color="textSecondary">
          No flashcards available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Flashcard flashcard={flashcards[currentIndex]} />

      <Box display="flex" justifyContent="space-between" mt={2} width="100%">
        <IconButton onClick={prevFlashcard} color="primary" disabled={flashcards.length <= 1}>
          <ArrowBack />
        </IconButton>
        <Button variant="contained" color="secondary" onClick={nextFlashcard} disabled={flashcards.length <= 1}>
          Next
          <ArrowForward />
        </Button>
      </Box>

      <Typography variant="caption" mt={2} color="textSecondary">
        {currentIndex + 1} / {flashcards.length}
      </Typography>
    </Box>
  );
};

export default FlashcardList;
