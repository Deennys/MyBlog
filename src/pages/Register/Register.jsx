import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Register.module.css";

import { useState, useEffect } from "react";

export default function Register() {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    const {createUser, error: authError, loading} = useAuthentication();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        const user = {
            displayName,
            email,
            password
        }

        if(password !== confirmPassword) {
            setError('passwords need to be the same')
            return
        }

        const res = await createUser(user);

        console.log(user);

    }

    useEffect(() => {
        if(authError) {
            setError(authError)
        }
    }, [authError])

  return (
    <div className={styles.register}>
        <h1>Sign up to post</h1>
        <p>Create your account to share your stories</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Name:</span>
                <input type="text" name="displayName" required placeholder="User Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
            </label>
            <label>
                <span>Email:</span>
                <input type="email" name="email" required placeholder="User Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Password:</span>
                <input type="password" name="password" required placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label>
                <span>Confirm password:</span>
                <input type="password" name="confirmPassword" required placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
            <button className="btn" disabled={loading}>{loading ? 'Wait...' : 'Register'}</button>
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}
