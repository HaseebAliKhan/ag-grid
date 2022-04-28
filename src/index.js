import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import './style.css'
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-enterprise'
import chatImg from './arrows.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const App = () => {



  const simpleCompt = p=>{
    return ( 
    <>
<i class="fa-solid fa-list-ul"></i>
 
    {  p.value}
    <button className=' chat'><i className="fa-regular chatIcon fa-comment"></i></button>
   
    </>
    )
  }
 const gridRef = useRef(); // Optional - for accessing Grid's API
 const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'athlete',cellRenderer: simpleCompt } ,
   {field: 'age', },
   {field: 'country'},
   {field: 'year' },
   {field: 'date' },
   {field: 'sport'},
   {field: 'gold'},
   {field: 'silver'},
   {field: 'bronze'},
   {field: 'total'},
   
 ]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     sortable: true,
     filter: true,
     enableRowGroup: true
   }));

 // Example of consuming Grid Event
 const cellClickedListener = useCallback( event => {
   console.log('cellClicked', event);
 }, []);

 // Example load data from sever
 useEffect(() => {
   fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
   .then(result => result.json())
   .then(rowData => setRowData(rowData))
 }, []);

 // Example using Grid's API


 return (
   <div>

     {/* Example using Grid's API */}


     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine" style={{width: 1900, height: 1000}}>
     <FontAwesomeIcon icon="fas fa-comment-dots" />
       <AgGridReact 
           ref={gridRef} // Ref for accessing Grid's API
           rowGroupPanelShow='always'
           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

           onCellClicked={cellClickedListener} // Optional - registering for Grid Event
           />
     </div>
   </div>
 );
};

render(<App />, document.getElementById('root'));