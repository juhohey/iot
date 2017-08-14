import React from 'react';
import ReactDom from 'react-dom';

import Login from './login.jsx';

console.log('Render');
ReactDom.render(<Login/>, document.querySelector('#login')); 
export default ()=>{}
