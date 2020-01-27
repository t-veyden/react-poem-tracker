import store from '../../store/store';
import { generateID } from './index';

export default name => {
  let id;
  if (store.getters['poems/authorID'](name) !== null) {
    id = store.getters['poems/authorID'](name);
  } else id = generateID();
  return id;
};
