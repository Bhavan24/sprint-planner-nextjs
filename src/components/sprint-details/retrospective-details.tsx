import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ISprintDetailsItemProps } from '../../interfaces';
import { getRetro } from '../../utils/retro-util';

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
