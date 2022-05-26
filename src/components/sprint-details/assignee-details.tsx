import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ISprintEngineerPointsProps, ISprintPokerColData } from '../../interfaces';
import { getSprintPokerDetails } from '../../services/sprint/sprints';
import { getAssigneeDetails } from '../../utils/poker-util';

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
