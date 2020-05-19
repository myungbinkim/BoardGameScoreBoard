import React from 'react';
import { connect } from 'react-redux';
import { selectPart } from '../modules/ParticipatantInfo';
import ParticipatantList from '../ParticipatantList';

const ParticipatantContainer = ({ partInfo, selectPart}) => {
  return <ParticipatantList partInfo={partInfo} selectPart={selectPart} />;
};

export default connect(
  ({ partInfo }) => ({
    partInfo,
  }),
  {
    selectPart,
  },
)(ParticipatantContainer);
