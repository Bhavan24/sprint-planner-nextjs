import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ISprintDetailsItemProps } from '../../interfaces';

export const StoryPointsDetails = (props: ISprintDetailsItemProps) => {
    return (
        <Flex justifyContent="flex-start">
            <TableContainer>
                <Table variant="striped" size="sm">
                    <Thead>
                        <Tr>
                            <Th w="20%">Title</Th>
                            <Th w="20%">Description</Th>
                            <Th w="20%">Link</Th>
                            <Th w="20%">Assignee</Th>
                            <Th w="20%">Story Points</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.data.poker?.map((poker, i: number) => (
                            <Tr key={i}>
                                <Td
                                    style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'normal',
                                    }}
                                >
                                    {poker.title}
                                </Td>
                                <Td
                                    style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'normal',
                                    }}
                                >
                                    {poker.desc}
                                </Td>
                                <Td
                                    style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'normal',
                                    }}
                                >
                                    {poker.link}
                                </Td>
                                <Td
                                    style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'normal',
                                    }}
                                >
                                    {poker.assignee}
                                </Td>
                                <Td
                                    style={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'normal',
                                    }}
                                >
                                    {poker.points} Points
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};
