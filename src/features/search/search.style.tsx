import styled, { keyframes } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const hideSearch = keyframes`
  from {
    display: none;
  }

  to {
    display: flex;
  }
`;

export const SearchWrapper = styled.div`
    position: relative;
`;


export const SearchResultWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 450px;
  min-height: 100px;
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
  border-radius: 6px;
  background-color: ${themeGet('colors.white', '#ffffff')};
  box-shadow: ${themeGet('shadows.header', '0 1px 2px rgba(0, 0, 0, 0.06)')};

  &.hidden{
    animation: ${hideSearch} 0.3s ease;
    display: none;
  }
  &.show{
    animation: ${hideSearch} 0.3s ease;
    display: flex;
  }
  li{
      padding: 8px 15px;
      cursor: pointer;
      color: #77798C;
  }

`;