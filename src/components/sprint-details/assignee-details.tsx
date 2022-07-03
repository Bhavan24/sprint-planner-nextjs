import {
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
import { MAX_STORY_POINTS } from '../../constants';
import { ISprintEngineerPointsProps, ISprintPokerColData } from '../../interfaces';
import { getSprintPokerDetails } from '../../services/sprint/sprints';
import { getAssigneeDetails } from '../../utils/poker-util';

export const StoryPointsEngineerDetails = ({ sprintId }: ISprintEngineerPointsProps) => {
    const [details, setDetails] = useState<ISprintPokerColData[]>([]);

    useEffect(() => {
        getSprintPokerDetails(sprintId)
            .then((tickets: ISprintPokerColData[]) => {
                setDetails(tickets);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const assignee_array = getAssigneeDetails(details);

    return (
        <Flex justifyContent="center" alignContent="center">
            <TableContainer>
                <Table variant="simple" size="md">
                    <Thead>
                        <Tr>
                            <Th>Assignee</Th>
                            <Th isNumeric>Story Points</Th>
                            <Th isNumeric>Remaining Points</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {assignee_array.map((data, i: number) => (
                            <Tr key={i}>
                                <Td>{data.name}</Td>
                                <Td isNumeric>{data.point}</Td>
                                <Td isNumeric>{MAX_STORY_POINTS - data.point}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Total</Th>
                            <Th isNumeric>
                                {assignee_array
                                    .map(data => data.point)
                                    .reduce((a, b) => a + b, 0)}
                            </Th>
                            <Th isNumeric>
                                {assignee_array
                                    .map(data => MAX_STORY_POINTS - data.point)
                                    .reduce((a, b) => a + b, 0)}
                            </Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Flex>
    );
};
