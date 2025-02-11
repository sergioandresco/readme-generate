import { Grid, Paper } from "@mui/material";
import TitleComponent from "@/components/readmeElements/title";
import SubTitleComponent from "@/components/readmeElements/subtitle";
import ParagraphComponent from "@/components/readmeElements/paragraph";
import UploadImage from "@/components/readmeElements/uploadImage";

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
                <TitleComponent />
                <SubTitleComponent />
                <ParagraphComponent />
                <UploadImage />
            </Paper>
        </Grid>
    );
}

export default ContainerElements;