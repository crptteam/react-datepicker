import styled from 'styled-components';

const ArrowWrap = styled.span`
  position: absolute;
  margin-left: ${props => props.right ? "2px" : "1px"};
`;

export default ArrowWrap;