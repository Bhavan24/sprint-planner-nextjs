import {
    Avatar,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ICommonUser } from '../../interfaces';
import { get_user_list } from '../../services/user/users';

export const UsersList = () => {
    const [users, setUsers] = useState<ICommonUser[]>();

    useEffect(() => {
        get_user_list()
            .then((user: ICommonUser[]) => {
                setUsers(user);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <Flex justifyContent="center">
            <TableContainer>
                <Table variant="simple" size="md">
                    <Thead>
                        <Tr>
                            <Th>User</Th>
                            <Th>Email</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users &&
                            users.map((user, i: number) => (
                                <Tr key={i}>
                                    <Td>
                                        <Flex alignItems="center">
                                            <Avatar src={user.photoURL} />
                                            <Text ml={2}>{user.displayName}</Text>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Flex alignItems="center">
                                            <Text>{user.email}</Text>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
};
