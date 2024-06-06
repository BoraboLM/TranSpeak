// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3ba8HtB93WDmlUpqarfE_PhsoJ-okDG4",
    authDomain: "transpeak-10af7.firebaseapp.com",
    projectId: "transpeak-10af7",
    storageBucket: "transpeak-10af7.appspot.com",
    messagingSenderId: "230540594418",
    appId: "1:230540594418:web:fe7b9bcffdb39082a3546b",
    measurementId: "G-B1NBG0FRTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage }