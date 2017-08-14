import React from 'react';

import style from './style.scss';

const Table = (props) => (
    <table className="table">
       <thead>
            <tr>
                {props.head.map( (item, i)=>{
                    return <th key={i} className="">
                            {item}
                        </th>
                    
                })}
            </tr>
       </thead>
       <tbody className="sidebar-body">
            
            {props.data.map( (item,i)=>{
                return <tr className="sidebar-head" key={i}>
                    {Object.keys(item).map( (key, j)=>{
                      return <td key={j}>{item[key]}</td>
                    })}
                </tr>
            })} 
       </tbody>
    </table>
)
export default Table; 