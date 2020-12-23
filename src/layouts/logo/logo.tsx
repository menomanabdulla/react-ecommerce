import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { GET_SETTING } from 'graphql/query/site.settings.query'
import { LogoBox, LogoImage } from './logo.style';
import { initialState } from 'contexts/app/app.reducer';
import { SHOP_IMAGE_HOST } from 'utils/images-path';
type LogoProps = {
  imageUrl: string;
  alt: string;
  onClick?: () => void;
};

const Logo: React.FC<LogoProps> = ({ refs, imageUrl, alt, onClick }: any) => {
  const {data, error, loading} = useQuery(GET_SETTING);

  const [ siteSettingData, setSiteSettingData ] = useState<any | null>(initialState);

  useEffect( () => {
    if(data){
      setSiteSettingData(JSON.parse(data.getSiteSetting.value))
    }
  }, [data])

  function onLogoClick() {
    Router.push('/[type]', `${onClick.href}`);
    return;
  }
  return (
    <LogoBox onClick={onLogoClick} ref={refs}>
      {loading && <span>logo here</span> }
      {data &&<LogoImage src={siteSettingData ? SHOP_IMAGE_HOST+siteSettingData.image : imageUrl } alt={alt} />}
    </LogoBox>
  );
};

export default Logo;
