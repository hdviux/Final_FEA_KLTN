import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC6zgoq_CyErQWv8sbEPRZg_0D8sIM5Fnc",
  authDomain: "toyskid-653c4.firebaseapp.com",
  projectId: "toyskid-653c4",
  storageBucket: "toyskid-653c4.appspot.com",
  messagingSenderId: "643368013524",
  appId: "1:643368013524:web:a4ca8ea6c39bb678bd7541",
  measurementId: "G-QHTVLDPPTE"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);