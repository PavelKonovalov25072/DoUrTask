import {React, useState} from 'react';
import './styles/header.css';
import SvgFilterIcon from 'components/svg/SvgFilterIcon';
import SvgLogoutIcon from 'components/svg/SvgLogoutIcon';
import { getUserMail } from 'middleware/TaskPage';
import { LogOut, unauthPage } from 'middleware/UnauthPage';

const Header = () => {
    const [isLogined, setIsLogined] = useState(true);
    const Logout = () => {
        LogOut();
        setIsLogined(false);
    }


    if (!isLogined) return unauthPage();
    return (
        <div className='header'>
            <div className='header__text'>DoUrTask</div>
            <div className="header__profile">
                <div className='header__profile__mail'>{getUserMail()}</div>
                <button className="header__profile__logout" onClick={Logout}>
                    <SvgLogoutIcon/>
                </button>
            </div>
            {/* <SvgFilterIcon className='header__filter-icon'/> */}
        </div>
    );
};

export default Header;