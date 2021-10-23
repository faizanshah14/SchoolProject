import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA4JFDSzRJNKIyDG4TNwm-EQpfbg9B8hBw",
    authDomain: "projectschool-40ae5.firebaseapp.com",
    projectId: "projectschool-40ae5",
    storageBucket: "projectschool-40ae5.appspot.com",
    messagingSenderId: "1001478966957",
    appId: "1:1001478966957:web:38c2413c7123a7a62e8024",
    measurementId: "G-RZDDCQ2S0L"
};

// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    if(typeof window !== 'undefined')
        if('measurementId' in firebaseConfig)
            console.log("Initializing Firebase")
}
// const analytics = getAnalytics(app);
