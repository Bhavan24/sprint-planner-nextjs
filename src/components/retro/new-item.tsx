import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import { createRef, useEffect, useState } from 'react';
import { INewRetroItemProps } from '../../interfaces';
import { getRetroList, saveRetroList } from '../../services/retrospective/storage';
import { DetailedCard } from './detailed-card';
import { FormActionButtons } from './form-actoion-button';

const NewRetroItem = ({ name, title, desc, refresh }: INewRetroItemProps) => {
    const [formValue, setFormValue] = useState('');
    const [data, setData] = useState<string[]>([]);
    const txtField = createRef<HTMLTextAreaElement>();

    useEffect(() => {
        setData(getRetroList(name));
    }, [setData, refresh]);

    const addValue = () => {
        const new_array = formValue ? [...data, formValue] : [...data];
        saveRetroList(name, new_array);
        setData(new_array);
        clearValue();
    };

    const clearValue = () => {
        setFormValue('');
    };

    const editValue = (index: number) => {
        setFormValue(data[index]);
        deleteValue(index);
        txtField.current?.focus();
    };

    const deleteValue = (index: number) => {
        const new_array = [...data];
        new_array.splice(index, 1);
        saveRetroList(name, new_array);
        setData(new_array);
    };

    const handleChange = (event: any) => {
        setFormValue(event.target.value);
    };

    return (
        <>
            <Box
                p={4}
                maxWidth='inherit'
                minHeight='100vh'
                borderWidth={1}
                my={2}
                borderRadius='lg'
            >
                <Flex alignItems='center' justifyContent='space-between' my={2}>
                    <Text fontSize='lg' my={2}>
                        {title}
                    </Text>
                    {formValue && (
                        <FormActionButtons onAdd={addValue} onClear={clearValue} />
                    )}
                </Flex>
                <Textarea
                    ref={txtField}
                    width={'100%'}
                    placeholder={desc}
                    margin='normal'
                    variant='filled'
                    rows={5}
                    value={formValue}
                    onChange={handleChange}
                    maxWidth='initial'
                />
                {data.reverse().map((value: string, index: number) => (
                    <DetailedCard
                        key={index}
                        content={value}
                        onDelete={() => {
                            deleteValue(index);
                        }}
                        onEdit={() => {
                            editValue(index);
                        }}
                    />
                ))}
            </Box>
        </>
    );
};

export default NewRetroItem;
