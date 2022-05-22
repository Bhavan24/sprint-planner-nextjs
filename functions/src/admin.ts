import { apps, credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = require('./sprint-planner-dev.json');

if (apps.length === 0) {
    initializeApp({
        credential: credential.cert(serviceAccount),
        databaseURL: 'https://smart-app-bhavan-default-rtdb.firebaseio.com',
    });
}

export const listAllUsers = () => {
    // List batch of users, 1000 at a time.
    return getAuth().listUsers(1000);
    // .then((listUsersResult: any) => {
    //     listUsersResult.users.forEach((userRecord: any) => {
    //         console.log('user', userRecord.toJSON());
    //     });
    // })
    // .catch((error: any) => {
    //     console.log('Error listing users:', error);
    // });
};
