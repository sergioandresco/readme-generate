import { useState } from 'react';
import { Grid, Paper, Box, TextField, IconButton, Button } from '@mui/material';
import { MdFormatBold, MdFormatColorFill, MdDelete } from "react-icons/md";

function ReadmeCanva() {

    const [elements, setElements] = useState([]);
  
    const handleDrop = (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      setElements((prev) => [...prev, { ...data, text: '', bold: false, color: '#000000' }]);
    };
  
    const handleDragOver = (e) => e.preventDefault();
  
    const handleTextChange = (index, value) => {
      setElements((prev) =>
        prev.map((el, i) => (i === index ? { ...el, text: value } : el))
      );
    };
  
    const toggleBold = (index) => {
      setElements((prev) =>
        prev.map((el, i) => (i === index ? { ...el, bold: !el.bold } : el))
      );
    };
  
    const changeColor = (index, color) => {
      setElements((prev) =>
        prev.map((el, i) => (i === index ? { ...el, color } : el))
      );
    };
  
    const removeElement = (index) => {
      setElements((prev) => prev.filter((_, i) => i !== index));
    };
  
    return (
      <Grid
        item
        xs={9}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          padding: '20px !important',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: '100%',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Canvas con altura fija y scroll */}
          <Box
            sx={{
              maxHeight: '500px', // Altura máxima del canvas
              overflowY: 'auto', // Scroll vertical
              borderRadius: '8px',
              padding: 2,
            }}
          >
            {elements.map((el, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  border: '1px dashed #ccc',
                  borderRadius: '8px',
                  position: 'relative',
                }}
              >
                {el.type === 'title' && (
                  <Box>
                    {/* Texto editable */}
                    <TextField
                      value={el.text}
                      onChange={(e) => handleTextChange(index, e.target.value)}
                      placeholder="Enter title"
                      fullWidth
                      variant="outlined"
                      sx={{
                        marginBottom: 1,
                        fontWeight: el.bold ? 'bold' : 'normal',
                        color: el.color,
                      }}
                      inputProps={{
                        style: {
                          fontWeight: el.bold ? 'bold' : 'normal',
                          color: el.color,
                        },
                      }}
                    />
  
                    {/* Opciones de formato */}
                    <Box>
                      <IconButton onClick={() => toggleBold(index)}>
                        <MdFormatBold />
                      </IconButton>
  
                      <IconButton>
                        <input
                          type="color"
                          value={el.color}
                          onChange={(e) => changeColor(index, e.target.value)}
                          style={{
                            cursor: 'pointer',
                            height: '24px',
                            width: '24px',
                            border: 'none',
                            background: 'none',
                          }}
                        />
                        <MdFormatColorFill />
                      </IconButton>
  
                      <IconButton onClick={() => removeElement(index)}>
                        <MdDelete />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
    );
  }
  

export default ReadmeCanva;