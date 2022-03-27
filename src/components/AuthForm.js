import { authService } from "fb";
import React, { useState } from "react";


const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const { target: { name, value } } = event;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
        // console.log(email, password);
    }

    const onSubmit = async (event) => {
        event.preventDefault(); // 없으면 page가 refresh됨

        let data;
        try {
            if (newAccount) {
                //create account
                data = await authService.createUserWithEmailAndPassword(email, password)
                console.log(data);
            }
            else {
                //login
                data = await authService.signInWithEmailAndPassword(email, password)
                console.log(data);
            }
        } catch (err) {
            setError(err.message)
            setNewAccount(false);
        }
    }

    const toggleAccount = () => {
        setNewAccount(prev => !prev)
    }


    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} className="authInput"></input>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput"></input>
                <input type="submit" className="authInput authSubmit" value={newAccount ? "Sign up" : "Sign in"} />
            </form>
            {error && <span className="authError">{error}</span>}
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign in" : "Sign up"}
            </span>
        </>
    )
};


export default AuthForm;