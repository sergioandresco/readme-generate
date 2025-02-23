import { Grid, Paper, Box, Typography } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import { useReadme } from "../../context/saveElements";
import { toast } from "sonner";

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

    const handleCopy = () => {
        const markdownText = generateMarkdown();
        navigator.clipboard.writeText(markdownText)
            .then(() => {
                toast.success("Markdown copied to clipboard");
            })
            .catch((err) => console.error("Failed to copy:", err));
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
                    borderRadius: '4px',
                }}
            >
                <Box
                    sx={{
                        maxHeight: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 2,
                        backgroundColor: '#b6b6b6',
                        borderRadius: '4px 4px 0px 0px',
                    }}
                >
                    <Typography variant="h3" sx={{ fontSize: '23px' }}>Code on Markdown language</Typography>
                    <MdContentCopy 
                        style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                        onClick={handleCopy}
                    />
                </Box>
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