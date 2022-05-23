import { Select } from '@chakra-ui/react';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { ISprintColData } from '../../interfaces';
import { getSprints } from '../../services/sprint/sprints';

const SelectSprint = ({
    onChange,
}: {
    onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
}) => {
    const [sprints, setSprints] = useState<ISprintColData[]>();

    useEffect(() => {
        getSprints()
            .then(sprints => {
                setSprints(sprints);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Select onChange={onChange}>
                {sprints &&
                    sprints.map(sprint => (
                        <option key={sprint.id} value={sprint.id}>
                            {sprint.name}
                        </option>
                    ))}
            </Select>
        </>
    );
};

export default SelectSprint;
