import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function ParagraphComponent() {
    const cards = [
      {
        id: 1,
        title: 'Paragraph',
        description: 'With this component you can insert a paragraph in your Readme file.',
        type: 'paragraph',
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

export default ParagraphComponent;