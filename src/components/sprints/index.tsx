import { Box, Button, Flex, GridItem, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { MdLibraryAdd } from 'react-icons/md';
import { colors } from '../../theme/colors';
import { details } from '../../utils/sample-data';
import styles from './sprints.module.css';

interface SprintBoxProps {
    link: string;
    title: string;
    content?: {
        open: string;
        reopen: string;
        inprogress: string;
        prcreated: string;
        prmerged: string;
        inverification: string;
        resolved: string;
    };
}

const SprintBox = (props: SprintBoxProps) => {
    return (
        <Link href={props.link} passHref>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                m={2}
                minHeight="15em"
                cursor="pointer"
            >
                <Box p="6">
                    <Box mt="1" fontWeight="semibold" as="h3">
                        {props.title}
                    </Box>
                    {props.content && (
                        <Box
                            display="flex"
                            mt="2"
                            fontWeight="light"
                            alignItems="flex-start"
                            flexDir="column"
                        >
                            <div className={styles.text}>
                                <b>OPEN</b>
                                <i>{props.content.open}</i>
                            </div>
                            <div className={styles.text}>
                                <b>REOPENED</b>
                                <i>{props.content.reopen}</i>
                            </div>
                            <div className={styles.text}>
                                <b>IN PROGRESS</b>
                                <i>{props.content.inprogress}</i>
                            </div>
                            <div className={styles.text}>
                                <b>PR CREATED</b>
                                <i>{props.content.prcreated}</i>
                            </div>
                            <div className={styles.text}>
                                <b>PR MERGED</b>
                                <i>{props.content.prmerged}</i>
                            </div>
                            <div className={styles.text}>
                                <b>IN VERIFICATION</b>
                                <i>{props.content.inverification}</i>
                            </div>
                            <div className={styles.text}>
                                <b>RESOLVED</b>
                                <i>{props.content.resolved}</i>
                            </div>
                        </Box>
                    )}
                </Box>
            </Box>
        </Link>
    );
};

const SprintsMainComponent = () => {
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
                    >
                        Add Sprint
                    </Button>
                </Flex>
            </Flex>
            <Box textAlign="center" fontSize="xl" p={3}>
                <Box p={3} className={styles.itemsContainer}>
                    {details.map(box => (
                        <GridItem w="100%" key={box.link}>
                            {box.content ? (
                                <SprintBox
                                    title={box.title}
                                    link={box.link}
                                    content={box.content}
                                />
                            ) : (
                                <SprintBox title={box.title} link={box.link} />
                            )}
                        </GridItem>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default SprintsMainComponent;
