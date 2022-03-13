import React, { useState } from "react";

// export default () => <span>Auth</span>
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
    
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
        // console.log(email, password);
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return ( // 위와 같이 사용 가능하지만, 이렇게 하면 자동 import 됨
        <div>   
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}></input>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}></input>
                <input type="submit" value="Log in" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;