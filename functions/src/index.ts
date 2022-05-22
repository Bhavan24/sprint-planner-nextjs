import * as functions from 'firebase-functions';
import { listAllUsers } from './admin';

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true });
    listAllUsers()
        .then((listUsersResult: any) => {
            listUsersResult.users.forEach((userRecord: any) => {
                functions.logger.info('Hello logs!', userRecord.toJSON());
                console.log('user', userRecord.toJSON());
            });
        })
        .catch((error: any) => {
            functions.logger.info('Error listing users:', error);
            console.log('Error listing users:', error);
        });

    response.send('Hello from Firebase!');
});
