import React, { useEffect, useState } from 'react';
import { formatDate, sortData, getNestedValue, renderPagination } from '../../Utils/index.jsx';
import BootButton from 'react-bootstrap/Button';
import './style.css';
import { Form } from 'react-bootstrap';

function Table({
    columns,
    data,
    actions,
    sortable = false,
    selectable = false,
    selectedRows,
    setSelectedRows,
    handleRowClick,
    pagination = false,
    limit,
    setLimit,
    totalQuantity,
    currentPage,
    setCurrentPage,
}) {
    const [sortedData, setSortedData] = useState([]);
    const [sortDirection, setSortDirection] = useState({});
    const [selectFlag, setSelectFlag] = useState(false);

    useEffect(() => {
        setSortedData(data);
    }, [data])

    const renderHeaders = (columns) => {
        return columns?.map((column) => (
            <th
                key={column.name}
                onClick={() => sortable && handleSort(column.key)}
                style={column.style}
                className={'table-head-row'}
            >
                {column.name}
                {sortable && (
                    <button>
                        {sortDirection[column.key] === 'asc' ? '🔽' : '🔼'}
                    </button>
                )}
            </th>
        ));
    };

    const renderRows = (data) => {
        return data?.length === 0 ?
            <tr>
                <td colSpan={columns.length + actions.length}>No Record Found</td>
            </tr> :
            data?.map((row, index) => (
                <tr key={index} onClick={e => handleRowClick ? handleRowClick(row, index) : {}}>
                    {selectable && (
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedRows?.has(index)}
                                onChange={() => handleRowSelection(index)}
                            />
                        </td>
                    )}
                    {columns?.map((column) => {
                        let value = getNestedValue(row, column.key);
                        if (column.key === 'date' || column.key === 'createdAt') {
                            value = formatDate(value, 'D/M/YY');
                        }
                        return (
                            <td key={column.key} style={column.style}>
                                {value}
                            </td>
                        )
                    })}
                    {/* Render actions */}
                    {actions?.map((action, actionIndex) => {
                        const btnTitle = action.name === 'Status' ? (row.status ? 'Hide' : 'Show') : action.name;
                        const btnBg = action.name === 'Status' ? (row.status ? 'outline-secondary' : 'outline-primary') : action.variant;
                        return (
                            <td key={actionIndex}>
                                <BootButton
                                    className={action.className}
                                    onClick={() => action.handler(row, index)}
                                    variant={btnBg ? btnBg : ''}
                                >
                                    {btnTitle}
                                </BootButton>
                            </td>
                        )
                    })}
                </tr>
            ))
    };

    const handleSort = (key) => {
        const newDirection = sortDirection[key] === 'asc' ? 'desc' : 'asc';  // Toggle direction

        setSortDirection({ ...sortDirection, [key]: newDirection });  // Update direction state

        setSortedData(sortData(sortedData, key, newDirection));
    };

    const handleRowSelection = (rowIndex) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows?.has(rowIndex)) {
            newSelectedRows?.delete(rowIndex);  // Unselect if already selected
        } else {
            newSelectedRows?.add(rowIndex);  // Select the row
        }
        setSelectedRows(newSelectedRows);
    };

    const handleSelectAll = () => {
        setSelectFlag(true);
        const newSelectedRows = new Set();
        sortedData.forEach((_, index) => {
            newSelectedRows?.add(index);  // Select all rows
        });
        setSelectedRows(newSelectedRows);
    };

    const handleDeselectAll = () => {
        setSelectFlag(false);
        setSelectedRows(new Set());  // Deselect all rows
    };

    return (
        <>
            <table className='table text-uppercase'>
                <thead>
                    <tr>
                        {selectable &&
                            <th className='table-head-row'>
                                <input
                                    type="checkbox"
                                    onChange={selectFlag ? handleDeselectAll : handleSelectAll}
                                    checked={selectedRows?.size === sortedData.length}
                                />
                            </th>
                        }
                        {renderHeaders(columns)}
                        {actions.map((action, actionIndex) => (
                            <th key={actionIndex} style={action.style} className='table-head-row'>
                                {action.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {renderRows(sortedData)}
                </tbody>
            </table>
            {
                pagination &&
                <div>
                    Total Record {totalQuantity}
                    <br />
                    <div className="d-flex">
                        Bills Per Page:
                        <Form.Select
                            size="sm"
                            className="mb-1"
                            style={{ height: '25px', width: '100px' }}
                            value={limit}
                            onChange={e => setLimit(e.target.value)}
                        >
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </Form.Select>
                    </div>
                    {
                        renderPagination(totalQuantity, limit, currentPage, setCurrentPage)
                    }
                </div>
            }
        </>
    )
}

export default Table