import { Route } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import Board from './Board';
import Register from './Register';
import Login from './Login';
import Post from './Post';
import Detail from './Detail';
import Mypage from './Mypage';
import Header from './Header';

function App(){

  const [isLogin, setIsLogin] = useState(false)
 
  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }

  }, [])

  return (
    <div class ="App">
      <Header isLogin={isLogin}></Header>

      <Route exact path="/">           
        <Board/>
      </Route>

      <Route path="/detail/:idpost">
        <Detail />
      </Route>

      <Route path ="/register">
         <Register />
      </Route>

      <Route path ="/login">
         <Login/>
      </Route>

      <Route path ="/post">
         <Post />
      </Route>

      <Route path ="/mypage">
         <Mypage />
      </Route>

    </div>
  )
}

export default App;