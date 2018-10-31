import React from 'react';
import styled from 'styled-components';

const Elem = styled.div`
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
`;

const PickerWrap = props => {
  return <Elem  {...props}  />;
};

export default PickerWrap;
