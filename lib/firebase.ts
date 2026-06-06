import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANbA721oMgGFfMA5h3isL4sfgn6KrxT4Y",
  authDomain: "core-517a0.firebaseapp.com",
  projectId: "core-517a0",
  storageBucket: "core-517a0.appspot.com",
  messagingSenderId: "247066340779",
  appId: "1:247066340779:web:b7ca224af442b4c405b6ee"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);