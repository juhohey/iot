import React from 'react';
import ReactDom from 'react-dom';

import App from './app.jsx';

console.log('Render');
ReactDom.render(<App/>, document.querySelector('#app')); 
export default ()=>{}