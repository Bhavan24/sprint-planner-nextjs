import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { MouseEventHandler, RefObject, useRef } from 'react';
import { colors } from '../../theme/colors';
import AlertBox from '../alertbox';

export const DetailedCard = ({
    content,
    onDelete,
    onEdit,
}: {
    content: string;
    onDelete: MouseEventHandler;
    onEdit: MouseEventHandler;
}) => {
    // popup
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef() as RefObject<FocusableElement>;

    return (
        <Box
            maxWidth="inherit"
            borderRadius="lg"
            borderWidth={1}
            my={2}
            p={4}
            bg={useColorModeValue(colors.detailed_card.light, colors.detailed_card.dark)}
        >
            <Text
                letterSpacing="inherit"
                fontSize="md"
                maxWidth="inherit"
                align="left"
                style={{
                    wordBreak: 'break-all',
                    whiteSpace: 'normal',
                }}
            >
                {content}
            </Text>
            <Flex justifyContent="flex-end" mt={2}>
                <>
                    <IconButton aria-label="delete" m={2} onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                </>
                <>
                    <IconButton aria-label="delete" m={2} onClick={onOpen}>
                        <DeleteIcon />
                    </IconButton>
                    <AlertBox
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        cancelRef={cancelRef}
                        onAction={e => {
                            onDelete(e);
                            onClose();
                        }}
                        btnText={'Delete'}
                        btnColor={'red'}
                        title={'Delete Item'}
                        body={`Are you sure? You can't undo this action afterwards.`}
                    />
                </>
            </Flex>
        </Box>
    );
};
