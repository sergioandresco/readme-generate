import { Grid, Paper } from "@mui/material";

function ContainerElements() {
    return ( 
        <Grid
            item
            xs={3}
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

export default ContainerElements;