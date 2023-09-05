import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const {login, error: authError, loading} = useAuthentication();

  async function handleSubmit(e) {
      e.preventDefault();
      setError('');

      const user = {
          email,
          password
      }

      const res = await login(user);

      console.log(user);

  }

  useEffect(() => {
      if(authError) {
          setError(authError)
      }
  }, [authError])
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <p>log in to use the site</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input type="email" name="email" required placeholder="User Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" name="password" required placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="btn" disabled={loading}>{loading ? 'Wait...' : 'Login'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
