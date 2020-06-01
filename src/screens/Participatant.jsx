import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ParticipatantInfo from '../redux/participatants';
import ParticipatantContainer from '../components/containters/ParticipatantContainer';

export default function Participatant() {
  const store = createStore(ParticipatantInfo);
  return (
    <>
      <Provider store={store}>
        <ParticipatantContainer />
      </Provider>
    </>
  );
}
