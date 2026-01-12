import React, { useEffect, useState } from 'react';
import { Box, TextField, IconButton, InputAdornment, Typography, Card, CardContent } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTranslation } from 'react-i18next';

import CredentialsService from '../../services/apiCredentials';
import styles from './ApiKeys.module.scss';


function CredentialViewer() {
    const { t } = useTranslation();
    const [credentials, setCredentials] = useState({ clientId: '', clientSecret: '' });
    const [showClientId, setShowClientId] = useState(false);
    const [showClientSecret, setShowClientSecret] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => console.log(t('ApiKeys.copiedToClipboard')))
            .catch((err) => console.error(t('ApiKeys.copyError'), err));
    };


    useEffect(() => {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        const accessToken = tokenData?.accessToken;

        const fetchCredentials = async () => {
            try {
                const response = await CredentialsService.Credentials('Mulesoft', accessToken);
                if (response?.data) {
                    const { clientId, clientSecret } = response.data;
                    setCredentials({ clientId, clientSecret });
                }
            } catch (error) {
                console.error('Error fetching credentials:', error);
            }
        };

        fetchCredentials();
    }, []);

    return (
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom className={styles.title}>
                    {t('apiCredentials')}
                </Typography>
                <br />
                <br />


                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label={t('clientId')}
                        variant="outlined"
                        type="text"
                        value={showClientId ? credentials.clientId : `•••••${credentials.clientId.slice(-5)}`}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowClientId(!showClientId)} edge="end">
                                        {showClientId ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    <IconButton onClick={() => handleCopy(credentials.clientId)} edge="end">
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                </Box>

                <Box>
                    <TextField
                        fullWidth
                        label={t('clientSecret')}
                        variant="outlined"
                        type="text"
                        value={showClientSecret ? credentials.clientSecret : `•••••${credentials.clientSecret.slice(-5)}`}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowClientSecret(!showClientSecret)} edge="end">
                                        {showClientSecret ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    <IconButton onClick={() => handleCopy(credentials.clientSecret)} edge="end">
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                </Box>
            </CardContent>
        </Card>
    );
}

export default CredentialViewer;
