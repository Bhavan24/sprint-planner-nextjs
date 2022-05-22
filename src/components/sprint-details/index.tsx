import { Divider, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    ProgressDetails,
    RetrospectiveDetails,
    StoryPointsDetails,
} from '../../components/sprints/sprint-items';
import { ISprintColData } from '../../interfaces';
import { getSprint } from '../../services/sprint/sprints';
import { Chakra } from '../../theme/chakra-theme';
import { Loading } from '../loading';

const SprintDetailComponent = () => {
    // router
    const router = useRouter();

    // state
    const [sprint, setSprint] = useState<ISprintColData>();
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query;
        async function fetchData(id: string) {
            setIsLoading(true);
            getSprint(id)
                .then(sprint => {
                    setSprint(sprint);
                })
                .catch(err => {
                    console.log('err: ', err);
                });
        }
        id && fetchData(id.toString());
        setIsLoading(false);
    }, [router.isReady]);

    if (loading) {
        return (
            <Chakra>
                <Loading />
            </Chakra>
        );
    }

    return (
        <>
            {sprint ? (
                <>
                    <Text textAlign="center"> {sprint?.name}</Text>
                    <Divider m={5} />
                    <ProgressDetails data={sprint} />
                    <Divider m={5} />
                    <RetrospectiveDetails data={sprint} />
                    <Divider m={5} />
                    <StoryPointsDetails data={sprint} />
                </>
            ) : (
                <Text textAlign="center">No Details Found</Text>
            )}
        </>
    );
};

export default SprintDetailComponent;
