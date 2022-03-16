import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fb";
import React from "react";

// export default () => <span>Auth</span>
const Auth = () => {
    const onSocialClick = async (event) => {
        const { target: { name, value } } = event;
        let provider;

        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        // console.log(data);
    }


    return ( // 위와 같이 사용 가능하지만, 이렇게 하면 자동 import 됨
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;