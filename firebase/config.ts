import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD7qVgCUIBGO3oCNCgWEeLIq0hqk11tKRU',
    authDomain: 'sprint-planner-ab5df.firebaseapp.com',
    projectId: 'sprint-planner-ab5df',
    storageBucket: 'sprint-planner-ab5df.appspot.com',
    messagingSenderId: '476682090893',
    appId: '1:476682090893:web:85eb313f3cda369f3425c4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { firestore, auth, provider };
