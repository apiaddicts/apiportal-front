const messages = {
  401: {
    msg: 'No cuentas con los permisos para visualizar el contenido',
  },
  403: {
    msg: 'No tienes tienes el acceso para visualizar el contenido',
  },
  404: {
    msg: 'No se encuentra la información',
  },
  405: {
    msg: 'No se encuentra el contenido',
  },
  429: {
    msg: '',
  },
  500: {
    msg: 'Error interno del servidor, por favor contacte con el equipo de soporte',
  },
  504: {
    msg: 'Se ha excedido el tiempo de respuesta, vuelva a intentarlo más tarde',
  },
};

const getMessage = (code) => {
  const strCode = parseInt(code, 10);
  switch (code) {
    case 401:
      return messages[strCode].msg;
    case 403:
      return messages[strCode].msg;
    case 404:
      return messages[strCode].msg;
    case 405:
      return messages[strCode].msg;
    case 500:
      return messages[strCode].msg;
    case 504:
      return messages[strCode].msg;
    default:
      return 'Error interno del servidor, por favor contacte con el equipo de soporte';
  };
};

export default getMessage;
