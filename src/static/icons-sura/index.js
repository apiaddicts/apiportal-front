import person from './person.svg';
import note from './note.svg';
import note1 from './note-1.svg';
import computer from './computer.svg';
import archivist from './archivist.svg';
import successWindow from './success-window.svg';

const icons = (iconName) => {
  switch (iconName) {
    case 'person':
      return person;
    case 'note':
      return note;
    case 'note1':
      return note1;
    case 'computer':
      return computer;
    case 'archivist':
      return archivist;
    case 'successWindow':
      return successWindow;
    default:
      return person;
  }
};
export default icons;
