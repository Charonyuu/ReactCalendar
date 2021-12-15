import React, {useState, useContext} from 'react';
import {AuthContext, STATUS} from '../route/account/AuthContext';
import '../css/setting.css';

function Setting() {
    const [editable] = useState({editable:false,text:'編輯'})

    
    //Status
    const authContext = useContext(AuthContext);
    const changeStatus = function(){
        authContext.setStatus(STATUS.toSignIn);
    }
    // console.log(authContext.user)
    return (
        <div className='SettingMenu'>
            <div className='editIcon' >{editable.text}</div>
            <div className="logoutIcon" onClick={changeStatus}>登出</div>
        </div>
    );
}

export default Setting;