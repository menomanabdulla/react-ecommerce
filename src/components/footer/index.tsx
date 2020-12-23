import React from 'react';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import Logo from 'layouts/logo/logo';
import { CATEGORY_MENU_ITEMS } from 'site-settings/site-navigation';

import DelivaryIcon from 'assets/images/footer/onehour.png';
import CashOnDelivaryIcon from 'assets/images/footer/cash-on-delivery.png';
import Bkash from 'assets/images/footer/bkash.png';
import Mastercard from 'assets/images/footer/mastercard.png';
import VIsa from 'assets/images/footer/VIsa.png';
import COD from 'assets/images/footer/COD.png';
import Amex from 'assets/images/footer/Amex.png';
import AppStore from 'assets/images/footer/app_store.jpg';
import GooglePlayStore from 'assets/images/footer/google_play_store.jpg';
import Facebook from 'assets/images/footer/Facebook.jpg';
import Instagram from 'assets/images/footer/Instagram.jpg';
import Twitter from 'assets/images/footer/twitter.jpg';
import Youtube from 'assets/images/footer/Youtube.jpg';
import PhoneIcon from 'assets/images/footer/phone_icon.jpg';

const FooterWrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  padding: 15px 20px;
  .footer{
    &-top{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    &-top-left-block{
      display: flex;
      align-items: center;
      div{
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #615e58;
        +div{
          padding-left: 15px;
        }
      }
      img{
        height: 40px;
        width: 40px;
      }
    }
    &-top-right-block{
      ul{
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        img{
          height: 40px;
          width: 40px;
        }
        .text{
          margin-right: 5px;
        }
      }
     
    }
    &-main{
        display: flex;
        align-items: center;

    }
    &-content-block{
      max-width: 70%;
      padding-right: 10px;
      margin-bottom: 30px;
      border-right: 1px solid #ececec;
    }
    &-logo{
      margin-left: 0;
      display: flex;
      margin-bottom: 15px;
    }
    &-entry{
      font-size: 16px;
      color: #615e58;
      line-height: 26px;
      margin-bottom: 80px;
      font-family: 'Segoe UI',Helvetica,'Droid Sans',Arial,'lucida grande',tahoma,verdana,arial,sans-serif;
    }
    &-widgets{
      display: flex;
      justify-content: space-between;
      width: 85%;
    }
    &-widget{
      width: 25%;
      h4{
        margin-bottom: 7px;
        font-weight: 600;
        color: #615e58;
        border-bottom: 1px solid #ededed;
        font-size: 18px;
        padding-bottom: 10px;
      }
      ul{
        li{
          +li{
            margin-top: 5px;
          }
        }
      }
    }
    &-other{
      text-align: right;
      display: flex;
      flex-direction: column;
      width: calc(100% - 70%);
    }
    &-mobile-apps{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 15px;
      a{
        width: 158px;
        +a{
          margin-left: 30px;
        }
      }
    }
    &-phone{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      h2{
        color: #615e58;
        font-size: 25px;
        font-weight: 700;
        margin-left: 13px;
      }
    }
    &-email{
      font-weight: 300;
      margin-bottom: 15px;
      strong{
        color: #615e58;
        margin-left: 5px;
        font-weight: 700;
      }
    }
    &-social{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      li{
        +li{
          margin-left: 8px;
        }
        img{
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  @media (max-width: 1024px){
    .footer{
      &-content-block{
        margin-right: 15px;
      }
      &-widgets{
        width: 100%;
      }
    }
  }
  @media (max-width: 912px){
    .footer{
      &-main{
        flex-direction: column;
      }
      &-content-block{
        max-width: 100%;
        border-right: none;
        padding-right: 0;
        margin-right: 0;
      }
      &-entry{
        margin-bottom: 45px;
      }
      &-other{
        width: 100%;
        text-align: left;
      }
      &-mobile-apps{
        justify-content: flex-start;
      }
      &-phone{
        justify-content: flex-start;
      }
      &-email{
        justify-content: flex-start;
      }
      &-social{
        justify-content: flex-start;
      }
    }
  }
  @media (max-width: 667px){
    .footer{
      &-top{
        flex-direction: column;
        text-align: left;
        align-items: flex-start;
      }
      &-entry{
        margin-bottom: 20px;
      }
      &-widgets{
        width: 100%;
        flex-direction: column;
      }
      &-widget{
        margin-top: 30px;
        width: 60%
      }
    }
  }
  @media (max-width: 375px){
    .footer{
      &-mobile-apps,
      &-top-left-block{
        flex-direction: column;
      }
      &-mobile-apps{
        justify-content: flex-start;
        align-items: flex-start;
        a+a{
          margin-left: 0;
          margin-top: 20px;
        }
      }
    }
  }
`;

type Props = {
  logo: string;
};


const Footer: React.FC<Props> = ({ logo }) =>{

  const router = useRouter();
  const initialMenu = CATEGORY_MENU_ITEMS.find(
    (item) => item.href === router.asPath
  );
  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? CATEGORY_MENU_ITEMS[0]
  );

  return(
    <FooterWrapper>
        <div className="footer-top">
          <div className="footer-top-left-block">
            <div>
              <img src={DelivaryIcon} alt="" />
              <span>1 hour delivery </span>
            </div>
            <div>
              <img src={CashOnDelivaryIcon} alt="" />
              <span>Cash on delivery </span>
            </div>
          </div>
          <div className="footer-top-right-block">
            <ul>
              <li className="text">Pay with</li>
              <li className="icon"><img src={Amex} alt="" /></li>
              <li className="icon"><img src={Mastercard} alt="" /></li>
              <li className="icon"><img src={VIsa} alt="" /></li>
              <li className="icon"><img src={Bkash} alt="" /></li>
              <li className="icon"><img src={COD} alt="" /></li>
            </ul>
          </div>
        </div>
        <div className="footer-main">
          <div className="footer-content-block">
            <div className="footer-logo">
              <Logo
                imageUrl={logo}
                alt={'Shop Logo'}
                onClick={() => setActiveMenu(CATEGORY_MENU_ITEMS[0])}
              />
            </div>
            <p className="footer-entry">
              Mehadi-Fashion is an online shop in Dhaka, Bangladesh. 
              We believe time is valuable to our fellow Dhaka 
              residents, and that they should not 
              have to waste hours in traffic, brave 
              bad weather and wait in line just to 
              buy basic necessities like eggs! 
              This is why Chaldal delivers everything 
              you need right at your door-step and at 
              no additional cost.
            </p>
            <div className="footer-widgets">
              <div className="footer-widget">
                <h4>Customer Service</h4>
                <ul>
                  <li> 
                    <a href="#">
                    Contact Us
                    </a>
                  </li>
                  <li> 
                    <a href="#">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-widget">
                <h4>About Chaldal</h4>
                <ul>
                  <li> 
                    <a href="#">
                      Privacy Policy
                    </a>
                  </li>
                  <li> 
                    <a href="#">
                      Terms of Use
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-widget">
                <h4>For Business</h4>
                <ul>
                  <li> 
                    <a href="#">
                      Corporate
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-other">
            <div className="footer-mobile-apps">
              <a href="#"><img src={GooglePlayStore} alt="" /></a>
              <a href="#"><img src={AppStore} alt="" /></a>
            </div>
            <div className="footer-phone-email">
              <div className="footer-phone">
                <img src={PhoneIcon} alt="" />
                <h2>0188-1234567</h2>
              </div>
              <p className="footer-email">or email 
                <strong> support@mehadifashion.com</strong>
              </p>
            </div>
            <ul className="footer-social">
              <li>
                <a href=""><img src={Facebook} alt="" /></a>
              </li>
              <li>
                <a href=""><img src={Youtube} alt="" /></a>
              </li>
              <li>
                <a href=""><img src={Twitter} alt="" /></a>
              </li>
              <li>
                <a href=""><img src={Instagram} alt="" /></a>
              </li>
            </ul>
          </div>
        </div>
    </FooterWrapper>
  )
};

export default Footer;
