import React from 'react';
import { Routes, Route } from 'react-router-dom';

import McpUI from '../pages/common/McpUI';
import McpOverview from '../pages/common/McpOverview';

function FrameRouter() {
  return (
    <Routes>
      <Route path='/mcps/:slug' element={<McpOverview />} />
      <Route path='/mcps/:slug/ui' element={<McpUI />} />
    </Routes>
  );
}

export default FrameRouter;
