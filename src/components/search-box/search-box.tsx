import React from 'react';
import {
  StyledForm,
  StyledInput,
  StyledCategoryName,
  StyledSearchButton
} from './search-box.style';
import { SearchIcon } from 'assets/icons/SearchIcon';

interface Props {
  onEnter: (e: React.SyntheticEvent) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  value: string;
  name: string;
  minimal?: boolean;
  className?: string;
  showButtonText?: boolean;
  shadow?: string;
  [key: string]: unknown;
}

export const SearchBox: React.FC<Props> = ({
  onEnter,
  onChange,
  onBlur,
  value,
  name,
  minimal,
  categoryType,
  buttonText,
  className,
  showButtonText = true,
  shadow,
  ...rest
}) => {
  return (
    <StyledForm
      onSubmit={onEnter}
      className={className}
      boxShadow={shadow}
      minimal={minimal}
    >
      {minimal ? (
        <>
          <SearchIcon />
          <StyledInput
            type='search'
            autoComplete="off"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            {...rest}
            
          />
        </>
      ) : (
        <>
          <StyledCategoryName>{categoryType}</StyledCategoryName>
          <StyledInput
            type='search'
            autoComplete="off"
            onChange={onChange}
            value={value}
            name={name}
            onBlur={onBlur}
            {...rest}
          />
          <StyledSearchButton>
            <SearchIcon />
            {showButtonText && buttonText}
          </StyledSearchButton>
        </>
      )}
    </StyledForm>
  );
};
