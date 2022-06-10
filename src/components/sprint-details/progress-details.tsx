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
    const issues = getIssues(props.data.progress);
    const total = getTotal(props.data.progress);

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
