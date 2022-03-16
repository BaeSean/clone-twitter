import { authService, firebaseInstance } from "fb";
import React, { useState } from "react";

// export default () => <span>Auth</span>
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
    
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
        // console.log(email, password);
    }

    const onSubmit = async(event) => {
        event.preventDefault(); // 없으면 page가 refresh됨

        let data;
        try{
            if(newAccount){
                //create account
               data = await authService.createUserWithEmailAndPassword(email, password)
               console.log(data);
            }
            else{
                //login
               data = await authService.signInWithEmailAndPassword(email, password)
               console.log(data);
            }
        }catch(err){
            setError(err.message)
            setNewAccount(false);
        }
    }

    const toggleAccount = () => {
        setNewAccount(prev => !prev)
    }
    const onSocialClick = async (event) => {
        const {target: {name, value}} = event;
        let provider;

        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        
        const data = await authService.signInWithPopup(provider);
        // console.log(data);
    }

    return ( // 위와 같이 사용 가능하지만, 이렇게 하면 자동 import 됨
        <div>   
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}></input>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}></input>
                <input type="submit" value={newAccount ? "Sign up" : "Sign in"} />
            </form>
            
            {error}
            <span onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Sign up"}
            </span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;