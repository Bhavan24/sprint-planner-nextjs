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
import { getUsersFromFirebase } from '../../services/user/firebase';

export const UsersList = () => {
    const [users, setUsers] = useState<any[]>();

    useEffect(() => {
        getUsersFromFirebase()
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
                            <Th>Users</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users &&
                            users.map((user, i: number) => (
                                <Tr key={i}>
                                    <Td>
                                        <Flex alignItems="center">
                                            <Avatar src={user.photoURL} />
                                            {/* <Text
                                                ml={2}
                                                sx={{ textTransform: 'capitalize' }}
                                            >
                                                {user.fname}
                                            </Text> */}
                                            <Text ml={2}>{user.email}</Text>
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
