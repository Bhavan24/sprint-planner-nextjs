import { Box } from '@chakra-ui/react';
import BasePage from '../../components/base';
import MeetComponent from '../../components/jitsi-meet';
import { MEET_PAGE_NAME } from './../../constants';

const Meet = () => (
    <BasePage title={MEET_PAGE_NAME}>
        <Box textAlign="center" fontSize="xl" m={5}>
            <MeetComponent />
        </Box>
    </BasePage>
);

export default Meet;
