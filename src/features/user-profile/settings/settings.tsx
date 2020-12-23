import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Col } from 'react-styled-flexboxgrid';
import { openModal } from '@redq/reuse-modal';
import Router, { useRouter } from 'next/router';
import RadioCardTWO from 'components/radio-card/radio-card-two';
import RadioCard from 'components/radio-card/radio-card';
import { ProfileContext } from 'contexts/profile/profile.context';
import { AuthContext } from 'contexts/auth/auth.context';
import { DELETE_ADDRESS, SETPRIMARY_ADDRESS } from 'graphql/mutation/address';
import { UPDATE_USER } from 'graphql/mutation/user';
import { CHANGE_PASSWORD } from 'graphql/mutation/changePassword';
import { DELETE_CARD } from 'graphql/mutation/card';
import { DELETE_PHONENUMBER, SETPRIMARY_PHONENUMBER } from 'graphql/mutation/phone';
import StripePaymentForm from 'features/payment/stripe-form';
import {
  SettingsForm,
  SettingsFormContent,
  HeadingSection,
  Title,
  Row,
  ButtonGroup,
  SuccessMsg,
  ErrorMsg
} from './settings.style';
import RadioGroupTwo from 'components/radio-group/radio-group-two';
import RadioGroupThree from 'components/radio-group/radio-group-three';

import PaymentGroup from 'components/payment-group/payment-group';
import UpdateAddressTwo from 'components/address-card/address-card-two';
import UpdateContact from 'components/contact-card/contact-card';
import { Button } from 'components/button/button';
import { Input } from 'components/forms/input';
import { UPDATE_ME } from 'graphql/mutation/me';
import { FormattedMessage } from 'react-intl';
import { Label } from 'components/forms/label';
import { ItemCount } from 'components/cart-popup/cart-popup.style';

