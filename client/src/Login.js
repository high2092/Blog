import './Login.css';

function Login() {
  return (
    <form className="container">
      <input type="text" placeholder="아이디"></input>
      <input type="password" placeholder="비밀번호"></input>
      <button type="submit">로그인</button>
    </form>
  );
}

export default Login;