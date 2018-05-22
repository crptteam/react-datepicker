import React from 'react';
import styled from 'styled-components';


const Elem = styled.div`
    js-display: flex; 
    display: flex;
    align-items: center;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: calc(100% - 32px);
  `;

const InputContentWrap = props => {

  return <Elem {...props} />;
};

export default InputContentWrap;
