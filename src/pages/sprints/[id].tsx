import { Box, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import BasePage from '../../components/base';
import {
    ProgressDetails,
    RetrospectiveDetails,
    StoryPointsDetails,
} from '../../components/sprints/sprint-items';
import { SPRINTS_PAGE_NAME } from '../../constants';

const SprintDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <BasePage title={SPRINTS_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                {SPRINTS_PAGE_NAME} {id}
                <Divider m={5} />
                <ProgressDetails />
                <Divider m={5} />
                <RetrospectiveDetails />
                <Divider m={5} />
                <StoryPointsDetails />
            </Box>
        </BasePage>
    );
};

export default SprintDetails;
