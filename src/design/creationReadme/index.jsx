import { Grid } from "@mui/material";
import ContainerElements from "@/components/containerElements";
import ReadmeCanva from "@/components/readmeCanva";
import ReadmeCode from "@/components/readmeCode";

function CreationReadmeLayout() {
    return ( 
        <Grid
            container
            spacing={3} 
            sx={{ 
                padding: '0px', 
                margin: '0px',
            }}
            className="creationReadmeLayout"
        >
            <ContainerElements />
            <ReadmeCanva />
            <ReadmeCode />
        </Grid>
    );
}

export default CreationReadmeLayout;