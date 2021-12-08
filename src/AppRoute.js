import React, {useState} from 'react';
import './index.css';

import App from './route/App';
import TodoListContent from './route/todoListContent';
import AddTodoList from './route/addtodoList';
import CalendarContent from './route/calendarContent';
import Main from './route/main';


import {HashRouter as Router , Switch , Route} from 'react-router-dom';

import {AuthContext, STATUS} from './route/account/AuthContext';

export default function AppRouter(){
    const [status, setStatus] = useState(STATUS.toSignIn);
    return (
    
        <AuthContext.Provider  value={{status, setStatus}}>
            <Router>
                <Switch>
                    <Route path="/TodoListContent" component={TodoListContent}/>
                    <Route path="/AddTodoList" component={AddTodoList}/>
                    <Route path="/CalendarContent" component={CalendarContent}/>
                    <Route path="/main" component={App}/>
                    <Route path="/" component={Main}/>
                </Switch>
            </Router>
        </AuthContext.Provider>
    
    );
    
    }