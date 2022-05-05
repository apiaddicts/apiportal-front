import { useState } from 'react';

const useResults = ({ initialState }) => {
  const [resultValue, setResultValue] = useState(initialState);

  return {
    resultValue,
    setResultValue,
  };
};

export default useResults;
