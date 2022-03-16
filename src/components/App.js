import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fb";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }
      else {
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }  // react는 state 변화가 있으면 rendering하는데,
     // 큰 Object를 render하는데 어려워서 object 크기를 줄여줘야함
     // (Whole object를 가져오지말고 custom해서 가져오기)
     // or 새로운 object를 생성(empty add user)

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
    </>
  );
}

export default App;
