// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvkATwDtZwjvummT4IPUpvY2vt5lJNnf8",
  authDomain: "react-native-todo-5aa2e.firebaseapp.com",
  projectId: "react-native-todo-5aa2e",
  storageBucket: "react-native-todo-5aa2e.appspot.com",
  messagingSenderId: "689805106196",
  appId: "1:689805106196:web:728a7c775bbb805f06db01",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const auth = getAuth(app);
export const db = getFirestore(app);
