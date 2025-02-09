import { Grid } from "@mui/material";
import ContainerElements from "@/components/containerElements";
import ReadmeCanva from "@/components/readmeCanva";

function CreationReadmeLayout() {
    return ( 
        <Grid
            container
            spacing={3} 
            sx={{ 
                padding: '0px', 
                margin: '0px',
                height: '585px' 
            }}
            className="creationReadmeLayout"
        >
            <ContainerElements />
            <ReadmeCanva />
        </Grid>
    );
}

export default CreationReadmeLayout;