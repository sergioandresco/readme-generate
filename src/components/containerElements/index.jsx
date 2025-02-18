import { useState } from "react";
import { Grid, Paper, Box } from "@mui/material";
import TitleComponent from "@/components/readmeElements/title";
import SubTitleComponent from "@/components/readmeElements/subtitle";
import ParagraphComponent from "@/components/readmeElements/paragraph";
import UploadImage from "@/components/readmeElements/uploadImage";
import MarkDownBlock from "@/components/readmeElements/markdownBlock";
import CodeBox from "@/components/readmeElements/codeBox";

function ContainerElements() {

    const [markdownType, setMarkdownType] = useState('NOTE');
    const [codeType, setCodeType] = useState('JS');

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
                <Box
                sx={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    borderRadius: '8px',
                    padding: 2,
                }}
                >
                    <TitleComponent />
                    <SubTitleComponent />
                    <ParagraphComponent />
                    <UploadImage />
                    <MarkDownBlock
                        markdownType={markdownType} 
                        setMarkdownType={setMarkdownType} 
                    />
                    <CodeBox 
                        codeType={codeType} 
                        setCodeType={setCodeType}
                    />
                </Box>
            </Paper>
        </Grid>
    );
}

export default ContainerElements;