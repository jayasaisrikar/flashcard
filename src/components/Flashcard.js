// src/components/Flashcard.js
import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FlashcardWrapper = styled(Card)({
  width: '300px',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  perspective: '1000px',
  margin: '20px auto',
  transition: 'transform 0.6s ease',
  transformStyle: 'preserve-3d',
  // '&:hover': {
  //   transform: 'rotateY(180deg)',
  // },
});

const FlashcardInner = styled(CardContent)(({ flipped }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  transition: 'transform 0.6s ease',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fafafa',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
}));

const FlashcardFront = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '20px',
  boxSizing: 'border-box',
});

const FlashcardBack = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  transform: 'rotateY(180deg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#4caf50',
  color: '#fff',
  padding: '20px',
  boxSizing: 'border-box',
});

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <FlashcardWrapper onClick={() => setFlipped(!flipped)}>
      <FlashcardInner flipped={flipped}>
        <FlashcardFront>
          <Typography variant="h6" align="center">
            {flashcard.question}
          </Typography>
        </FlashcardFront>
        <FlashcardBack>
          <Typography variant="h6" align="center">
            {flashcard.answer}
          </Typography>
        </FlashcardBack>
      </FlashcardInner>
    </FlashcardWrapper>
  );
};

export default Flashcard;
