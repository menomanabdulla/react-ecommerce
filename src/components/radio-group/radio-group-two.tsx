import React from 'react';
import styled from 'styled-components';

const RadioGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

type RadioGroupProps = {
  containerClassName?: string;
  items: any[];
  component?: (item: object, index?: number) => React.ReactNode;
  secondaryComponent?: React.ReactNode;
};

const RadioGroupTwo: React.FC<RadioGroupProps> = ({
  items = [],
  component,
  containerClassName,
  secondaryComponent,
}) => {
  if(items){
    return (
      <RadioGroupWrapper className={`radioGroup ${containerClassName}`.trim()}>

        {items.map(
          (item: any, index: any) => component && component(item, index)
        )}

        {items.length < 3 && secondaryComponent}

      </RadioGroupWrapper>
    );
  }else{
    return (
      <RadioGroupWrapper className={`radioGroup ${containerClassName}`.trim()}>

        {secondaryComponent && secondaryComponent}

      </RadioGroupWrapper>
    );
  }
};

export default RadioGroupTwo;
