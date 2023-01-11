import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { redirect } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBKT7PtLaiCcT7tL365gCTgiSpGa75E20I",
  authDomain: "hublog-39563.firebaseapp.com",
  projectId: "hublog-39563",
  storageBucket: "hublog-39563.appspot.com",
  messagingSenderId: "114333517871",
  appId: "1:114333517871:web:de39ab7372082e4b33deda",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
