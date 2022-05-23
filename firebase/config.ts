import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDaRwpDlgi5DpULKLCYSeSnSIvmga2_1KA',
    authDomain: 'sahas-test.firebaseapp.com',
    databaseURL: 'https://sahas-test-default-rtdb.firebaseio.com',
    projectId: 'sahas-test',
    storageBucket: 'sahas-test.appspot.com',
    messagingSenderId: '514191522591',
    appId: '1:514191522591:web:82bc1f409e0e7698140e2a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { firestore, auth, provider, signOut };
