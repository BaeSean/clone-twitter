// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


// Your web app's Firebase configuration
const firebaseConfig = { // 다른 파일에 키를 저장했을 경우, REACT_APP 키워드를 사용해야만 사용 가능
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig); 
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth(); // 전체를 export 하는것보다 각 service를 export 하기