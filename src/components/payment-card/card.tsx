import React from 'react';
import MasterCard from './image/master-card.png';
import Paypal from './image/paypal.png';
import Visa from './image/visa.png';
import { SHOP_IMAGE_HOST } from 'utils/images-path';
import {
  PaymentCardWrapper,
  CardLogo,
  CardNumber,
  CardNumTitle,
  Name,
  CardTitle,
  CardContent
} from './payment-card.style';

interface Props {
  id: string;
  name: string;
  cardType: string;
  lastFourDigit: string;
  color: string;
  image: any;
  details: string;
}



const Card: React.FC<Props> = ({
  id,
  name,
  cardType,
  lastFourDigit,
  color,
  image,
  details
}) => {
  const logo =
    (cardType === 'paypal' && Paypal) ||
    (cardType === 'master' && MasterCard) ||
    (cardType === 'visa' && Visa);

  return (
    <PaymentCardWrapper className="payment-card" color={color}>
      <CardLogo>
        <img src={SHOP_IMAGE_HOST+image} alt={`card-${id}`} />
      </CardLogo>
      <CardTitle>{name}</CardTitle>
      <CardContent>{details}</CardContent>
    </PaymentCardWrapper>
  );
};

export default Card;
