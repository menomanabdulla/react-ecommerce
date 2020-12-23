import React from 'react';
import Card from './card';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { DeleteButton, Wrapper } from './payment-card.style';

interface PaymentCardProps {
  className?: string;
  logo: string;
  alt: string;
  name: string;
  color?: string;
  image?: any;
  details?: string;
}

const PaymentCard: React.FunctionComponent<any> = ({
  className,
  onChange,
  onDelete,
  onClick,
  name,
  id,
  cardType,
  lastFourDigit,
  color,
  type,
  image,
  details

}) => {
  function handleChange() {
    onChange();
  }
  function handleDelete() {
    onDelete();
  }
  function handleClick(){
    onClick()
  }
  return (
    <Wrapper
      htmlFor={`payment-card-${id}`}
      className={`payment-card-radio ${className ? className : ''}`}
    >
      <input
        type='radio'
        id={`payment-card-${id}`}
        name={name}
        value={`payment-card-${id}`}
        onChange={handleChange}
        onClick={handleClick}
        checked={type === 'primary'}
      />

      <Card
        id={`card-${id}`}
        cardType={cardType}
        lastFourDigit={lastFourDigit}
        color={color}
        name={name}
        image={image}
        details={details}
      />
    </Wrapper>
  );
};

export default PaymentCard;
