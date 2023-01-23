import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth } from "firebase/auth";

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
auth.setPersistence(browserSessionPersistence);
export const getToken = async () => await auth.currentUser?.getIdToken();
