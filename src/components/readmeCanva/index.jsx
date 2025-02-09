import { Grid, Paper } from "@mui/material";

function ReadmeCanva() {
    return ( 
        <Grid
            item
            xs={9}
            sx={{
                padding: '20px !important',
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
                
            </Paper>
        </Grid>
    );
}

export default ReadmeCanva;