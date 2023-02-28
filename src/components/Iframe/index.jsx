import React from 'react';

function index(props) {

  const { iframeSource } = props;

  return (
    <div dangerouslySetInnerHTML={{ __html: iframeSource }} />
  );
}

export default index;
