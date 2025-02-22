import { Grid, Paper, Box } from "@mui/material";

function ReadmeCode() {
    return ( 
        <Grid
            item
            xs={12}
            sx={{
                padding: '20px !important',
                height: '585px',
            }}
        >
            <Paper 
                elevation={3}
                sx={{
                    padding: '0px',
                    height: "100%",
                    backgroundColor: '#FFFFFF',
                }}
            >
                <Box
                sx={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    borderRadius: '8px',
                    padding: 2,
                }}
                >
                    
                </Box>
            </Paper>
        </Grid>
    );
}

export default ReadmeCode;