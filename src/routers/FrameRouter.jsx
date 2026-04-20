import React from 'react';
import { Routes, Route } from 'react-router-dom';

import McpUI from '../pages/common/McpUI';
import McpOverview from '../pages/common/McpOverview';

function FrameRouter() {
  return (
    <Routes>
      <Route path='/mcps/:id' element={<McpOverview />} />
      <Route path='/mcps/:id/ui' element={<McpUI />} />
    </Routes>
  );
}

export default FrameRouter;
