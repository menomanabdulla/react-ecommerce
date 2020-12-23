import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Button } from 'components/button/button';
import RadioCard from 'components/radio-card/radio-card';
import RadioGroup from 'components/radio-group/radio-group';
import RadioGroupTwo from 'components/radio-group/radio-group-two';
import RadioGroupThree from 'components/radio-group/radio-group-three';
import RadioCardTWO from 'components/radio-card/radio-card-two';
import PaymentGroup from 'components/payment-group/payment-group';
import UpdateAddress from 'components/address-card/address-card';
import UpdateContact from 'components/contact-card/contact-card';
import StripePaymentForm from 'features/payment/stripe-form';
import { DELETE_ADDRESS, SETPRIMARY_ADDRESS } from 'graphql/mutation/address';
import { DELETE_PHONENUMBER, SETPRIMARY_PHONENUMBER } from 'graphql/mutation/phone';
import { CREAT_ORDER } from 'graphql/mutation/order';
import { GET_COUPON } from 'graphql/query/coupon';
import { DELIVERY_METHOD } from 'graphql/query/delivery';
import { DELETE_CARD } from 'graphql/mutation/card';
import { DELETE_CONTACT } from 'graphql/mutation/contact';
import { CURRENCY } from 'utils/constant';
import { openModal } from '@redq/reuse-modal';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Scrollbars } from 'react-custom-scrollbars';
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  Heading,
  ButtonGroup,
  CheckoutSubmit,
  HaveCoupon,
  CouponBoxWrapper,
  CouponInputBox,
  // Input,
  CouponCode,
  RemoveCoupon,
  ErrorMsg,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text,
  Bold,
  Small,
  NoProductMsg,
  NoProductImg,
  IconWrapper,
} from './checkout-two.style';
import CouponBox from 'components/coupon-box/coupon-box';

import { Plus } from 'assets/icons/PlusMinus';
import { NoCartBag } from 'assets/icons/NoCartBag';

import Sticky from 'react-stickynode';
import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import { APPLY_COUPON } from 'graphql/mutation/coupon';
import { useLocale } from 'contexts/language/language.provider';
import { useWindowSize } from 'utils/useWindowSize';


import UpdateAddressTwo from 'components/address-card/address-card-two';


// The type of props Checkout Form receives
interface MyFormProps {
  token: string;
  deviceType: any;
}

type CartItemProps = {
  product: any;
};

const OrderItem: React.FC<CartItemProps> = ({ product }) => {
  const { id, quantity, title, name, unit, price, salePrice } = product;
  const displayPrice = salePrice ? salePrice : price;

  return (
    <Items key={id}>
      <Quantity>{quantity}</Quantity>
      <Multiplier>x</Multiplier>
      <ItemInfo>
        {name ? name : title} {unit ? `| ${unit}` : ''}
      </ItemInfo>
      <Price>
        {CURRENCY}
        {(displayPrice * quantity).toFixed(2)}
      </Price>
    </Items>
  );
};

