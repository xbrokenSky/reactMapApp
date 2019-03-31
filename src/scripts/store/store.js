import { createStore } from 'redux';
import appReducer from '../reducers';

const store = createStore(appReducer);
// export const unsubscribe = store.subscribe(() => {
//     console.log(store.getState());
// });

export default store;
