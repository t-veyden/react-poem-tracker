import store from '../../store/store';
import { generateID } from './index';

export default name => {
  let id;
  if (store.getters['poems/auhtorID'](name) !== null) {
    id = store.getters['poems/auhtorID'](name);
  } else id = generateID();
  return id;
};
