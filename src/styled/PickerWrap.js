import React from 'react';
import styled from 'styled-components';

const Elem = styled.div`
  width: 100%;
  text-align: ${props => (props.right ? "right" : "left")};
  font-size: 0px;
  display: inline-flex;
  align-items: center;
  height: 24px;
  margin-right: ${props => (props.right ? "0px" : "15px")};
  margin-bottom: 5px;
`;

const PickerWrap = props => {
  return <Elem  {...props}  />;
};

export default PickerWrap;
