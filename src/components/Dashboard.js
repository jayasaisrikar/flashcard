// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/flashcards')
      .then(res => setFlashcards(res.data))
      .catch(err => console.error(err));
  }, []);

  const addFlashcard = () => {
    axios.post('http://localhost:5000/flashcards', newFlashcard)
      .then(() => {
        setFlashcards([...flashcards, newFlashcard]);
        setNewFlashcard({ question: '', answer: '' });
      })
      .catch(err => console.error(err));
  };

  const updateFlashcard = (id, updatedFlashcard) => {
    axios.put(`http://localhost:5000/flashcards/${id}`, updatedFlashcard)
      .then(() => {
        setFlashcards(flashcards.map(fc => (fc.id === id ? updatedFlashcard : fc)));
      })
      .catch(err => console.error(err));
  };

  const deleteFlashcard = id => {
    axios.delete(`http://localhost:5000/flashcards/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter(fc => fc.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Add New Flashcard</Typography>
      <Card variant="outlined" sx={{ padding: 2, marginBottom: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Question"
                fullWidth
                value={newFlashcard.question}
                onChange={e => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Answer"
                fullWidth
                value={newFlashcard.answer}
                onChange={e => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={addFlashcard}>
                Add Flashcard
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h4" gutterBottom>Manage Flashcards</Typography>
      <List>
        {flashcards.map(fc => (
          <ListItem key={fc.id} sx={{ padding: 2, background: '#f9f9f9', marginBottom: 2, borderRadius: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                label="Question"
                fullWidth
                value={fc.question}
                onChange={e => updateFlashcard(fc.id, { ...fc, question: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Answer"
                fullWidth
                value={fc.answer}
                onChange={e => updateFlashcard(fc.id, { ...fc, answer: e.target.value })}
              />
            </Box>
            <IconButton color="secondary" onClick={() => deleteFlashcard(fc.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;
