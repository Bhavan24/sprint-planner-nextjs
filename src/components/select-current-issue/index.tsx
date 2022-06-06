import { Select } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';
import { IJiraIssues } from '../../interfaces';

const SelectCurrentIssue = ({ onChange, issues }: {
    onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
    issues: IJiraIssues[];
}) => {

    return (
        <>
            <Select placeholder='--Select Issue--' onChange={onChange}>
                {issues &&
                    issues.map((issue: any, index: number) => (
                        <option key={index} value={issue.issueKey}>
                            {issue.issueKey}
                        </option>
                    ))}
            </Select>
        </>
    );
};

export default SelectCurrentIssue;
