import React from 'react';
export const STATUS = {
  toSignIn: 1,
  toSignOut: 2,
  toSignUp: 0,
};
// export const USERID = '';

export const AuthContext = React.createContext({
    status: STATUS.toSignIn,setStatus:(newStatus)=>{this.status=newStatus},
    // user: USERID,setuser:(newUser)=>{this.status=newUser}
  })

/*
status及setStatus在provider會被覆蓋
status為toSignIn 已註冊，將要登入
status為toSignOut 已登入，將要登出  
status為toSignUp 未註冊，將要註冊  
*/