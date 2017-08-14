import React from 'react';
import Ink from 'react-ink';

const inkProps = {
    radius : 10000,
    opacity: 0.25,
    duration: 500,
    background :false,
    style:{color:'black'}
}


const Inkd = () => (
    <Ink {...inkProps} />
)
export default Inkd;