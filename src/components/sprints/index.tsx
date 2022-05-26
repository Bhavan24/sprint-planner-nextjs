import {
    Box,
    Button,
    Flex,
    GridItem,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { RefObject, useEffect, useRef, useState } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { ISprintColData } from '../../interfaces';
import { getSprints } from '../../services/sprint/sprints';
import { colors } from '../../theme/colors';
import { SaveSprint } from './save-sprint-details';
import { SprintBox } from './sprint-box';
import styles from './sprints.module.css';

const SprintsMainComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef() as RefObject<FocusableElement>;
    const finalRef = useRef() as RefObject<FocusableElement>;

    // sprints
    const [sprints, setSprints] = useState<ISprintColData[]>();

    useEffect(() => {
        getSprints()
            .then(sprint => {
                sprint && setSprints(sprint);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Flex w="100%" my={5} justifyContent="center" gap={2}>
                <Flex alignItems="center">
                    <Button
                        variant="outline"
                        sx={{
                            mx: 2,
                            color: useColorModeValue(
                                colors.btn_save_sprint.light,
                                colors.btn_save_sprint.dark
                            ),
                            w: '15em',
                        }}
                        rightIcon={<MdLibraryAdd />}
                        onClick={onOpen}
                    >
                        Add Sprint
                    </Button>
                    <SaveSprint
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        initialRef={initialRef}
                        finalRef={finalRef}
                        title={''}
                    />
                </Flex>
            </Flex>
            <Box textAlign="center" fontSize="xl" p={3}>
                <Box p={3} className={styles.itemsContainer}>
                    {sprints &&
                        sprints.map(sprint => (
                            <GridItem w="100%" key={sprint.id}>
                                <SprintBox
                                    title={sprint.name}
                                    link={`/sprints/${sprint.id}`}
                                    content={sprint.progess}
                                />
                            </GridItem>
                        ))}
                </Box>
            </Box>
        </>
    );
};

export default SprintsMainComponent;
