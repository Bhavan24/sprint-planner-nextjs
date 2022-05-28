// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
// import fetch from 'node-fetch';
const nfetch = require('node-fetch');

const base_url = 'https://bhavan24.atlassian.net';
const api_path = '/rest/api/2/issue/';
const issue_key = 'SP-1';

const email = 'bhavantesting@gmail.com';
const api_key = 'qqELgEEY3zzGfxAOiCKQ524E';
const auth = Buffer.from(`${email}:${api_key}`).toString('base64');

const get_req_option = {
    method: 'GET',
    headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json',
    },
};

const get_data = () => {
    nfetch(`${base_url}${api_path}${issue_key}`, get_req_option)
        .then(response => {
            console.log(`Response: ${response.status} ${response.statusText}`);
            return response.text();
        })
        .then(text => {
            console.log(text);
        })
        .catch(err => {
            console.error(err);
        });
};

get_data();
