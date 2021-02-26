import style from './Login.module.css';

console.log(style);

function Login() {
  return (
    <form className={style.container}>
      <input className={style.input} type="text" placeholder="아이디"></input>
      <input className={style.input} type="password" placeholder="비밀번호"></input>
      <button className={style.button} type="submit">로그인</button>
    </form>
  );
}

export default Login;