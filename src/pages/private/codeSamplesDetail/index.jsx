import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Stack,
  Paper,
  Button,
  Tooltip,
  List,
  ListItemButton,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { getCodeSample } from '../../../redux/actions/CodeSamples';

const tocItems = [
  'Setting up the environment',
  'Adding people to the database',
  'Improving accuracy of recognition',
  'Recognizing faces',
  'Complete code',
  'Conclusion'
];

function CodeSampleDetailss() {
  const dispatch = useDispatch();
  const sample = useSelector((state) => state.codeSampleReducer.codeSample);
  const error = useSelector((state) => state.codeSampleReducer.errorCodeSample);
  const [selectedLang, setSelectedLang] = useState('');

  useEffect(() => {
    dispatch(getCodeSample(2));
  }, [dispatch]);

  // Obtiene los lenguajes únicos desde los datos
  const availableLanguages = useMemo(() => {
    if (!sample?.data) return [];
    const langs = sample.data.map((s) => s.attributes.Language);
    const uniqueLangs = [...new Set(langs)];
    return uniqueLangs;
  }, [sample]);

  // Inicializa el lenguaje seleccionado al primero disponible
  useEffect(() => {
    if (availableLanguages.length > 0 && !selectedLang) {
      setSelectedLang(availableLanguages[0]);
    }
  }, [availableLanguages, selectedLang]);

  // Obtiene el sample actual según el lenguaje seleccionado
  const currentSample = sample?.data?.find(
    (s) => s.attributes.Language.toLowerCase() === selectedLang.toLowerCase()
  );

  const configSection = currentSample?.attributes?.ConfigurationSection;
  const execSection = currentSample?.attributes?.ExecutionSection;
  const resultSection = currentSample?.attributes?.ResultSection;

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 4 }}>
      <Box sx={{ flex: 1 }}>
        <Tabs
          value={selectedLang}
          onChange={(e, newVal) => setSelectedLang(newVal)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderRadius: 1, backgroundColor: '#f5f5f5' }}
        >
          {availableLanguages.map((lang) => (
            <Tab
              key={lang}
              value={lang}
              label={lang}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                // color: selectedLang === lang ? 'white' : 'black',
                // backgroundColor: selectedLang === lang ? '#1976d2' : 'transparent',
                borderRadius: 1,
                mx: 0.5,
              }}
            />
          ))}
        </Tabs>



        <Typography variant="h6" fontWeight={700} mt={4}>
          Descripción del ejemplo
        </Typography>

        <Typography sx={{ whiteSpace: 'pre-line' }}>
          {currentSample?.attributes?.DescriptionOfTheExample || 'No hay descripción disponible'}
        </Typography>

        {/* Sección de configuración */}
        <Typography variant="h6" fontWeight={700} mt={4}>
          Sección de configuración
        </Typography>

        <Typography variant="subtitle1" fontWeight={600} mt={2}>Instalación de dependencias</Typography>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
            {configSection?.InstallingDependencies || 'N/A'}
          </Typography>
        </Paper>

        <Typography variant="subtitle1" fontWeight={600}>Importado de paquetes</Typography>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
            {configSection?.ImportingPackages || 'N/A'}
          </Typography>
        </Paper>

        <Typography variant="subtitle1" fontWeight={600}>Configuración de variables</Typography>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
            {configSection?.ConfiguringVariables || 'N/A'}
          </Typography>
        </Paper>

        {/* Sección de ejecución */}
        <Typography variant="h6" fontWeight={700} mt={4}>
          Sección de ejecución
        </Typography>
        <Typography variant="subtitle1" fontWeight={600}>Función de ejemplo</Typography>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
            {execSection?.ExampleFunction || 'N/A'}
          </Typography>
        </Paper>

        {/* Sección de resultado */}
        <Typography variant="h6" fontWeight={700} mt={4}>
          Sección de resultado
        </Typography>
        <Typography variant="subtitle1" fontWeight={600}>
          DTO con resultado de ejemplo de respuesta en JSON
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
          <pre style={{ fontFamily: 'monospace', margin: 0 }}>
            {resultSection?.DTOWithExampleResponseResultInJSON
              ? JSON.stringify(resultSection.DTOWithExampleResponseResultInJSON, null, 2)
              : 'No hay datos disponibles'}
          </pre>
        </Paper>



      </Box>

      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          backgroundColor: '#f9f9f9',
          borderRadius: 2,
          p: 2,
          height: 'fit-content',
          position: 'sticky',
          top: 100,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} mb={2}>Table of contents</Typography>
        <List dense disablePadding>
          {tocItems.map((label, idx) => (
            <ListItemButton
              key={idx}
              href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
              sx={{
                fontSize: '0.9rem',
                color: '#1976d2',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              }}
            >
              {label}
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default CodeSampleDetailss;
