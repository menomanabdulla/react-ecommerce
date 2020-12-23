import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import Popover from 'components/popover/popover';
import { useQuery } from '@apollo/react-hooks';
import Logo from 'layouts/logo/logo';
import { MenuDown } from 'assets/icons/MenuDown';
import { CATEGORY_MENU_ITEMS,CATEGORY_MENU } from 'site-settings/site-navigation';
import { GET_TYPE } from 'graphql/query/type.query';
import ErrorMessage from 'components/error-message/error-message';
import * as categoryMenuIcons from 'assets/icons/category-menu-icons';
import {
  MainMenu,
  MenuItem,
  SelectedItem,
  Icon,
  Arrow,
  LeftMenuBox,
} from './left-menu.style';

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p> </p>;
};

const CategoryMenu = (props: any) => {

  const [typeMenu, setTypeMenu] = useState([]);

  const handleOnClick = (item) => {
    if (item.dynamic) {
      Router.push('/[type]', `${item.href}`);
      props.onClick(item);
      return;
    }
    Router.push(`${item.href}`);
    props.onClick(item);
  };

  useEffect(() => {
    CATEGORY_MENU().then((res) => {
      setTypeMenu(res);
    })
    return;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {typeMenu.map((item) => {
        return(
        <MenuItem key={item.id} {...props} onClick={() => handleOnClick(item)}>
          <CategoryIcon name={item.icon} />
          <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
        </MenuItem>
      )})}
    </div>
  );
};

type Props = {
  logo: string;
};

export const LeftMenu: React.FC<Props> = ({ logo }) => {
  const router = useRouter();
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
  const typeMenu = data.types.items.map((item) => {
    return({
      id: item.id,
      href: `/${item.slug}`,
      defaultMessage: item.name,
      icon: item.icon,
      dynamic: true,
    })
  })
  const initialMenu = typeMenu.find(
    (item) => item.href == router.asPath);
  /*if(initialMenu){
    if(localStorage.getItem('myMenu')){
      localStorage.removeItem('myMenu');
    }
    localStorage.setItem('myMenu', JSON.stringify(initialMenu));
  }*/

  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? CATEGORY_MENU_ITEMS[0]
  );
  
  return(
    <LeftMenuBox>
      <Logo
        imageUrl={logo}
        alt={'Shop Logo'}
        onClick={initialMenu ? initialMenu: CATEGORY_MENU_ITEMS[0]}
      />
      <MainMenu>
        <Popover
          className="right"
          handler={
            <SelectedItem>
              <span>
                <Icon>
                  <CategoryIcon name={activeMenu?.icon} />
                </Icon>
                <span>
                  <FormattedMessage
                    id={activeMenu?.id}
                    defaultMessage={activeMenu?.defaultMessage}
                  />
                </span>
              </span>
              <Arrow>
                <MenuDown />
              </Arrow>
            </SelectedItem>
          }
          content={<CategoryMenu onClick={setActiveMenu} />}
        />
      </MainMenu>
    </LeftMenuBox>
  );
};



/*import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import Popover from 'components/popover/popover';
import { useQuery } from '@apollo/react-hooks';
import Logo from 'layouts/logo/logo';
import { MenuDown } from 'assets/icons/MenuDown';
import { CATEGORY_MENU_ITEMS,CATEGORY_MENU } from 'site-settings/site-navigation';
import { GET_TYPE } from 'graphql/query/type.query';
import ErrorMessage from 'components/error-message/error-message';
import * as categoryMenuIcons from 'assets/icons/category-menu-icons';
import {
  MainMenu,
  MenuItem,
  SelectedItem,
  Icon,
  Arrow,
  LeftMenuBox,
} from './left-menu.style';

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p> </p>;
};

const CategoryMenu = (props: any) => {

  const [typeMenu, setTypeMenu] = useState([]);

  const handleOnClick = (item) => {
    if (item.dynamic) {
      Router.push('/[type]', `${item.href}`);
      props.onClick(item);
      return;
    }
    Router.push(`${item.href}`);
    props.onClick(item);
  };

  useEffect(() => {
    CATEGORY_MENU().then((res) => {
      setTypeMenu(res);
    })
    return;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {typeMenu.map((item) => {
        return(
        <MenuItem key={item.id} {...props} onClick={() => handleOnClick(item)}>
          <CategoryIcon name={item.icon} />
          <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
        </MenuItem>
      )})}
    </div>
  );
};

type Props = {
  logo: string;
};

export const LeftMenu: React.FC<Props> = ({ logo }) => {
  const router = useRouter();
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
  const typeMenu = data.types.items.map((item) => {
    return({
      id: item.id,
      href: `/${item.slug}`,
      defaultMessage: item.name,
      icon: item.icon,
      dynamic: true,
    })
  })
  const initialMenu = router.asPath == '/' ? typeMenu[0] : typeMenu.find((item) => item.href == router.asPath);
  if(initialMenu){
    if(localStorage.getItem('myMenu')){
      localStorage.removeItem('myMenu');
    }
    localStorage.setItem('myMenu', JSON.stringify(initialMenu));
  }

  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? JSON.parse(localStorage.getItem('myMenu'))
  );
  
  return(
    <LeftMenuBox>
      <Logo
        imageUrl={logo}
        alt={'Shop Logo'}
        onClick={initialMenu ? initialMenu: JSON.parse(localStorage.getItem('myMenu'))}
      />
      <MainMenu>
        <Popover
          className="right"
          handler={
            <SelectedItem>
              <span>
                <Icon>
                  <CategoryIcon name={activeMenu?.icon} />
                </Icon>
                <span>
                  <FormattedMessage
                    id={activeMenu?.id}
                    defaultMessage={activeMenu?.defaultMessage}
                  />
                </span>
              </span>
              <Arrow>
                <MenuDown />
              </Arrow>
            </SelectedItem>
          }
          content={<CategoryMenu onClick={setActiveMenu} />}
        />
      </MainMenu>
    </LeftMenuBox>
  );
};
*/