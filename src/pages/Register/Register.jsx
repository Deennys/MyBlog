import styles from "./Register.module.css";

import { useState, useEffect } from "react";

export default function Register() {
  return (
    <div>
        <h1>Sign up to post</h1>
        <p>Create your account to share your stories</p>
        <form action="">
            <label>
                <span>Name:</span>
                <input type="text" name="displayName" required placeholder="User Name" />
            </label>
            <label>
                <span>Email:</span>
                <input type="email" name="email" required placeholder="User Email" />
            </label>
            <label>
                <span>Password:</span>
                <input type="password" name="password" required placeholder="password" />
            </label>
            <label>
                <span>Confirm password:</span>
                <input type="password" name="confirmPassword" required placeholder="Confirm your password" />
            </label>
            <button className="btn">Register</button>
        </form>
    </div>
  )
}
