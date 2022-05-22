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
import { ISprintDetailsItemProps } from '../../interfaces';
import { getIssues, getTotal } from '../../utils/sprint-util';

export const ProgressDetails = (props: ISprintDetailsItemProps) => {
    const issues = getIssues(props.data.progess);
    const total = getTotal(props.data.progess);

    return (
        <Flex justifyContent="center">
            <Box maxW="25em">
                <TableContainer>
                    <Table variant="striped">
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
    return (
        <Flex justifyContent="center">
            <TableContainer>
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>👌 Went well</Th>
                            <Th>📈 To improve</Th>
                            <Th>📍 Action items</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{props.data.retro.wentwell}</Td>
                            <Td>{props.data.retro.toimprove}</Td>
                            <Td>{props.data.retro.action}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export const StoryPointsDetails = (props: ISprintDetailsItemProps) => {
    return (
        <Flex justifyContent="center">
            <TableContainer>
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Ticket Title</Th>
                            <Th>Link</Th>
                            <Th>Story Points</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.data.poker?.map(poker => (
                            <Tr key={poker.title}>
                                <Td>{poker.title}</Td>
                                <Td>{poker.link}</Td>
                                <Td>{poker.points} Tickets</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};
