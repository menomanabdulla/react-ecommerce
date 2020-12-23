import React from 'react';
import Carousel from 'react-multi-carousel';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { ArrowNext } from 'assets/icons/ArrowNext';
import { ArrowPrev } from 'assets/icons/ArrowPrev';
import { useLocale } from 'contexts/language/language.provider';
import { SHOP_IMAGE_HOST } from 'utils/images-path';

const ButtonPrev = styled('button')`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet('colors.white', '#ffffff')};
  color: ${themeGet('colors.primary.regular', '#009E7F')};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet('shadows.base', '0 3px 6px rgba(0, 0, 0, 0.16)')};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonNext = styled('button')`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet('colors.primary.regular', '#009E7F')};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet('shadows.base', '0 3px 6px rgba(0, 0, 0, 0.16)')};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const CardTitle = styled.span`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.sm', '13')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  line-height: 1.2;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

const CardContent = styled.span`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.medium', '#424561')};
`;

const ButtonGroupWrapper = styled('div')``;

const PrevButton = ({ onClick, children }: any) => {
  return (
    <ButtonPrev
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className='prevButton'
    >
      {children}
    </ButtonPrev>
  );
};
const NextButton = ({ onClick, children }: any) => {
  return (
    <ButtonNext
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className='nextButton'
    >
      {children}
    </ButtonNext>
  );
};

const ButtonGroup = ({ next, previous }: any) => {
  const { isRtl }: any = useLocale();

  return (
    <ButtonGroupWrapper>
      {isRtl ? (
        <>
          <NextButton onClick={() => next()} className='rtl'>
            <ArrowPrev />
          </NextButton>
          <PrevButton onClick={() => previous()}>
            <ArrowNext />
          </PrevButton>
        </>
      ) : (
        <>
          <PrevButton onClick={() => previous()}>
            <ArrowPrev />
          </PrevButton>
          <NextButton onClick={() => next()}>
            <ArrowNext />
          </NextButton>
        </>
      )}

      {/* if prop isRtl true swap prev and next btn */}
    </ButtonGroupWrapper>
  );
};

type Props = {
  data: any[] | undefined;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  props?: any;
  component?: any;
  autoPlay?: boolean;
  infinite?: boolean;
  isRtl?: boolean;
  customLeftArrow?: React.ReactElement;
  customRightArrow?: React.ReactElement;
  itemClass?: string;
};
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function CustomCarousel({
  data,
  deviceType: { mobile, tablet, desktop },
  component,
  autoPlay = false,
  infinite = true,
  customLeftArrow,
  customRightArrow,
  itemClass,
  isRtl,
  ...props
}: Props) {
  return (
    <div dir='ltr'>
      <Carousel
        arrows={false}
        responsive={responsive}
        showDots={false}
        slidesToSlide={1}
        infinite={infinite}
        containerClass='container-with-dots'
        itemClass={itemClass}
        autoPlay={autoPlay}
        autoPlaySpeed={3000}
        renderButtonGroupOutside={true}
        additionalTransfrom={0}
        {...props}
        // use dir ltr when rtl true
      >
        {data.map((item: any, index: number) => {
          if (component) return component(item);
          return (
            <div style={{ padding: '0 15px', overflow: 'hidden' }} key={index}>
                <img
                  key={item.id}
                  src={SHOP_IMAGE_HOST+item.image}
                  alt={item.details}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    position: 'relative',
                  }}
                />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
