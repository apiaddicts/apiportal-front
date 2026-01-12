import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import styles from './UserCard.module.scss';

const UserInfoButton = ({ user }) => {
  const initial = user?.firstName?.[0]?.toUpperCase() || '?';

  return (
    <Box className={styles.container}>
      <Avatar className={styles.avatar}>{initial}</Avatar>
      <Box className={styles.userInfo}>
        <Typography className={styles.name}>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography className={styles.email}>
          {user?.email}
        </Typography>
      </Box>
      <KeyboardArrowDownSharpIcon className={styles.icon} />
    </Box>
  );
};

export default UserInfoButton;
