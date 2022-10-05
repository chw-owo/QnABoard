import { Route } from 'react-router-dom';
import { useEffect} from 'react'
import { useRecoilState } from 'recoil';
import { isLoginState } from "./atoms";
import Board from './Components/Board';
import Register from './Components/Register';
import Login from './Components/Login';
import Post from './Components/Post';
import Detail from './Components/Detail';
import Mypage from './Components/Mypage';
import Header from './Components/Header';

function App(){

  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
 
  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }

  }, [setIsLogin])

  return (
    <div className ="App">
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