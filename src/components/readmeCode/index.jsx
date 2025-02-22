import { Grid, Paper, Box } from "@mui/material";
import { useReadme } from "../../context/saveElements";

function ReadmeCode() {

    const { elements } = useReadme();

    const generateMarkdown = () => {
        return elements
            .map((el) => {
                switch (el.type) {
                    case "title":
                        return `# ${el.text}`;
                    case "subtitle":
                        return `## ${el.text}`;
                    case "paragraph":
                        return el.text;
                    case "image":
                        return `![Insert the name of your image](Insert image URL here)`;
                    case "markdown":
                        return `> [!${el.title}]\n> ${el.text}`;
                    case "codeBox":
                        return `\`\`\`${el.codeType}\n${el.text}\n\`\`\``;
                    case "table":
                        return el.data.map((row) => `| ${row.join(" | ")} |`).join("\n");
                    case "list":
                        return el.items.map((item) => `- ${item}`).join("\n");
                    default:
                        return "";
                }
            })
            .join("\n\n");
    };

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
                    <pre>{generateMarkdown()}</pre>
                </Box>
            </Paper>
        </Grid>
    );
}

export default ReadmeCode;