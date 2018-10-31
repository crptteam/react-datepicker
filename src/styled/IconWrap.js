import React from 'react';
import styled from 'styled-components';

const IconWrap = styled.div`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.13), 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export default IconWrap;
