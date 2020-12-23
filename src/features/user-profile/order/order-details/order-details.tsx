import React from 'react';
import Table from 'rc-table';
import Link from 'next/link';
import Router from 'next/router';
import {
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  Contact,
  ProgressWrapper,
  OrderTableWrapper,
  OrderTable,
  StyledLink
} from './order-details.style';
import Progress from 'components/progress-box/progress-box';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';

type OrderDetailsProps = {
  id?: any;
  tableData?: any;
  columns?: any;
  progressData?: any;
  progressStatus?: any;
  address?: string;
  number?: string;
  subtotal?: number;
  discount?: number;
  grandTotal?: number;
  ref?: any;
  deliveryMethod?: any;
};

const components = {
  table: OrderTable,
};

const OrderDetails: React.FC<OrderDetailsProps> = ({
  tableData,
  columns,
  address,
  number,
  id,
  progressStatus,
  progressData,
  subtotal,
  discount,
  grandTotal,
  deliveryMethod,
  ref
}) => {

  const handleInvocie = () => {
    Router.push({
      pathname: '/order-received',
      query: { itemId: id }
    })
    return false
  }

  return (
    <>
      <DeliveryInfo>
        <DeliveryAddress>
          <h3>
            <FormattedMessage
              id="deliveryAddressTitle"
              defaultMessage="Delivery Method"
            />
          </h3>
          <Contact>{deliveryMethod.name}</Contact>
          <h3>
            <FormattedMessage
              id="deliveryAddressTitle"
              defaultMessage="Contact Number"
            />
          </h3>
          <Contact>{number}</Contact>
          <h3>
            <FormattedMessage
              id="deliveryAddressTitle"
              defaultMessage="Delivery Address"
            />
          </h3>
          <Address>{address}</Address>
        </DeliveryAddress>

        <CostCalculation>
          <PriceRow>
            <FormattedMessage id="subTotal" defaultMessage="Sub total" />
            <Price>
              {CURRENCY}
              {subtotal}
            </Price>
          </PriceRow>
          <PriceRow>
            <FormattedMessage
              id="intlOrderDetailsDiscount"
              defaultMessage="Discount"
            />
            <Price>
              {CURRENCY}
              {discount !== null ? discount : 0}
            </Price>
          </PriceRow>
          <PriceRow className="grandTotal">
            <FormattedMessage id="totalText" defaultMessage="Total" />
            <Price>
              {CURRENCY}
              {grandTotal}
            </Price>
          </PriceRow>
        </CostCalculation>
      </DeliveryInfo>
      <StyledLink onClick={handleInvocie}>
        Get Invoice
      </StyledLink>
     {/* <ProgressWrapper>
        <Progress data={progressData} status={progressStatus} />
      </ProgressWrapper>

      <OrderTableWrapper>
        <Table
          columns={columns}
          data={tableData}
          rowKey={(record) => record.id}
          components={components}
          className="orderDetailsTable"
          // scroll={{ y: 350 }}
        />
     </OrderTableWrapper>*/}
     </>
  );
};

export default OrderDetails;
