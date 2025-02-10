import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function TitleComponent() {
    const cards = [
      {
        id: 1,
        title: 'Title',
        description: 'With this component you can insert a title in your Readme file.',
        type: 'title', // Identificador para manejar el tipo
      },
    ];
  
    return (
      <Box
        className="card-container"
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
          gap: 2,
          justifyItems: 'center',
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            sx={{
              width: '95%',
              marginTop: '15px',
            }}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData('application/json', JSON.stringify(card))
            }
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    );
  }

export default TitleComponent;