type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const SettingsContent: React.FC<SettingsContentProps> = ({ deviceType }) => {
  const { state, dispatch } = useContext(ProfileContext);
  const [userinfoMsg, setUserinfoMsg] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState('');
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);
  const [updateMeMutation] = useMutation(UPDATE_ME);
  const [deletePaymentCardMutation] = useMutation(DELETE_CARD);

  const [updateUserMutation] = useMutation(UPDATE_USER);
  const [changePasswordMutation] = useMutation(CHANGE_PASSWORD);
  const [deletePhoneNumberMutation] = useMutation(DELETE_PHONENUMBER);
  const [setprimaryPhoneNumberMutation] = useMutation(SETPRIMARY_PHONENUMBER);
  const [setprimaryAddressMutation] = useMutation(SETPRIMARY_ADDRESS);
  const [deleteAddressMutation] = useMutation(DELETE_ADDRESS);

 

  const { 
    delivery_address, 
    card,
    name,
    email,
    id,
    phones
  } = state;

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch({
      type: 'HANDLE_ON_INPUT_CHANGE',
      payload: { value, field: name },
    });
  };
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
        case 'payment':
          dispatch({ type: 'DELETE_CARD', payload: item.id });
          return await deletePaymentCardMutation({
            variables: { cardId: JSON.stringify(item.id) },
          });
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

  const handleSave = async () => {
    const { name, email } = state;
    await updateUserMutation({
      variables: {
         id,
         name,
         email
        }
    });
    setUserinfoMsg('Update user info successfully');
    setTimeout(function () {
      setUserinfoMsg('');
    }, 8000)
  };

  const handleSavePassord = async () => {
    const { oldPassword , newPassword, confirmPassword } = state;
      await changePasswordMutation({
        variables: {
          id,
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword
          }
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        authDispatch({ type: 'SIGN_OUT' });
        Router.push('/');
      }
      setPasswordChangeMsg('Loadding...')
  };


  return (
    <SettingsForm>
      <SettingsFormContent>
        <HeadingSection>
          <Title>
            <FormattedMessage
              id='profilePageTitle'
              defaultMessage='Your Profile'
            />
          </Title>
        </HeadingSection>
        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              <FormattedMessage
                id='profileNameField'
                defaultMessage='Your Name'
              />
            </Label>
            <Input
              type='text'
              label='Name'
              name='name'
              value={name}
              onChange={handleChange}
              backgroundColor='#F7F7F7'
              height='48px'
              // intlInputLabelId="profileNameField"
            />
          </Col>

          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              <FormattedMessage
                id='profileEmailField'
                defaultMessage='Your Email'
              />
            </Label>
            <Input
              type='email'
              name='email'
              label='Email Address'
              value={email}
              onChange={handleChange}
              backgroundColor='#F7F7F7'
              // intlInputLabelId="profileEmailField"
            />
          </Col>

          <Col xs={12} sm={2} md={2} lg={2}>
            <Button size='big' style={{ width: '100%' }} onClick={handleSave}>
              <FormattedMessage id='profileSaveBtn' defaultMessage='Save' />
            </Button>
          </Col>
          {userinfoMsg && (
              <SuccessMsg>
                <FormattedMessage
                  id='userInfoSuccess'
                  defaultMessage={userinfoMsg}
                />
              </SuccessMsg>
          )}
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SettingsFormContent>
              <HeadingSection>
                <Title>
                  <FormattedMessage
                    id='contactNumberTItle'
                    defaultMessage='Contact Numbers'
                  />
                </Title>
              </HeadingSection>
              <ButtonGroup>
                <RadioGroupThree
                  items={phones}
                  component={(item: any, index: any) => (
                    <RadioCard
                      id={index}
                      key={index}
                      title={item.is_primary?'Primary' : 'Secondary'}
                      content={item.number}
                      checked={item.is_primary === true}
                      onChange={() =>handlePrimary(item, 'contact')}
                      name='contact'
                      onEdit={() => handleEditDelete(item, index, 'edit', 'contact')}
                      onDelete={() =>
                        handleEditDelete(item, index, 'delete', 'contact')
                      }
                    />
                  )}
                  secondaryComponent={
                    <Button
                      size='big'
                      variant='outlined'
                      type='button'
                      className='add-button'
                      onClick={() =>handleModal(
                         UpdateContact, 
                         {
                          item:{},
                          id
                        }, 
                        'add-contact-modal'
                        )
                      }
                    >
                      <FormattedMessage
                        id='addContactBtn'
                        defaultMessage='Add Contact'
                      />
                    </Button>
                  }
                />
              </ButtonGroup>
            </SettingsFormContent>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={{ position: 'relative' }}>
            <SettingsFormContent>
              <HeadingSection>
                <Title>
                  <FormattedMessage
                    id='deliveryAddresTitle'
                    defaultMessage='Delivery Address'
                  />
                </Title>
              </HeadingSection>
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
                      onChange={() =>handlePrimary(item, 'address')}
                      onEdit={() => handleEditDelete(item, index, 'edit', 'address')}
                      onDelete={() =>
                        handleEditDelete(item, index, 'delete', 'address')
                      }
                    />
                  )}
                  
                  secondaryComponent={
                    <Button
                      size='big'
                      variant='outlined'
                      type='button'
                      className='add-button'
                      onClick={() =>handleModal(
                          UpdateAddressTwo, 
                          {
                            item:{},
                            id
                          },
                          'add-address-modal')
                      }
                    >
                      <FormattedMessage
                        id='addAddressBtn' 
                        defaultMessage='Add Address' 
                      />
                    </Button>
                  }
                />
              </ButtonGroup>
            </SettingsFormContent>
          </Col>
        </Row>
        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SettingsFormContent>
              <HeadingSection>
                <Title>
                  <FormattedMessage
                    id='changePasswordTitle'
                    defaultMessage='Change Password'
                  />
                </Title>
              </HeadingSection>
            </SettingsFormContent>
          </Col>
          <Col xs={12} sm={2} md={2} lg={3}>
            <Input
              type='password'
              label='Old Password'
              placeholder='Old Password'
              name='oldPassword'
              value={ state.oldPassword || '' }
              onChange={handleChange}
              backgroundColor='#F7F7F7'
              height='48px'
              // intlInputLabelId="profileNameField"
            />
          </Col>
          <Col xs={12} sm={2} md={2} lg={3}>
            <Input
              type='password'
              label='New Password'
              placeholder='New Password'
              name='newPassword'
              value={ state.newPassword || '' }
              onChange={handleChange}
              backgroundColor='#F7F7F7'
              height='48px'
              // intlInputLabelId="profileNameField"
            />
          </Col>
          <Col xs={12} sm={2} md={2} lg={3}>
            <Input
              type='password'
              name='confirmPassword'
              label='Confirm Password'
              placeholder='Confirm Password'
              value={ state.confirmPassword || '' }
              onChange={handleChange}
              backgroundColor='#F7F7F7'
              // intlInputLabelId="profileEmailField"
            />
          </Col>
          <Col xs={12} sm={2} md={2} lg={3}>
            {!passwordChangeMsg &&
              <Button size='big' style={{ width: '100%' }} onClick={handleSavePassord}>
                <FormattedMessage id='profileSaveBtn' defaultMessage='Save' />
              </Button>
            }
            {passwordChangeMsg &&
              <Button size='big' style={{ width: '100%' }} onClick={handleSavePassord}>
                <FormattedMessage id='profileSaveBtn' defaultMessage='Loading..' />
              </Button>
            }
          </Col>
        </Row>

        {/*<Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SettingsFormContent>
              <HeadingSection>
                <Title>
                  <FormattedMessage
                    id='paymentCardTitle'
                    defaultMessage='Payments Card'
                  />
                </Title>
              </HeadingSection>
              <PaymentGroup
                name='payment'
                deviceType={deviceType}
                items={card}
                onEditDeleteField={(item: any, type: string) =>
                  handleEditDelete(item, type, 'payment')
                }
                onChange={(item: any) =>
                  dispatch({
                    type: 'SET_PRIMARY_CARD',
                    payload: item.id.toString(),
                  })
                }
                handleAddNewCard={() => {
                  handleModal(
                    StripePaymentForm,
                    { buttonText: 'Add Card' },
                    'add-address-modal stripe-modal'
                  );
                }}
              />
            </SettingsFormContent>
          </Col>
        </Row>*/}
      </SettingsFormContent>
    </SettingsForm>
  );
};

export default SettingsContent;
