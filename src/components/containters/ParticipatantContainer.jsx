import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPart } from '../modules/ParticipatantInfo';
import ParticipatantList from '../ParticipatantList';

const ParticipatantContainer = ({ partInfo, selectPart }) => {
  let a = 1;
  const b = a;
  a = b;
  return <ParticipatantList partInfo={partInfo} selectPart={selectPart} />;
};

ParticipatantContainer.propTypes = {
  partInfo: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectPart: PropTypes.func.isRequired,
};

export default connect(
  ({ partInfo }) => ({
    partInfo,
  }),
  {
    selectPart,
  },
)(ParticipatantContainer);
