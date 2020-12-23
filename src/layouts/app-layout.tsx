import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import Sticky from 'react-stickynode';
import { useAppState } from 'contexts/app/app.provider';
import Header from './header/header';
import { LayoutWrapper } from './layout.style';
import { isCategoryPage } from './is-home-page';
import { GET_TYPE } from 'graphql/query/type.query';
import ErrorMessage from 'components/error-message/error-message';
const MobileHeader = dynamic(() => import('./header/mobile-header'), {
  ssr: false,
});

type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  // deviceType: { mobile, tablet, desktop },
  token,
}) => {

  const isSticky = useAppState('isSticky');
  const { pathname, query } = useRouter();
  const type = pathname === '/restaurant' ? 'restaurant' : query.type;

  const newTypeArry = [];
  const { data, error, loading } = useQuery(
    GET_TYPE,
    {
      variables: {
        searchText: ''
      }
    }
  );


  if (loading) {
    return <ErrorMessage message={'Loading...'} />
  };

  if (error) {
    return (
      <ErrorMessage message={error.message} />
    );
  };


  const isHomeHandler = (typedata: any, type: any) =>{
    if(typedata){
      typedata.types.items.map((item: any, index: any) => {
        newTypeArry.push(item.slug)
      })
      if(newTypeArry.includes(`${type}`)){
        return true;
      }else{
        return false;
      }  
    } else{
      return;
    }
  }

 
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader
          className={`${isSticky ? 'sticky' : 'unSticky'} ${
            isHomeHandler(data,type) ? 'home' : ''
          } desktop`}
        />

        <Header
          className={`${isSticky && isHomeHandler(data,type) ? 'sticky' : 'unSticky'} ${
            isHomeHandler(data,type) ? 'home' : ''
          }`}
        />
      </Sticky>
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
