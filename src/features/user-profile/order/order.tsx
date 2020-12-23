import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useQuery } from '@apollo/react-hooks';
import { GET_ORDERS } from 'graphql/query/order.query';
import ErrorMessage from 'components/error-message/error-message';
import {
  DesktopView,
  MobileView,
  OrderBox,
  OrderListWrapper,
  OrderList,
  OrderDetailsWrapper,
  Title,
  ImageWrapper,
  ItemWrapper,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemPrice,
  NoOrderFound,
} from './order.style';

import OrderDetails from './order-details/order-details';
import OrderCard from './order-card/order-card';
import OrderCardMobile from './order-card/order-card-mobile';
import useComponentSize from 'utils/useComponentSize';
import { FormattedMessage } from 'react-intl';

const progressData = ['Order Received', 'Order On The Way', 'Order Delivered'];


const orderTableColumns = [
  {
    title: <FormattedMessage id="cartItems" defaultMessage="Items" />,
    dataIndex: '',
    key: 'items',
    width: 250,
    ellipsis: true,
    render: (text, record) => {
      return (
        <ItemWrapper>
          <ImageWrapper>
            <img src={record.image} alt={record.title} />
          </ImageWrapper>

          <ItemDetails>
            <ItemName>{record.title}</ItemName>
            <ItemSize>{record.weight}</ItemSize>
            <ItemPrice>${record.price}</ItemPrice>
          </ItemDetails>
        </ItemWrapper>
      );
    },
  },
  {
    title: (
      <FormattedMessage id="intlTableColTitle2" defaultMessage="Quantity" />
    ),
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 100,
  },
  {
    title: <FormattedMessage id="intlTableColTitle3" defaultMessage="Price" />,
    dataIndex: '',
    key: 'price',
    align: 'right',
    width: 100,
    render: (text, record) => {
      return <p>${record.total}</p>;
    },
  },
];

const OrdersContent: React.FC<{}> = () => {

  const [order, setOrder] = useState(null);
  const [active, setActive] = useState('');
  const [targetRef, size] = useComponentSize();
  const orderListHeight = size.height - 79;

  const { data, error, loading } = useQuery(GET_ORDERS);
    useEffect( () => {
      if (data && data.getUserOrders.length !== 0) {
        setOrder(data.getUserOrders[0]);
        setActive(data.getUserOrders[0].id);
      }
    }, [data]);

    if (loading) {
      return <ErrorMessage message={'Loading...'} />
    };

    if (error) {
      return (
        <ErrorMessage message={error.message} />
      );
    };

  const myOrder = data.getUserOrders;

  const handleClick = (order: any) => {
    setOrder(order);
    setActive(order.id);
  };
  return (
    <OrderBox>
      <DesktopView>
        <OrderListWrapper style={{ height: size.height }}>
          <Title style={{ padding: '0 20px' }}>
            <FormattedMessage
              id="intlOrderPageTitle"
              defaultMessage="My Order"
            />
          </Title>

          <Scrollbars
            universal
            autoHide
            autoHeight
            autoHeightMin={420}
            autoHeightMax={isNaN(orderListHeight) ? 500 : orderListHeight}
          >
            <OrderList>
              {myOrder.length !== 0 ? (
                myOrder.map((current: any, index: any) => (
                  <OrderCard
                    key={index}
                    orderId={current.order_code}
                    className={index === active ? 'active' : ''}
                    status={current.status}
                    date={current.datetime.split('2020').shift()}
                    amount={current.total}
                    onClick={() => {
                      handleClick(current);
                    }}
                  />
                ))
              ) : (
                <NoOrderFound>
                  <FormattedMessage
                    id="intlNoOrderFound"
                    defaultMessage="No order found"
                  />
                </NoOrderFound>
              )}
            </OrderList>
          </Scrollbars>
        </OrderListWrapper>

        <OrderDetailsWrapper ref={targetRef}>
          <Title style={{ padding: '0 20px' }}>
            <FormattedMessage
              id="orderDetailsText"
              defaultMessage="Order Details"
            />
          </Title>
          {order &&  (
            <OrderDetails
              id={order.id}
              progressStatus={order.status}
              progressData={progressData}
              number={order.contact_number}
              address={order.delivery_address}
              subtotal={order.sub_total}
              discount={order.discount_amount}
              grandTotal={order.total}
              tableData={order.products}
              columns={orderTableColumns}
              deliveryMethod={order.delivery_method}
            />
          )}
        </OrderDetailsWrapper>
      </DesktopView>

      <MobileView>
        <OrderList>
          <OrderCardMobile
            orders={myOrder}
            className={order && order.id === active ? 'active' : ''}
            progressData={progressData}
            columns={orderTableColumns}
            onClick={() => {
              handleClick(order);
            }}
          />
        </OrderList>
      </MobileView>
    </OrderBox>
  );
};

export default OrdersContent;
