import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function MarkDownBlock({ markdownType, setMarkdownType }) {

    const markdownTypes = {
      NOTE: { title: "Note", color: "#4F8EF7", iconType: "info" },
      TIP: { title: "Tip", color: "#2DCE89", iconType: "lightbulb" },
      IMPORTANT: { title: "Important", color: "#845EC2", iconType: "error" },
      WARNING: { title: "Warning", color: "#FFA500", iconType: "warning" },
      CAUTION: { title: "Caution", color: "#E63946", iconType: "caution" }
    };
    
    const handleMarkdownTypeChange = (event) => {
      setMarkdownType(event.target.value);
    };

    const handleDragStart = (e, card) => {
      const dragData = {
          ...card,
          markdownType,
          color: markdownTypes[markdownType].color,
          title: markdownTypes[markdownType].title,
          iconType: markdownTypes[markdownType].iconType
      };
      e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    };

    const cards = [
      {
        id: 1,
        title: 'Markdown',
        description: 'Select the Markdown type that you need.',
        type: 'markdown'
      },
    ];
  
    return (
      <Box className="card-container"
        sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 2, justifyItems: 'center' }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            sx={{ width: '95%', marginTop: '15px' }}
            draggable
            onDragStart={(e) => handleDragStart(e, card)}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h5">{card.title}</Typography>
                <Typography variant="body2" color="text.secondary">{card.description}</Typography>
                <FormControl fullWidth style={{ marginTop: '18px' }}>
                    <InputLabel id="markdown-type-label">Markdown type</InputLabel>
                    <Select
                      labelId="markdown-type-label"
                      value={markdownType || "NOTE"}
                      onChange={handleMarkdownTypeChange}
                    >
                        {Object.keys(markdownTypes).map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    );
}

export default MarkDownBlock;