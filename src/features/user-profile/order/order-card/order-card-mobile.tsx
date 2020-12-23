import React from 'react';
import Table from 'rc-table';
import Collapse, { Panel } from 'rc-collapse';
import ReactToPrint from "react-to-print";
import Progress from 'components/progress-box/progress-box';

import {
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
  CardWrapper,
  OrderDetail,
  DeliveryInfo,
  DeliveryAddress,
  Address,
  Contact,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTable,
  OrderTableMobile,
} from './order-card.style';

import { CURRENCY } from 'utils/constant';

type MobileOrderCardProps = {
  orderId?: any;
  onClick?: (e: any) => void;
  className?: any;
  status?: any;
  date?: any;
  deliveryTime?: any;
  amount?: number;
  tableData?: any;
  columns?: any;
  progressData?: any;
  progressStatus?: any;
  address?: string;
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  grandTotal?: number;
  orders?: any;
};

const components = {
  table: OrderTable,
};

const OrderCard: React.FC<MobileOrderCardProps> = ({
  onClick,
  className,
  columns,
  progressData,
  orders,
}) => {
  //   const displayDetail = className === 'active' ? '100%' : '0';
  const addAllClasses: string[] = ['accordion'];

  if (className) {
    addAllClasses.push(className);
  }
  return (
    <>
      <Collapse
        accordion={true}
        className={addAllClasses.join(' ')}
        defaultActiveKey="active"
        expandIcon={() => {}}
      >
        {orders.map((order: any) => (
          <Panel
            header={
              <CardWrapper onClick={onClick}>
                <OrderListHeader>
                  <TrackID>
                    Order <span>#{order.id}</span>
                  </TrackID>
                  <Status>{progressData[order.status - 1]}</Status>
                </OrderListHeader>

                <OrderMeta>
                  <Meta>
                    Order Date: <span>{order.date}</span>
                  </Meta>
                  <Meta>
                    Delivery Time: <span>{order.deliveryTime}</span>
                  </Meta>
                  <Meta className="price">
                    Total Price:
                    <span>
                      {CURRENCY}
                      {order.amount}
                    </span>
                  </Meta>
                </OrderMeta>
              </CardWrapper>
            }
            headerClass="accordion-title"
            key={order.id}
          >
            <OrderDetail>
              <DeliveryInfo>
                <DeliveryAddress>
                  <h3>Contact Number</h3>
                  <Contact>{order.contact_number}</Contact>
                </DeliveryAddress>
                <DeliveryAddress>
                  <h3>Delivery Address</h3>
                  <Address>{order.delivery_address}</Address>
                </DeliveryAddress>
                <CostCalculation>
                  <PriceRow>
                    Subtotal
                    <Price>
                      {CURRENCY}
                      {order.sub_total}
                    </Price>
                  </PriceRow>
                  <PriceRow>
                    Discount
                    <Price>
                      {CURRENCY}
                      {order.discount}
                    </Price>
                  </PriceRow>
                  <PriceRow className="grandTotal">
                    Total
                    <Price>
                      {CURRENCY}
                      {order.total}
                    </Price>
                  </PriceRow>
                </CostCalculation>
              </DeliveryInfo>

              {/*<ProgressWrapper>
                <Progress data={progressData} status={order.status} />
              </ProgressWrapper>

              <OrderTableMobile>
                <Table
                  columns={columns}
                  data={order.products}
                  rowKey={(record) => record.id}
                  components={components}
                  scroll={{ x: 450 }}
                  // scroll={{ y: 250 }}
                />
              </OrderTableMobile>*/}
            </OrderDetail>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default OrderCard;
