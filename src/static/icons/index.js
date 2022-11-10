import React from 'react';
import person from './person.svg';
import note from './note.svg';
import note1 from './note-1.svg';
import computer from './computer.svg';
import archivist from './archivist.svg';
import successWindow from './success-window.svg';
import email from './email.svg';
import adduser from './adduser.svg';
import settingsSquare from './settings-square.svg';
import develop from './develop.svg';

const icons = (iconName) => {
  switch (iconName) {
    case 'person':
      return <img src={person} alt='' />;
    case 'note':
      return <img src={note} alt='' />;
    case 'note1':
      return <img src={note1} alt='' />;
    case 'computer':
      return <img src={computer} alt='' />;
    case 'archivist':
      return <img src={archivist} alt='' />;
    case 'successWindow':
      return <img src={successWindow} alt='' />;
    case 'email':
      return <img src={email} alt='' />;
    case 'adduser':
      return <img src={adduser} alt='' />;
    case 'settings-square':
      return <img src={settingsSquare} alt='' />;
    case 'develop':
      return <img src={develop} alt='' />;
    default:
      return <img src={person} alt='' />;
  }
};
export default icons;
