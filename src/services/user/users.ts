import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase/config';
import { getUsersFromFirebase, updateCurrentUserDetails } from './firebase';

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential ? credential.accessToken : '';
            // The signed-in user info.
            const user = result.user;
            // Logging the details
            console.log(credential, token, user);
        })
        .catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode, errorMessage, email, credential);
        });
};

export const loginToFirebase = (user: any) => {
    updateCurrentUserDetails(user).then(r => console.log(r));
};

export const get_user_list = async () => {
    return getUsersFromFirebase();
};
