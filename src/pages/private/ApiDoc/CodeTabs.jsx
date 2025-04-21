import React, { useState } from 'react';
import { Tabs, Tab, Box, Button } from '@mui/material';
import { CopyAll } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import AppSnackbar from '../../../components/Snackbar/Snackbar'; // Asegúrate de que la ruta sea correcta


const codeSnippets = {
    Python: `
import requests
import json

url = "https://dev.kopernica.cloud/api/v1/sync/xp/face-ai/process"

payload = json.dumps({
  "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/.....",
  "models": {
    "bboxes": "dlib",
    "landmarks": "mediapipe",
    "emotions": "ferKpN",
    "kpiEmotional": "default",
    "kpiAttentional": "default",
    "kpiComposed": "default"
  }
})
headers = {
  'client_id': 'f7f4c38d9fa64db..',
  'client_secret': '051f2478200544..',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIg...'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
`,
    JavaScript: `
const myHeaders = new Headers();
myHeaders.append("client_id", "f7f4c38d9fa64dbe95....");
myHeaders.append("client_secret", "051f2478200544....");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5Mnl...");


const raw = JSON.stringify({
  "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/....",
  "models": {
    "bboxes": "dlib",
    "landmarks": "mediapipe",
    "emotions": "ferKpN",
    "kpiEmotional": "default",
    "kpiAttentional": "default",
    "kpiComposed": "default"
  }
});


const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};


fetch("https://dev.kopernica.cloud/api/v1/sync/xp/face-ai/process", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));`,
};

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


                <Box
                    component="pre"
                    sx={{
                        backgroundColor: '#f0f0f0',
                        padding: 2,
                        borderRadius: 1,
                        overflowX: 'auto',
                        fontSize: '0.85rem',
                        whiteSpace: 'pre-wrap',
                        marginTop: 5,
                    }}
                >
                    {codeSnippets[tab]}
                </Box>
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
