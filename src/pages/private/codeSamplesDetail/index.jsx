import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Icon from '../../../components/MdIcon/Icon';
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
  Container,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { getCodeSample } from '../../../redux/actions/CodeSamples';
import classes from './code-sample-detail.module.scss';

const tocItems = [
  'Setting up the environment',
  'Adding people to the database',
  'Improving accuracy of recognition',
  'Recognizing faces',
  'Complete code',
  'Conclusion'
];

function CodeSampleDetailss() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sample = useSelector((state) => state.codeSampleReducer.codeSample);
  const error = useSelector((state) => state.codeSampleReducer.errorCodeSample);
  const [selectedLang, setSelectedLang] = useState('');
  const params = useParams();
  useEffect(() => {
    dispatch(getCodeSample(params.id));
  }, [dispatch]);


  const availableLanguages = useMemo(() => {
    if (!sample?.data) return [];
    const langs = sample.data.map((s) => s.Language);
    const uniqueLangs = [...new Set(langs)];
    return uniqueLangs;
  }, [sample]);


  useEffect(() => {
    if (availableLanguages.length > 0 && !selectedLang) {
      setSelectedLang(availableLanguages[0]);
    }
  }, [availableLanguages, selectedLang]);


  const currentSample = sample?.data?.find(
    (s) => s.Language.toLowerCase() === selectedLang.toLowerCase()
  );

  const configSection = currentSample?.ConfigurationSection;
  const execSection = currentSample?.ExecutionSection;
  const resultSection = currentSample?.ResultSection;

  return (
    <>
      <Container>
        <div className={classes.back__btn}>
          <Link to={-1}>
            <div className={classes.return}>
              <div>
                <Icon id='MdKeyboardBackspace' />
              </div>
              <span>{t('back')}</span>
            </div>
          </Link>
        </div>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Tabs
              value={selectedLang}
              onChange={(e, newVal) => setSelectedLang(newVal)}
              variant="scrollable"
              scrollButtons="auto"
              className={classes.tabsContainer}
            >
              {availableLanguages.map((lang) => (
                <Tab
                  key={lang}
                  value={lang}
                  label={lang}
                  className={`${classes.tabItem} ${selectedLang === lang ? classes.tabItemSelected : ''}`}
                />
              ))}
            </Tabs>

            <Typography variant="h6" fontWeight={700} mt={4}>
              {t('descriptionExample')}
            </Typography>

            <Typography sx={{ whiteSpace: 'pre-line' }}>
              {currentSample?.DescriptionOfTheExample || t('noData')}
            </Typography>

            <Typography variant="h6" fontWeight={700} mt={4}>
              {t('configSection')}
            </Typography>

            <Typography variant="subtitle1" fontWeight={600} mt={2}>
              {t('installDependencies')}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
                {configSection?.InstallingDependencies || t('noData')}
              </Typography>
            </Paper>

            <Typography variant="subtitle1" fontWeight={600}>
              {t('importPackages')}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
                {configSection?.ImportingPackages || t('noData')}
              </Typography>
            </Paper>

            <Typography variant="subtitle1" fontWeight={600}>
              {t('configVariables')}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
                {configSection?.ConfiguringVariables || t('noData')}
              </Typography>
            </Paper>

            <Typography variant="h6" fontWeight={700} mt={4}>
              {t('execSection')}
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {t('exampleFunction')}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
                {execSection?.ExampleFunction || t('noData')}
              </Typography>
            </Paper>

            <Typography variant="h6" fontWeight={700} mt={4}>
              {t('resultSection')}
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {t('dtoExample')}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
              <pre style={{ fontFamily: 'monospace', margin: 0 }}>
                {resultSection?.DTOWithExampleResponseResultInJSON
                  ? JSON.stringify(resultSection.DTOWithExampleResponseResultInJSON, null, 2)
                  : t('noData')}
              </pre>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CodeSampleDetailss;
