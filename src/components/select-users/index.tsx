import { Select } from '@chakra-ui/react';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { ICommonUser } from '../../interfaces';
import { get_user_list } from '../../services/user/users';

const SelectUsers = ({
    id,
    onChange,
}: {
    id: string;
    onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
}) => {
    const [users, setUsers] = useState<ICommonUser[]>([]);

    useEffect(() => {
        get_user_list()
            .then((currentUser: any) => {
                currentUser && setUsers(currentUser);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Select id={id} placeholder="--Select User--" onChange={onChange}>
                {users &&
                    users.map(user => (
                        <option key={user.uid} value={user.displayName}>
                            {user.displayName}
                        </option>
                    ))}
            </Select>
        </>
    );
};

export default SelectUsers;
