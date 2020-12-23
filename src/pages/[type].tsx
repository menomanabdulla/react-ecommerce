import React from 'react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Modal } from '@redq/reuse-modal';
import { useQuery } from '@apollo/react-hooks';
import StoreNav from 'components/store-nav/store-nav';
import Carousel from 'components/carousel/carousel';
import { Banner } from 'components/banner/banner';
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  OfferSection,
  MobileCarouselDropdown,
} from 'assets/styles/pages.style';
// Static Data Import Here
import { siteOffers } from 'site-settings/site-offers';
import { sitePages } from 'site-settings/site-pages';
import { SEO } from 'components/seo';
import { useRefScroll } from 'utils/use-ref-scroll';
import { initializeApollo } from 'utils/apollo';
import { GET_PRODUCTS } from 'graphql/query/products.query';
import { GET_CATEGORIES } from 'graphql/query/category.query';
import { GET_TYPE } from 'graphql/query/type.query';
import { CATEGORY_MENU_ITEMS } from 'site-settings/site-navigation';
import ErrorMessage from 'components/error-message/error-message';
import { SHOP_IMAGE_HOST } from 'utils/images-path';
const Sidebar = dynamic(() => import('layouts/sidebar/sidebar'));
const Products = dynamic(() =>
  import('components/product-grid/product-list/product-list')
);
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});

const CategoryPage: React.FC<any> = ({ deviceType }) => {
  const { query } = useRouter();
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });
  React.useEffect(() => {
    if (query.text || query.category) {
      scroll();
    }
  }, [query.text, query.category]);
  const PAGE_TYPE: any = query.type;
  const page = sitePages[PAGE_TYPE];



  const { data, loading, error } = useQuery(GET_TYPE, {
    variables: { 
      searchText: PAGE_TYPE
     },
  });


  if (loading) {
    return <ErrorMessage message={'Loading...'} />
  };

  if (error) {
    return (
      <ErrorMessage message={error.message} />
    );
  };

  const{ home_title, home_subtitle, image  } = data.types.items[0];

  return (
    <>
      <SEO title={home_title} description={home_subtitle} />

      <Modal>
        <Banner
          intlTitleId={home_title}
          intlDescriptionId={home_subtitle}
          imageUrl={SHOP_IMAGE_HOST+image}
        />
        <MobileCarouselDropdown>
          <StoreNav items={CATEGORY_MENU_ITEMS} />
          <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
        </MobileCarouselDropdown>
        <OfferSection>
          <div style={{ margin: '0 -10px' }}>
            <Carousel deviceType={deviceType} data={siteOffers} />
          </div>
        </OfferSection>
        <MainContentArea>
          <SidebarSection>
            <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
          </SidebarSection>
          <ContentSection>
            <div ref={targetRef}>
              <Products
                type={PAGE_TYPE}
                deviceType={deviceType}
                fetchLimit={20}
              />
            </div>
          </ContentSection>
        </MainContentArea>
        <CartPopUp deviceType={deviceType} />
      </Modal>
    </>
  );
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_PRODUCTS,
    variables: {
      type: params.type,
      offset: 0,
      limit: 20
    },
  });

  await apolloClient.query({
    query: GET_CATEGORIES,
    variables: {
      type: params.type,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
};

export async function getStaticPaths() {

  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: GET_TYPE,
    variables: {
      searchText: ''
    }
  });

  const paths = res.data.types.items.map((item) => {
    return({
      params: { type: item.slug },
    })
  })

  return {
    paths,
    fallback: false,
  };
}

export default CategoryPage;
