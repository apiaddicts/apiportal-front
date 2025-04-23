import React from 'react';
import { Grid, Box, Typography, Paper, Link, Container } from '@mui/material';
import TransgenderIcon from '@mui/icons-material/Transgender';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import FaceIcon from '@mui/icons-material/Face';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
const features = [
  {
    title: 'Age and gender detection',
    description: 'Detect gender and age of people in a photo',
    icon: <TransgenderIcon sx={{ fontSize: 40 }} />,
    url: 'code-samples/1',
  },
  {
    title: 'Face recognition',
    description: 'Recognize who is in an image ("Who is this?")',
    icon: <TagFacesIcon sx={{ fontSize: 40 }} />,
    url: '/docs/face-recognition',
  },
  {
    title: 'Face verification',
    description: 'Make sure the person is present in an image ("Is this Steve?")',
    icon: <FaceIcon sx={{ fontSize: 40 }} />,
    url: '/docs/face-verification',
  },
  {
    title: 'Emotion recognition',
    description: 'Recognize emotions of people in a photo',
    icon: <EmojiEmotionsIcon sx={{ fontSize: 40 }} />,
    url: '/docs/emotion-recognition',
  },
];
function CodeSamples(props) {
  return (

    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, py: 6, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={600} mb={2}>
          Code samples
        </Typography>
        <Typography color="text.secondary" mb={5}>
          Luxand.cloud API contains a wide range of ready-to-use cases. Choose the relevant case
          and access the comprehensive documentation provided.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map(({ icon, title, description, url }, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Link href={url} underline="none" color="inherit">
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#f5faff',
                      borderColor: 'primary.main',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Box mb={2}>{icon}</Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {description}
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}


CodeSamples.propTypes = {};

export default CodeSamples;
