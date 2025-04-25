import React, { useState } from 'react';
import { Tabs, Tab, Box, Button } from '@mui/material';
import { CopyAll } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import AppSnackbar from '../../../components/Snackbar/Snackbar';

import codeSnippets from '../../../static/const/codeSnippets';





function CodeTabs() {
    const [tab, setTab] = useState('Python');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCopy = () => {
        setSnackbarMessage(`Código en ${tab} copiado`);
        setSnackbarOpen(true);
    };


    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: 2, padding: 2, marginTop: 4 }}>
            <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {Object.keys(codeSnippets).map((lang) => (
                    <Tab key={lang} label={lang} value={lang} />
                ))}
            </Tabs>

            <Box sx={{ position: 'relative', paddingTop: 2 }} >
                <CopyToClipboard text={codeSnippets[tab]} onCopy={handleCopy}>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        startIcon={<CopyAll />}
                    >
                        Copiar código
                    </Button>
                </CopyToClipboard>



                <SyntaxHighlighter
                    language={
                        tab.toLowerCase() === 'nodejs'
                            ? 'javascript'
                            : tab.toLowerCase() === 'php'
                                ? 'php'
                                : tab.toLowerCase()
                    }

                    customStyle={{
                        padding: '16px',
                        borderRadius: '8px',
                        marginTop: '40px',
                        fontSize: '0.85rem',
                        overflowX: 'auto',
                        background: '#f3f3f3',
                    }}
                >
                    {codeSnippets[tab].trim()}
                </SyntaxHighlighter>
            </Box>
            <AppSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity="success"
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={3000}
            />

        </Box>

    );
}

export default CodeTabs;
