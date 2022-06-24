import React, { useEffect, useState } from 'react';

import subscriptionsService from '../../services/subscriptionsService';

function ProductName({ scope }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (scope && scope.length > 0) {
      subscriptionsService.getName(scope).then((response) => {
        if (response.properties && Object.keys(response.properties).length > 0) {
          setName(response.properties.displayName);
        }
      }, (err) => {
        console.error(err);
      });
    }
  }, [scope]);
  return (
    <p>{name}</p>
  );
}

export default ProductName;
