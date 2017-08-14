import React from 'react';

const FillTo = (props) => (
    <div className={'view-fill-to ' + props.className}>
        <div className="view-center">
            {props.children}
        </div>
    </div>
)
export default FillTo; 