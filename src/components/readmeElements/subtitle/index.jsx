import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function SubTitleComponent() {

    const cards = [
        {
          id: 1,
          title: 'Subtitle',
          description: 'With this component you can insert a subtitle in your Readme file.',
        }
    ];

    const [selectedCard, setSelectedCard] = useState(0);
      
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
            {/* {cards.map((card, index) => (
                <Card
                    sx={{
                        width: '95%',
                        marginTop: '15px',
                    }}
                >
                    <CardActionArea
                        onClick={() => setSelectedCard(index)}
                        data-active={selectedCard === index ? '' : undefined}
                        sx={{
                        height: '100%',
                        '&[data-active]': {
                            backgroundColor: 'action.selected',
                            '&:hover': {
                            backgroundColor: 'action.selectedHover',
                            },
                        },
                        }}
                    >
                        <CardContent sx={{ height: '100%' }}>
                            <Typography variant="h5" component="div">
                                {card.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {card.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))} */}
        </Box>
    );
}

export default SubTitleComponent;