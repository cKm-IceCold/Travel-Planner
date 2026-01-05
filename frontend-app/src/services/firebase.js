import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "travel-plan-2.firebaseapp.com",
    projectId: "travel-plan-2",
    storageBucket: "travel-plan-2.firebasestorage.app",
    messagingSenderId: "60456667582",
    appId: "1:60456667582:web:9aadad3fa10a8dae39d1ef",
    measurementId: "G-N4RD5C8SD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
