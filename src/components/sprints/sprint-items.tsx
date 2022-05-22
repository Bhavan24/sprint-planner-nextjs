import {
    Box,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { ISprintDetailsItemProps } from '../../interfaces';

export const ProgressDetails = (props: ISprintDetailsItemProps) => {
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
                            <Tr>
                                <Td>OPEN</Td>
                                <Td>{props.data.progess.open} Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>REOPENED</Td>
                                <Td>{props.data.progess.reopen} Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>IN PROGRESS</Td>
                                <Td>{props.data.progess.inprogress} Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>PR CREATED</Td>
                                <Td>{props.data.progess.prcreated} Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>PR MERGED</Td>
                                <Td>{props.data.progess.prmerged} Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>IN VERIFICATION</Td>
                                <Td>{props.data.progess.inverification} Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>RESOLVED</Td>
                                <Td>{props.data.progess.resolved} Tickets</Td>
                            </Tr>
                        </Tbody>
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
