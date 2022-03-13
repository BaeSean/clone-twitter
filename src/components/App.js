import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fb";
// import { Route } from "react-router-dom";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} Sean</footer>
    </>
  );
}
 
export default App;
