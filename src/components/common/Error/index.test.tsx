import * as ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import ErrorModal from './index';

describe('remove item', () => {
  let container: HTMLDivElement;

  

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<ErrorModal error={true} />, container);
  });
  
  afterEach(()=> {
      document.body.removeChild(container)
      container.remove()
    })

    it('Renders correctly initial document', ()=> {

    })
});
