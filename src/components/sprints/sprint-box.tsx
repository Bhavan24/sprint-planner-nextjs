import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { ISprintDetailsBoxProps } from '../../interfaces';
import { getIssues } from '../../utils/sprint-util';
import styles from './sprints.module.css';

export const SprintBox = (props: ISprintDetailsBoxProps) => {
    const issues = getIssues(props.content);

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
                    <Text mt="1" fontWeight="semibold" fontSize="3xl">
                        {props.title}
                    </Text>
                    {props.content && (
                        <Box
                            display="flex"
                            mt="2"
                            fontWeight="light"
                            alignItems="flex-start"
                            flexDir="column"
                        >
                            {issues.map(issue => (
                                <div className={styles.text} key={issue.name}>
                                    <b>{issue.name}</b>
                                    <i>{issue.tickets}</i>
                                </div>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Link>
    );
};
