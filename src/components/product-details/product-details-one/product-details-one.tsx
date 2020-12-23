import React, { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { Button } from 'components/button/button';
import LogoImage from 'assets/images/logo.svg';
import {
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  BackButton,
  ProductWeight,
  ProductDescription,
  ButtonText,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  MetaSingle,
  MetaItem,
  RelatedItems,
} from './product-details-one.style';
import { LongArrowLeft } from 'assets/icons/LongArrowLeft';
import { CartIcon } from 'assets/icons/CartIcon';
import ReadMore from 'components/truncate/truncate';
import CarouselWithCustomDots from 'components/multi-carousel/multi-carouselV2';
import Products from 'components/product-grid/product-list/product-list';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from 'components/counter/counter';
import { flex } from 'styled-system';
import Footer from 'components/footer';

const CartPopUp = dynamic(() => import('features/carts/cart-popup-two'), {
  ssr: false,
});


type ProductDetailsProps = {
  product: any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
  product,
  deviceType,
}) => {
  const { isRtl } = useLocale();
  const { addItem, removeItem, isInCart, getItem } = useCart();
  const data = product;
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
  };
  const checkoutStatus = React.useRef(null);
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  return (
    <>
      <ProductDetailsWrapper className="product-card" dir="ltr">
        {!isRtl && (
          <ProductPreview>
            <BackButton>
              <Button
                type="button"
                size="small"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f1f1',
                  color: '#77798c',
                }}
                onClick={Router.back}
              >
                <span style={{ marginRight: "5px" }}>
                <LongArrowLeft />
                </span>
                <FormattedMessage id="backBtn" defaultMessage="Back" />
              </Button>
            </BackButton>

            <CarouselWithCustomDots
              items={product.images}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}

        <ProductInfo dir={isRtl ? 'rtl' : 'ltr'}>
          <ProductTitlePriceWrapper>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductPriceWrapper>
              {product.discountInPercent ? (
                <SalePrice>
                  {CURRENCY}
                  {product.sale_price}
                </SalePrice>
              ) : null}

              <ProductPrice>
                {CURRENCY}
                {product.sale_price ? product.sale_price : product.price}
              </ProductPrice>
            </ProductPriceWrapper>
          </ProductTitlePriceWrapper>

          <ProductWeight>{product.unit}</ProductWeight>
          <ProductDescription>
            <ReadMore character={600}>{product.description}</ReadMore>
          </ProductDescription>

          <ProductCartWrapper style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <ProductCartBtn style={{
            display: 'flex'
          }}>
              {!isInCart(data.id) ? (
                <Button
                  className="cart-button"
                  variant="secondary"
                  borderRadius={100}
                  onClick={handleAddClick}
                >
                  <span style={{
                      marginRight: "10px"
                  }}>
                  <CartIcon />
                  </span>
                  <ButtonText>
                    <FormattedMessage
                      id="addCartButton"
                      defaultMessage="Cart"
                    />
                  </ButtonText>
                </Button>
              ) : (
                <Counter
                  value={getItem(data.id).quantity}
                  onDecrement={handleRemoveClick}
                  onIncrement={handleAddClick}
                />
              )}
            </ProductCartBtn>
            <CartPopUp deviceType={deviceType} />
          </ProductCartWrapper>



          <ProductMeta>
            <MetaSingle>
              {product?.categories?.map((item: any) => (
                <Link
                  href={`/${product.type.slug.toLowerCase()}?category=${item.slug}`}
                  key={`link-${item.id}`}
                >
                  {
                    <a>
                      <MetaItem>{item.name}</MetaItem>
                    </a>
                  }
                </Link>
              ))}
            </MetaSingle>
          </ProductMeta>
        </ProductInfo>

        {isRtl && (
          <ProductPreview>
            <BackButton>
              <Button
                title="Back"
                intlButtonId="backBtn"
                iconPosition="left"
                size="small"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f1f1',
                  color: '#77798c',
                }}
                icon={<LongArrowLeft  />}
                onClick={Router.back}
              />
            </BackButton>

            <CarouselWithCustomDots
              items={product.images}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}
      </ProductDetailsWrapper>
       {/*
      <RelatedItems>
        <h2>
          <FormattedMessage
            id="intlReletedItems"
            defaultMessage="Related Items"
          />
        </h2>
        <Products
          type={product.type.toLowerCase()}
          deviceType={deviceType}
          loadMore={false}
          fetchLimit={10}
        />
      </RelatedItems>
      */}
      <Footer logo={LogoImage} />
    </>
  );
};

export default ProductDetails;
