import { Avatar, Box, Link, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';
import { get_current_user_info } from '../../utils/profile-util';

const ProfileMainComponent = () => {
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
        <Box>
            <Avatar src={userInfo.avatar} />
            <Text color="red.700">{`${userInfo.firstName} ${userInfo.lastName}`}</Text>
            <Link href={userInfo.email} color="gray.400">
                {`${userInfo.email}`}
            </Link>
            <Text color="gray.400">
                {`${userInfo.city}, ${userInfo.region}, ${userInfo.country}`}
            </Text>
            <Text color="gray.400">{`${userInfo.timezone}`}</Text>
        </Box>
    );
};

export default ProfileMainComponent;
