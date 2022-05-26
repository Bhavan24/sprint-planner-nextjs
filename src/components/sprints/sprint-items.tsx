import {
    Box,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
    ISprintDetailsItemProps,
    ISprintEngineerPointsProps,
    ISprintPokerColData,
} from '../../interfaces';
import { getSprintPokerDetails } from '../../services/sprint/sprints';
import { getAssigneeDetails } from '../../utils/poker-util';
import { getRetro } from '../../utils/retro-util';
import { getIssues, getTotal } from '../../utils/sprint-util';

export const ProgressDetails = (props: ISprintDetailsItemProps) => {
    const issues = getIssues(props.data.progess);
    const total = getTotal(props.data.progess);

    return (
        <Flex justifyContent="flex-start">
            <Box maxW="25em">
                <TableContainer>
                    <Table variant="striped" size="sm">
                        <Thead>
                            <Tr>
                                <Th>Status</Th>
                                <Th>Tickets</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {issues &&
                                issues.map(issue => (
                                    <Tr key={issue.type}>
                                        <Td>{issue.name}</Td>
                                        <Td>{issue.tickets}</Td>
                                    </Tr>
                                ))}
                        </Tbody>
                        <Tfoot>
                            <Tr color="teal">
                                <Td>TOTAL</Td>
                                <Td>{total} Tickets</Td>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </Flex>
    );
};

export const RetrospectiveDetails = (props: ISprintDetailsItemProps) => {
    const retro = getRetro({
        went_well: props.data.retro.went_well,
        to_improve: props.data.retro.to_improve,
        action_items: props.data.retro.action_items,
    });

    return (
        <Flex justifyContent="flex-start">
            <TableContainer>
                <Table variant="striped" size="sm">
                    <Thead>
                        <Tr>
                            <Th w="33.3%">👌 Went well</Th>
                            <Th w="33.3%">📈 To improve</Th>
                            <Th w="33.3%">📍 Action items</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {retro &&
                            retro.map((item, i: number) => (
                                <Tr key={i}>
                                    <Td wordBreak="break-word" whiteSpace="normal">
                                        {item.went_well}
                                    </Td>
                                    <Td wordBreak="break-word" whiteSpace="normal">
                                        {item.to_improve}
                                    </Td>
                                    <Td wordBreak="break-word" whiteSpace="normal">
                                        {item.action_items}
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export const StoryPointsDetails = (props: ISprintDetailsItemProps) => {
    return (
        <Flex justifyContent="flex-start">
            <TableContainer>
                <Table variant="striped" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Title</Th>
                            <Th>Description</Th>
                            <Th>Link</Th>
                            <Th>Assignee</Th>
                            <Th>Story Points</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.data.poker?.map((poker, i: number) => (
                            <Tr key={i}>
                                <Td>{poker.title}</Td>
                                <Td>{poker.desc}</Td>
                                <Td>{poker.link}</Td>
                                <Td>{poker.assignee}</Td>
                                <Td>{poker.points} Points</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export const StoryPointsEngineerDetails = ({ sprintId }: ISprintEngineerPointsProps) => {
    const [details, setDetails] = useState<ISprintPokerColData[]>();

    useEffect(() => {
        getSprintPokerDetails(sprintId)
            .then((tickets: ISprintPokerColData[]) => {
                setDetails(tickets);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <Flex justifyContent="center" alignContent="center">
            <TableContainer>
                <Table variant="simple" size="md">
                    <Thead>
                        <Tr>
                            <Th>Assignee</Th>
                            <Th isNumeric>Story Points</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {details &&
                            getAssigneeDetails(details).map((data, i: number) => (
                                <Tr key={i}>
                                    <Td>{data.name}</Td>
                                    <Td isNumeric>{data.point}</Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};
