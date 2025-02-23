import { useState } from 'react';
import { Grid, Paper, Box, TextField, IconButton, Input, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { MdFormatBold, MdFormatColorFill, MdDelete } from "react-icons/md";
import MarkdownCategories from '@/components/readmeElements/markdownBlock/function';
import { toast } from 'sonner';
import { useReadme } from '../../context/saveElements';

function ReadmeCanva() {

    const { elements, setElements } = useReadme();

    const handleDrop = (e) => {

        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('application/json'));

        toast.success('Element successfully added');

        setElements((prev) => [
            ...prev, 
            { 
                ...data,
                text: '',
                bold: false,
                color: '#000000',
                type: data.type || 'NOTE',
                markdownType: data.markdownType,
                markdownConfig: data.markdownConfig,
                ...(data.type === 'table' ? { data: [['']] } : {}),
                ...(data.type === 'list' ? { items: [''] } : {}),
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
        toast.error('Element removed');
    };

    const insertLink = (index) => {
        const link = prompt('Enter URL:');
        if (link) {
            const updatedElements = elements.map((el, i) =>
                i === index ? { ...el, text: `${el.text} [Link](${link})` } : el
            );
            setElements(updatedElements);
        }
    };

    // Add a new row
    const addRow = (index) => {
        const updatedElements = elements.map((el, i) => {
            if (i === index) {
                return { ...el, data: [...el.data, new Array(el.data[0]?.length || 1).fill('')] };
            }
            return el;
        });
        setElements(updatedElements);
    };

    // Delete a row
    const deleteRow = (index) => {
        const updatedElements = elements.map((el, i) => {
            if (i === index) {
                return { ...el, data: el.data.slice(0, -1) };
            }
            return el;
        });
        setElements(updatedElements);
    }

    // Add a new column
    const addColumn = (index) => {
        const updatedElements = elements.map((el, i) => {
            if (i === index) {
                return { ...el, data: el.data.map(row => [...row, '']) };
            }
            return el;
        });
        setElements(updatedElements);
    };

    // Delete a column
    const deleteColumn = (index) => {
        const updatedElements = elements.map((el, i) => {
            if (i === index) {
                return { ...el, data: el.data.map(row => row.slice(0, -1)) };
            }
            return el;
        });
        setElements(updatedElements);
    };

    // Update a specific cell
    const updateCell = (index, rowIndex, colIndex, value) => {
        const updatedElements = elements.map((el, i) => {
            if (i === index) {
                const newData = [...el.data];
                newData[rowIndex][colIndex] = value;
                return { ...el, data: newData };
            }
            return el;
        });
        setElements(updatedElements);
    };

    // Add a new list item
    const addListItem = (listIndex) => {
        setElements((prev) =>
            prev.map((el, idx) =>
                idx === listIndex ? { ...el, items: [...el.items, ''] } : el
            )
        );
    };
    
    // Update a specific list item
    const updateListItem = (listIndex, itemIndex, value) => {
        setElements((prev) =>
            prev.map((el, idx) =>
                idx === listIndex
                    ? {
                          ...el,
                          items: el.items.map((item, i) =>
                              i === itemIndex ? value : item
                          ),
                      }
                    : el
            )
        );
    };
    
    // Remove a specific list item
    const removeListItem = (listIndex, itemIndex) => {
        setElements((prev) =>
            prev.map((el, idx) =>
                idx === listIndex
                    ? {
                          ...el,
                          items: el.items.filter((_, i) => i !== itemIndex),
                      }
                    : el
            )
        );
    };

    return (
        <Grid
            item
            xs={9}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{ 
                padding: '20px !important',
                height: '585px', 
            }}
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
                                            <div>
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
                                                <Button onClick={() => insertLink(index)}>Insert Link</Button>
                                            </div>
                                        );
                                    
                                    case 'subtitle':
                                        return (
                                            <div>
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
                                                <Button onClick={() => insertLink(index)}>Insert Link</Button>
                                            </div>
                                        );
                                    
                                    case 'paragraph':
                                        return (
                                            <div>
                                                <TextField
                                                    value={el.text}
                                                    onChange={(e) => handleTextChange(index, e.target.value)}
                                                    placeholder="Enter paragraph"
                                                    fullWidth
                                                    variant="outlined"
                                                    multiline
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
                                                <Button onClick={() => insertLink(index)}>Insert Link</Button>
                                            </div>
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

                                    case 'codeBox':
                                        return (
                                            <TextField
                                                multiline
                                                minRows={4}
                                                value={el.text}
                                                onChange={(e) => handleTextChange(index, e.target.value)}
                                                placeholder="Insert your code here..."
                                                fullWidth
                                                variant="outlined"
                                                sx={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5' }}
                                            />
                                        );
                                    
                                    case 'table':
                                        return (
                                            <div>
                                                <Button onClick={() => addRow(index)}>➕ Add Row</Button>
                                                <Button onClick={() => addColumn(index)}>➕ Add Column</Button>
                                                <Button onClick={() => deleteRow(index)}>- Delete Row</Button>
                                                <Button onClick={() => deleteColumn(index)}>- Delete Column</Button>
                                                <TableContainer component={Paper}>
                                                    <Table>
                                                        <TableBody>
                                                            {(el.data || [[]]).map((row, rowIndex) => (
                                                                <TableRow key={rowIndex}>
                                                                    {row.map((cell, colIndex) => (
                                                                        <TableCell key={colIndex}>
                                                                            <TextField
                                                                                value={cell}
                                                                                onChange={(e) => updateCell(index, rowIndex, colIndex, e.target.value)}
                                                                            />
                                                                        </TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </div>
                                        );
                                    
                                    case 'list':
                                        return(
                                            <div>
                                                <Button onClick={() => addListItem(index)}>➕ Add Item</Button>
                                                <List>
                                                    {el.items.map((item, itemIndex) => (
                                                        <ListItem key={itemIndex}>
                                                            <TextField
                                                                value={item}
                                                                onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                                                                placeholder="Enter list item"
                                                                fullWidth
                                                            />
                                                            <Button onClick={() => removeListItem(index, itemIndex)}>❌</Button>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>
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