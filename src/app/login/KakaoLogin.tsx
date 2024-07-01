const Login = () => {
  const REST_API_KEY: string = import.meta.env.REST_API_KEY;
  const REDIRECT_URI: string = import.meta.env.REDIRECT_URI;
  const link: string = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <div>
      <button type="button" onClick={loginHandler}>
        Hello Kakao Login
      </button>
    </div>
  );
};
export default Login;
