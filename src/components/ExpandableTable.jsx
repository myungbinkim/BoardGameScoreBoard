import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import Table from 'react-bootstrap/Table';

const useExpandRows = (rows) => {
  const [rowNum, setRowNum] = useState(Math.min(3, rows.length));
  const isExpandable = rowNum < rows.length;
  const expandRows = () => {
    setRowNum(Math.min(rowNum + 3, rows.length));
  };
  return [rows.slice(0, rowNum), isExpandable, expandRows];
};

const ExpandableTable = ({ header, rows }) => {
  const [newRows, isExpandable, expandRows] = useExpandRows(rows);

  return (
    <Table>
      <thead>
        <tr>{header.map((col) => (<td key={col}>{col}</td>))}</tr>
      </thead>
      <tbody>
        {newRows.map((row, index) => (
          <tr key={row.player}>
            <td>{index + 1}</td>
            <td>{row.player}</td>
            <td>{row.score}</td>
          </tr>
        ))}
        {
          isExpandable
          && (
            <tr className="text-center">
              <td colSpan="3" className="p-0">
                <IconButton onClick={() => expandRows()}>
                  <ExpandMoreOutlinedIcon />
                </IconButton>
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  );
};

ExpandableTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    player: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

export default ExpandableTable;
