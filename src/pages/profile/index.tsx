import { Avatar, Box, Link, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';
import BasePage from '../../components/auth-base-component';
import { PROFILE_PAGE_NAME } from '../../constants';

async function get_current_user_info() {
    let value = await fetch('https://ipapi.co/json/');
    let result = await value.json();
    return result;
}

const Profile = () => {
    const [user] = useAuthState(auth);
    const name = user?.displayName?.toString().split(' ');
    const firstName = name?.[0] || '';
    const lastName = name?.[1] || '';
    const email = user?.email?.toString() || '';
    const avatar = user?.photoURL?.toString() || '';

    const [userInfo, setUserInfo] = useState({
        firstName: firstName,
        lastName: lastName,
        avatar: avatar,
        email: email,
        city: '',
        region: '',
        country: '',
        timezone: '',
    });

    useEffect(() => {
        get_current_user_info()
            .then(res => {
                setUserInfo({
                    ...userInfo,
                    city: res.city,
                    country: res.country_name,
                    region: res.region,
                    timezone: res.timezone,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <BasePage title={PROFILE_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                <Box>
                    <Avatar src={userInfo.avatar} />
                    <Text color="red.700">
                        {`${userInfo.firstName} ${userInfo.lastName}`}
                    </Text>
                    <Link href={userInfo.email} color="gray.400">
                        {`${userInfo.email}`}
                    </Link>
                    <Text color="gray.400">
                        {`${userInfo.city}, ${userInfo.region}, ${userInfo.country}`}
                    </Text>
                    <Text color="gray.400">{`${userInfo.timezone}`}</Text>
                </Box>
            </Box>
        </BasePage>
    );
};

export default Profile;
