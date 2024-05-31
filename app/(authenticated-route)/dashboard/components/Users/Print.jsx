'use client'
import React, { forwardRef, useRef } from 'react';
import ReactToPrint from 'react-to-print';

// Define PrintData component and forward ref
const PrintData = forwardRef(({ data }, ref) => {
    return (
        <table ref={ref} className="print-only">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>UserId</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
});

// PrintTableData component
const PrintTableData = ({ data }) => {
    const componentRef = useRef();
    const dataTable = data;

    return (
        <div>
            <ReactToPrint
                trigger={() => <button>Print Data Table</button>}
                content={() => componentRef.current}
            />
            {/* Hidden PrintData component */}
            <div style={{ display: 'none' }}>
                <PrintData data={dataTable} ref={componentRef} />
            </div>
        </div>
    );
}

export default PrintTableData;
