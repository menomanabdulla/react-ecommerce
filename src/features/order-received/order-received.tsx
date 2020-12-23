import React,  { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks';
import { GET_ORDERS } from 'graphql/query/order.query';
import ErrorMessage from 'components/error-message/error-message';
import OrderReceivedWrapper, {
  OrderReceivedContainer,
  OrderInfo,
  OrderDetails,
  TotalAmount,
  BlockTitle,
  Text,
  InfoBlockWrapper,
  InfoBlock,
  ListItem,
  ListTitle,
  ListDes,
} from './order-received.style';
import { FormattedMessage } from 'react-intl';

type OrderReceivedProps = {
  data?: any;
  index?: Number;
  Router?: any;
};

const OrderReceived: React.FunctionComponent<OrderReceivedProps> = (props) => {
  const router = useRouter()
  const { data, error, loading } = useQuery(GET_ORDERS);
  if (loading) {
    return <ErrorMessage message={'Loading...'} />
  };

  if (error) {
    return (
      <ErrorMessage message={error.message} />
    );
  };
  const ids = data.getUserOrders.map(el => el.id);

  const index = ids.indexOf(router.query.itemId);
  const myOrder = data.getUserOrders[index];

  const printHandler = () =>{
    if (typeof window !== 'undefined') {
      window.print()
    }
  }
  
  return (
    <OrderReceivedWrapper>
      <OrderReceivedContainer>
        <Link href="/">
          <a className="home-btn">
            <FormattedMessage id="backHomeBtn" defaultMessage="Back to Home" />
          </a>
        </Link>
        <span onClick={printHandler} className="print-btn">
          Print Invoice
        </span>

        <OrderInfo>
          <BlockTitle>
            <FormattedMessage
              id="orderReceivedText"
              defaultMessage="Order"
            />
          </BlockTitle>
          <InfoBlockWrapper>
            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="orderNumberText"
                  defaultMessage="Order Number"
                />
              </Text>
              <Text>{myOrder.order_code}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage id="orderDateText" defaultMessage="Date" />
              </Text>
              <Text>{myOrder.datetime.split('2020').shift()}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage id="totalText" defaultMessage="Total" />
              </Text>
              <Text>{myOrder.total}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="paymenMethodText"
                  defaultMessage="Payment Method"
                />
              </Text>
              <Text>
                <FormattedMessage
                  id="paymentMethodName"
                  defaultMessage={myOrder.payment_method}
                />
              </Text>
            </InfoBlock>
          </InfoBlockWrapper>
        </OrderInfo>

        <OrderDetails>
          <BlockTitle>
            <FormattedMessage
              id="orderDetailsText"
              defaultMessage="Order Details"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="totalItemText"
                  defaultMessage="Total Item"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>6 Items</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="orderTimeText"
                  defaultMessage="Order Method"
                />
              </Text>
            </ListTitle>
            <ListDes>
           <Text>{myOrder.delivery_method.details}</Text>
            </ListDes>
          </ListItem>
          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="deliveryLocationText"
                  defaultMessage="Delivery Location"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>
                {myOrder.delivery_address}
              </Text>
            </ListDes>
          </ListItem>
        </OrderDetails>

        <TotalAmount>
          <BlockTitle>
            <FormattedMessage
              id="totalAmountText"
              defaultMessage="Total Amount"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="subTotal" defaultMessage="Sub total" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{myOrder.sub_total}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="paymenMethodText"
                  defaultMessage="Payment Method"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{myOrder.payment_method}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="totalText" defaultMessage="Total" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{myOrder.total}</Text>
            </ListDes>
          </ListItem>
        </TotalAmount>
      </OrderReceivedContainer>
    </OrderReceivedWrapper>
  );
};

export default OrderReceived;
