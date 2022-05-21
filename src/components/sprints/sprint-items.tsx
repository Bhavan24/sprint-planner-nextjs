import {
    Box,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';

const style1 = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
};

export const ProgressDetails = () => {
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
                                <Td>2 Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>REOPENED</Td>
                                <Td>2 Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>IN PROGRESS</Td>
                                <Td>2 Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>PR CREATED</Td>
                                <Td>2 Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>PR MERGED</Td>
                                <Td>2 Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>IN VERIFICATION</Td>
                                <Td>2 Tickets</Td>
                            </Tr>
                            <Tr>
                                <Td>RESOLVED</Td>
                                <Td>2 Tickets</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Flex>
    );
};

export const RetrospectiveDetails = () => {
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
                            <Td>This item went well</Td>
                            <Td>This item To improve</Td>
                            <Td>This is action item</Td>
                        </Tr>
                        <Tr>
                            <Td>This item went well</Td>
                            <Td>This item To improve</Td>
                            <Td>This is action item</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};

export const StoryPointsDetails = () => {
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
                        <Tr>
                            <Td>Fix the sprint planner 1</Td>
                            <Td>https://techlabsglobal.atlassian.net/browse/W3G-2786</Td>
                            <Td>5</Td>
                        </Tr>
                        <Tr>
                            <Td>Fix the sprint planner 2</Td>
                            <Td>https://techlabsglobal.atlassian.net/browse/W3G-2786</Td>
                            <Td>5</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};
