import {React,useEffect} from "react";
import './Table.css';
import Button from "../Button/Button";

const Table = ({data = [], columns, buttonEvent:[onClick,handleDelete]}) => {

    useEffect(() => {
        
    })
 
    return(<div className="table-wrapper">
    <table className="table">
        <thead>
            <tr>
                {columns && columns.map(head => (<th key={head.header}>{head.header}</th>)
                )}
                <th >Action</th>
            </tr>
            
        </thead>
        <tbody>
            {data.length > 0 && data.map(row => (
                <tr key={row.id} data-data={JSON.stringify(row)}>
                    {columns.map(col => {
                        if(col.field === 'active'){
                            return <td key={col.field} style={{color: row[col.field] === 'Active' ? 'green' : 'red' }}>{row[col.field]}</td>;
                        }
                        return <td key={col.field}>{row[col.field]}</td>;
                    })}
                    <td style={{display:'flex', alignItems:'center'}}><Button type='button' onClick={handleDelete} buttonSize='btn--small' buttonStyle='btn--danger--solid'>Del</Button>
                    <Button type='button' onClick={onClick} buttonSize='btn--small' buttonStyle='btn--primary--solid'>Edit</Button></td>
                </tr>
                
            ))}
            
        </tbody>
        
    </table>
    {!data.length && <p style={{textAlign:'center'}}>No data to display</p>}
    </div>
    )
};

export default Table;