const CheckoutWithSidebar: React.FC<MyFormProps> = ({ token, deviceType }) => {

  const [hasCoupon, setHasCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const { state, dispatch } = useContext(ProfileContext);
  const { isRtl } = useLocale();
  const {
    items,
    removeCoupon,
    coupon,
    applyCoupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
    isRestaurant,
    toggleRestaurant,
  } = useCart();


  let cartProduct= null;

  if(items.length>0){
    cartProduct = items.map((item: any, index:any) =>({
      product_id: item.id,
      unit: item.unit,
      quantity: Number(item.quantity),
      price: item.sale_price
    }))
  }
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [submitResult, setSubmitResult] = useState({
    contact_number: '',
    payment_option_id: '',
    delivery_method_id: '',
    coupon_code: '',
    delivery_address: null,
    products: null
 });

  const {    
    delivery_address, 
    contact, 
    paymentMethods, 
    phones,
    name,
    email,
    id,
    deliveryMethods
  } = state;


  //set mututions
  const [setprimaryAddressMutation] = useMutation(SETPRIMARY_ADDRESS);
  const [deleteAddressMutation] = useMutation(DELETE_ADDRESS);
  const [setprimaryPhoneNumberMutation] = useMutation(SETPRIMARY_PHONENUMBER);
  const [deletePhoneNumberMutation] = useMutation(DELETE_PHONENUMBER);
  
  const [setOrderMutation] = useMutation(CREAT_ORDER);

  const [deleteContactMutation] = useMutation(DELETE_CONTACT);
  const [deletePaymentCardMutation] = useMutation(DELETE_CARD);
  const size = useWindowSize();

  const [appliedCoupon] = useMutation(GET_COUPON);

  const selectedAddress = delivery_address.find(
    (item) => item.is_primary === true
  );
  const selectedContact= phones.find(
    (item) => item.is_primary === true
  );
  

  useEffect(() => {
    removeCoupon();
    setHasCoupon(false);
    setSubmitResult({
      ...submitResult,
      delivery_address:  `Title: ${selectedAddress.title}, 
      District: ${selectedAddress.district},  
      Division: ${selectedAddress.division},  
      Region: ${selectedAddress.region},  
      Division: ${selectedAddress.address}
      `,
      products: cartProduct,
      contact_number: selectedContact.number
    })
    if (
      calculatePrice() > 0 &&
      cartItemsCount > 0 &&
      delivery_address.length &&
      phones.length &&
      paymentMethods.length &&
      deliveryMethods.length
    ) {
      setIsValid(true);
    }
  }, [state]);
  // Add or edit modal
  const handleModal = (
    modalComponent: any,
    modalProps = {},
    className: string = 'add-address-modal'
  ) => {
    openModal({
      show: true,
      config: {
        width: 360,
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        className: className,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: { item: modalProps },
    });
  };

  const handleEditDelete = async (item: any, index: any, type: string, name: string) => {
    if (type === 'edit') {
      const modalComponent = name === 'address' ? UpdateAddressTwo : UpdateContact;
      handleModal(modalComponent,{
        item,
        id
      });
    } else {
      switch (name) {
       /* case 'payment':
          dispatch({ type: 'DELETE_CARD', payload: item.id });
          return await deletePaymentCardMutation({
            variables: { cardId: JSON.stringify(item.id) },
          });
        */
        case 'contact':
          if(phones.length > 1){
            dispatch({ type: 'DELETE_CONTACT', payload: item.id });
            return await deletePhoneNumberMutation({
              variables: { 
                id,
                phoneId: item.id
              },
            });
          }else{
            return null
          }
        case 'address':
          if(delivery_address.length > 1){
          dispatch({ type: 'DELETE_ADDRESS', payload: item.id });
            return await deleteAddressMutation({
              variables: { 
                id,
                addressId: item.id
              },
            });
          }else{
            return null
          }
        default:
          return false;
      }
    }
  };

  const handlePrimary = async (item: any, name: string) => {
    switch (name) {
      case 'contact':
        dispatch({ type: 'SET_PRIMARY_CONTACT', payload: item.id });
        return await setprimaryPhoneNumberMutation({
          variables: { 
            id,
            phoneId: item.id
          },
        });
      case 'address':
        dispatch({ type: 'SET_PRIMARY_ADDRESS', payload: item.id });
          return await setprimaryAddressMutation({
            variables: { 
              id,
              addressId: item.id
            },
          });
      default:
        return false;
    }
  };

  const handleApplyCoupon = async () => {

    if(!couponCode){
      setError('Invalid Coupon');
      return null;
    }

    const { data, errors }: any = await appliedCoupon({
      variables: { code: couponCode },
    });

    if(!data.getCoupon.coupon && data.getCoupon.message && !data.getCoupon.message.status){
      setError('Invalid Coupon');
      return null;
    }

    if(errors){
      setError('Invalid Coupon');
      return null;
    }

    if (data.getCoupon.coupon && data.getCoupon.coupon.percentage) {
      applyCoupon(data.getCoupon.coupon);
      setSubmitResult({
        ...submitResult,
        coupon_code: couponCode,
        products: cartProduct
      });

      setCouponCode('');
    } else {
      setError('Invalid Coupon');
    }
  };
  const handleOnUpdate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCouponCode(e.currentTarget.value);
  };

  const handleSubmit = async () => {


    const otherSubmitResult = {
      customer_id: id,
      sub_total: Number(calculateSubTotalPrice()),
      total: Number(calculatePrice()),
      discount_amount: Number(calculateDiscount()),
    }

    const {
      contact_number,
      payment_option_id,
      delivery_method_id,
      delivery_address,
      coupon_code,
      products
    } = submitResult;

    const {
      customer_id,
      sub_total,
      total,
      discount_amount
    } = otherSubmitResult;

    console.log('total = ',typeof(total))
    console.log('sub_total = ', typeof(sub_total))
    console.log('discount_amount = ', typeof(discount_amount))
    console.log('product-price = ', products)

    if(
      !customer_id || 
      !contact_number || 
      !delivery_address || 
      !delivery_method_id ||  
      !payment_option_id ||
      !products
    ){
      setCheckoutError('Please place a valid order!');
      return null;
    }
    

    await setOrderMutation({
      variables: {input:{ 
        customer_id,
        contact_number,
        payment_option_id,
        delivery_method_id,
        delivery_address,
        sub_total,
        total,
        coupon_code,
        discount_amount,
        products
      }}
    });

   setLoading(true);
    if (isValid) {
      clearCart();
      removeCoupon();
      setHasCoupon(false);
      Router.push('/profile');
    }
    setLoading(false);
    setIsValid(false);

  };

  return (
    <form>
      <CheckoutWrapper>
        <CheckoutContainer>
          <CheckoutInformation>
            {/* DeliveryAddress */}
            <InformationBox>
              <Heading>
                <FormattedMessage
                  id='checkoutDeliveryAddress'
                  defaultMessage='Delivery Address'
                />
              </Heading>
              <ButtonGroup>
                <RadioGroupTwo
                  items={delivery_address}
                    component={(item: any, index: any) => (
                      <RadioCardTWO 
                      id={index}
                      key={index}
                      address={item.address}
                      district={item.district}
                      division={item.division}
                      title={item.title}
                      region = {item.region}
                      name='address'
                      isChecked={item.is_primary === true}
                      onClick={() => setSubmitResult({
                        ...submitResult,
                        delivery_address:  `Title: ${item.title}, 
                        District: ${item.district},  
                        Division: ${item.division},  
                        Region: ${item.region},  
                        Division: ${item.address}
                        `,
                        products: cartProduct
                      })}
                      onChange={() =>handlePrimary(item, 'address')}
                      onEdit={() => handleEditDelete(item, index, 'edit', 'address')}
                      onDelete={() =>
                        handleEditDelete(item, index, 'delete', 'address')
                      }
                    />
                  )}
                  secondaryComponent={
                    <Button
                      className='addButton'
                      variant='text'
                      type='button'
                      onClick={() =>
                        handleModal(UpdateAddressTwo,
                          {
                            item:{},
                            id
                          },
                          'add-address-modal')
                      }
                    >
                      <IconWrapper>
                        <Plus width='10px' />
                      </IconWrapper>
                      <FormattedMessage id='addNew' defaultMessage='Add New' />
                    </Button>
                  }
                />
              </ButtonGroup>
            </InformationBox>

            {/* DeliverySchedule */}
            <InformationBox>
              <DeliverySchedule>
                <Heading>
                  <FormattedMessage
                    id='deliverySchedule'
                    defaultMessage='Select Your Delivery Schedule'
                  />
                </Heading>
                <RadioGroupTwo
                  items={deliveryMethods}
                  component={(item: any, index: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.name}
                      content={item.details}
                      name='schedule'
                      checked={item.type === 'primary'}
                      withActionButtons={false}
                      onClick={() => setSubmitResult({
                        ...submitResult,
                        delivery_method_id: item.id, 
                        products: cartProduct
                      })}
                      onChange={() =>{
                        return(dispatch({
                          type: 'SET_PRIMARY_SCHEDULE',
                          payload: item.id.toString(),
                        }))
                        }
                      }
                    />
                  )}
                />
              </DeliverySchedule>
            </InformationBox>

            {/* Contact number */}
            <InformationBox>
              <Heading>
                <FormattedMessage
                  id='contactNumberText'
                  defaultMessage='Select Your Contact Number'
                />
              </Heading>
              <ButtonGroup>
                <RadioGroupThree
                  items={phones}
                  component={(item: any, index: any ) => (
                    <RadioCard
                      id={index}
                      key={index}
                      title={item.is_primary?'Primary' : 'Secondary'}
                      content={item.number}
                      checked={item.is_primary === true}
                      onChange={() =>handlePrimary(item, 'contact')}
                      onClick={() => setSubmitResult({
                        ...submitResult,
                        contact_number: item.number,
                        products: cartProduct
                      })}
                      name='contact'
                      onEdit={() => handleEditDelete(item, index, 'edit', 'contact')}
                      onDelete={() =>
                        handleEditDelete(item, index, 'delete', 'contact')
                      }
                    />
                  )}
                  secondaryComponent={
                    <Button
                      className='addButton'
                      variant='text'
                      type='button'
                      onClick={() =>
                        handleModal(
                          UpdateContact, 
                          {
                           item:{},
                           id
                         }, 
                         'add-contact-modal'
                         )
                      }
                    >
                      <IconWrapper>
                        <Plus width='10px' />
                      </IconWrapper>
                      <FormattedMessage
                        id='addContactBtn'
                        defaultMessage='Add Contact'
                      />
                    </Button>
                  }
                />
              </ButtonGroup>
            </InformationBox>
            {/* PaymentOption */}

            <InformationBox
              className='paymentBox'
              style={{ paddingBottom: 30 }}
            >
              <Heading>
                <FormattedMessage
                  id='selectPaymentText'
                  defaultMessage='Select Payment Option'
                />
              </Heading>
              <PaymentGroup
                name='payment'
                deviceType={deviceType}
                items={paymentMethods}
                onEditDeleteField={(item: any, type: string) =>  null }
                onClick={(item: any) => {
                   setSubmitResult({
                    ...submitResult,
                    payment_option_id: item.id,
                    products: cartProduct
                  })
                  return null
                  }
                }
                onChange={(item: any) =>{
                  return(dispatch({
                    type: 'SET_PRIMARY_CARD',
                    payload: item.id.toString(),
                  }))
                  }
                }
                handleAddNewCard={() => null }
              />

              {/* Coupon start */}
              {coupon ? (
                <CouponBoxWrapper>
                  <CouponCode>
                    <FormattedMessage id='couponApplied' />
                    <span>{coupon.code}</span>

                    <RemoveCoupon
                      onClick={(e) => {
                        e.preventDefault();
                        removeCoupon();
                        setHasCoupon(false);
                      }}
                    >
                      <FormattedMessage id='removeCoupon' />
                    </RemoveCoupon>
                  </CouponCode>
                </CouponBoxWrapper>
              ) : (
                <CouponBoxWrapper>
                  {!hasCoupon ? (
                    <HaveCoupon onClick={() => setHasCoupon((prev) => !prev)}>
                      <FormattedMessage
                        id='specialCode'
                        defaultMessage='Have a special code?'
                      />
                    </HaveCoupon>
                  ) : (
                    <>
                      <CouponInputBox>
                        <CouponBox
                          onClick={handleApplyCoupon}
                          value={couponCode}
                          onChange={handleOnUpdate}
                          className='normalCoupon'
                        />
                      </CouponInputBox>

                      {couponError && (
                        <ErrorMsg>
                          <FormattedMessage
                            id='couponError'
                            defaultMessage={couponError}
                          />
                        </ErrorMsg>
                      )}
                    </>
                  )}
                </CouponBoxWrapper>
              )}

              <TermConditionText>
                <FormattedMessage
                  id='termAndConditionHelper'
                  defaultMessage='By making this purchase you agree to our'
                />
                <Link href='#'>
                  <TermConditionLink>
                    <FormattedMessage
                      id='termAndCondition'
                      defaultMessage='terms and conditions.'
                    />
                  </TermConditionLink>
                </Link>
              </TermConditionText>

              {/* CheckoutSubmit */}
              <CheckoutSubmit>
                {/* <Button
                  onClick={handleSubmit}
                  type='button'
                  disabled={!isValid}
                  title='Proceed to Checkout'
                  intlButtonId='proceesCheckout'
                  loader={<Loader />}
                  isLoading={loading}
                /> */}

                <Button
                  type='button'
                  onClick={handleSubmit}
                  disabled={!isValid}
                  size='big'
                  loading={loading}
                  style={{ width: '100%' }}
                >
                  <FormattedMessage
                    id='processCheckout'
                    defaultMessage='Proceed to Checkout'
                  />
                </Button>
              </CheckoutSubmit>
              {checkoutError && (
                <ErrorMsg>
                  <FormattedMessage
                    id='checkoutError'
                    defaultMessage={checkoutError}
                  />
                </ErrorMsg>
              )}
            </InformationBox>
          </CheckoutInformation>

          <CartWrapper>
            {/* <Sticky enabled={true} top={totalHeight} innerZ={999}> */}
            <Sticky
              enabled={size.width >= 768 ? true : false}
              top={120}
              innerZ={999}
            >
              <OrderInfo>
                <Title>
                  <FormattedMessage
                    id='cartTitle'
                    defaultMessage='Your Orderdfd'
                  />
                </Title>

                <Scrollbars
                  universal
                  autoHide
                  autoHeight
                  autoHeightMax='390px'
                  renderView={(props) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        marginLeft: isRtl ? props.style.marginRight : 0,
                        marginRight: isRtl ? 0 : props.style.marginRight,
                        paddingLeft: isRtl ? 15 : 0,
                        paddingRight: isRtl ? 0 : 15,
                      }}
                    />
                  )}
                >
                  <ItemsWrapper>
                    {cartItemsCount > 0 ? (
                      items.map((item) => (
                        <OrderItem key={`cartItem-${item.id}`} product={item} />
                      ))
                    ) : (
                      <>
                        <NoProductImg>
                          <NoCartBag />
                        </NoProductImg>

                        <NoProductMsg>
                          <FormattedMessage
                            id='noProductFound'
                            defaultMessage='No products found'
                          />
                        </NoProductMsg>
                      </>
                    )}
                  </ItemsWrapper>
                </Scrollbars>

                <CalculationWrapper>
                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='subTotal'
                        defaultMessage='Subtotal'
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculateSubTotalPrice()}
                    </Text>
                  </TextWrapper>

                 {/* <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='intlOrderDetailsDelivery'
                        defaultMessage='Delivery Fee'
                      />
                    </Text>
                    <Text>{CURRENCY}0.00</Text>
                  </TextWrapper>*/}

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='discountText'
                        defaultMessage='Discount'
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculateDiscount()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper style={{ marginTop: 20 }}>
                    <Bold>
                      <FormattedMessage id='totalText' defaultMessage='Total' />{' '}
                    </Bold>
                    <Bold>
                      {CURRENCY}
                      {calculatePrice()}
                    </Bold>
                  </TextWrapper>
                </CalculationWrapper>
              </OrderInfo>
            </Sticky>
          </CartWrapper>
        </CheckoutContainer>
      </CheckoutWrapper>
    </form>
  );
};

export default CheckoutWithSidebar;
