import { useState } from 'react';
import { Grid, Paper, Box, TextField, IconButton, Input, Button } from '@mui/material';
import { MdFormatBold, MdFormatColorFill, MdDelete } from "react-icons/md";
import MarkdownCategories from '@/components/readmeElements/markdownBlock/function';

function ReadmeCanva() {

    const [elements, setElements] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('application/json'));
        
        setElements((prev) => [
            ...prev, 
            { 
                ...data,
                text: '',
                bold: false,
                color: '#000000',
                type: data.type || 'NOTE',
                markdownType: data.markdownType,
                markdownConfig: data.markdownConfig
            }
        ]);
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
            sx={{ padding: '20px !important' }}
        >
            <Paper
                elevation={3}
                sx={{
                height: '100%',
                backgroundColor: '#FFFFFF',
                }}
            >
                {/* Canvas with fixed height and scroll */}
                <Box
                sx={{
                    maxHeight: '500px',
                    overflowY: 'auto',
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
                            {/* Render according to element type */}
                            {(() => {
                                switch (el.type) {

                                    case 'title':
                                        return (
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
                                                    fontSize: '2em',
                                                }}
                                                inputProps={{
                                                    style: {
                                                        fontWeight: el.bold ? 'bold' : 'normal',
                                                        color: el.color,
                                                    },
                                                }}
                                            />
                                        );
                                    
                                    case 'subtitle':
                                        return (
                                            <TextField
                                                value={el.text}
                                                onChange={(e) => handleTextChange(index, e.target.value)}
                                                placeholder="Enter subtitle"
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    marginBottom: 1,
                                                    fontWeight: el.bold ? 'bold' : 'normal',
                                                    color: el.color,
                                                    fontSize: '1.5em',
                                                }}
                                                inputProps={{
                                                style: {
                                                    fontWeight: el.bold ? 'bold' : 'normal',
                                                    color: el.color,
                                                    fontSize: '0.9rem',
                                                },
                                                }}
                                            />
                                        );
                                    
                                    case 'paragraph':
                                        return (
                                            <TextField
                                                value={el.text}
                                                onChange={(e) => handleTextChange(index, e.target.value)}
                                                placeholder="Enter paragraph"
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    marginBottom: 1,
                                                    fontWeight: el.bold ? 'bold' : 'normal',
                                                    color: el.color,
                                                    fontSize: '1.5em',
                                                }}
                                                inputProps={{
                                                style: {
                                                    fontWeight: el.bold ? 'bold' : 'normal',
                                                    color: el.color,
                                                    fontSize: '0.9rem',
                                                },
                                                }}
                                            />
                                        );
                                    
                                        case 'image':
                                            return (
                                                <Box 
                                                    sx={{ 
                                                        display: 'flex', 
                                                        flexDirection: 'column', 
                                                        alignItems: 'center', 
                                                        gap: 1 
                                                    }}
                                                >
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const objectUrl = URL.createObjectURL(file);
                                                                handleTextChange(index, objectUrl);
                                                            }
                                                        }}
                                                        style={{ display: 'none' }}
                                                        id={`file-input-${index}`}
                                                    />
                                                    
                                                    <label htmlFor={`file-input-${index}`}>
                                                        <Button variant="contained" component="span">
                                                            Upload Image
                                                        </Button>
                                                    </label>
                                        
                                                    {el.text && (
                                                        <img
                                                            src={el.text}
                                                            alt="Uploaded Preview"
                                                            style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                                                        />
                                                    )}
                                                </Box>
                                            );
                                        
                                        case 'markdown':
                                            return (
                                                <MarkdownCategories 
                                                    type={el.markdownType}
                                                    text={el.text}
                                                    onTextChange={(newText) => handleTextChange(index, newText)}
                                                    color={el.color}
                                                    title={el.title}
                                                    iconType={el.iconType}
                                                />
                                            );

                                    default:
                                        return <p>Unknown element type</p>;
                                }
                            })()}

                            {/* Formatting options */}
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
                    ))}
                </Box>
            </Paper>
        </Grid>
    );
}

export default ReadmeCanva;