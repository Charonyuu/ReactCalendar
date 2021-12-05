import React, { useState } from 'react';
import '../css/setting.css';

function Setting(props) {
    const [editable] = useState({editable:false,text:'編輯'})
    return (
        <div className='SettingMenu'>
            <div className='editIcon' >{editable.text}</div>
            <div className="logoutIcon" onClick={()=>props.logout()}>登出</div>
        </div>
    );
}

export default Setting;