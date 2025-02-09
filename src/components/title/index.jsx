import { Typography, Box } from "@mui/material";

function Title() {
    return ( 
        <Box sx={{ width: '100%' }}>
            <Typography 
                variant="h1"
                sx={{
                    fontFamily: 'Acorn',
                    fontWeight: 600,
                    textAlign: 'center',
                    color: '#FFFFFF'
                }}
            >
                README Generator
            </Typography>
        </Box>
    );
}

export default Title;