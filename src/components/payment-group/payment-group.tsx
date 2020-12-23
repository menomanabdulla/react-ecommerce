import React from 'react';
import { FormattedMessage } from 'react-intl';
import Carousel from 'components/carousel/carousel-two';
import PaymentCard from '../payment-card/payment-card';
import { Plus } from 'assets/icons/PlusMinus';
import { Button } from 'components/button/button';
import {
  Header,
  PaymentCardList,
  IconWrapper,
  SavedCard,
  OtherPayOption,
} from './payment-group.style';

interface PaymentCardType {
  id: number | string;
  type: string;
  lastFourDigit: string;
  name: string;
}

interface PaymentOptionType {
  showCard?: boolean;
  addedCard?: PaymentCardType[];
  mobileWallet?: boolean;
  cashOnDelivery?: boolean;
}

interface PaymentGroupProps {
  id?: any;
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  name: string;
  disabled?: boolean;
  label?: string;
  className?: string;
  value?: string;
  onChange: Function;
  onClick: Function;
  items: any;
  onEditDeleteField: any;
  handleAddNewCard: any;
}

const PaymentGroup: React.FunctionComponent<PaymentGroupProps> = ({
  items,
  deviceType,
  className,
  name,
  onChange,
  onClick,
  onEditDeleteField,
  handleAddNewCard,
}) => {
  // RadioGroup State

  // Handle onChange Func
  const handleChange = (item: any) => {
    onChange(item);
  };

  const handleClick = (item: any) => {
    onClick(item);
  };

  if (items.length == 0 ){
    return(
      <Header>
          <SavedCard>
            <FormattedMessage id="savedCardsId2" defaultMessage=" Tere is no payment methods added" />
          </SavedCard>
      </Header>
    )
  }

  return (
    <>
      {/* {deviceType === 'desktop' && ( */}
      <Header>
        {items.length !== 0 && (
          <SavedCard>
            <FormattedMessage id="savedCardsId2" defaultMessage="Saved Payment Methods" />
          </SavedCard>
        )}
      </Header>
      <PaymentCardList>
        <Carousel
          deviceType={deviceType}
          autoPlay={false}
          infinite={false}
          data={items}
          component={(item: any) => (
            <PaymentCard
              key={item.id}
              onChange={() => handleChange(item)}
              onDelete={() => onEditDeleteField(item, 'delete')}
              onClick={ () => handleClick(item)}
              {...item}
            />
          )}
        />
      </PaymentCardList>
    </>
  );
};

export default PaymentGroup;
