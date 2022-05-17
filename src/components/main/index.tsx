import {
    Badge,
    Box,
    Grid,
    GridItem,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import Link from 'next/link';
import { BOX_DETAILS } from '../../constants';

interface SprintBoxProps {
    box: {
        link: string;
        imageUrl: string;
        imageAlt: string;
        title: string;
        content: string;
    };
}

const SprintBox = (props: SprintBoxProps) => {
    return (
        <Link href={props.box.link} passHref>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                m={2}
                minHeight="30em"
                cursor="pointer"
            >
                <img
                    src={props.box.imageUrl}
                    alt={props.box.imageAlt}
                    width={500}
                    height={200}
                />
                <Box p="6">
                    <Box mt="1" fontWeight="semibold" as="h3">
                        {props.box.title}
                    </Box>
                    <Box display="flex" mt="2" fontWeight="light" alignItems="flex-start">
                        {props.box.content}
                    </Box>
                </Box>
            </Box>
        </Link>
    );
};

export const SprintTable = () => {
    return (
        <Box borderWidth="1px" borderRadius="lg" p={3} m={2}>
            <TableContainer m={3}>
                <Table variant="simple">
                    <TableCaption>All Users</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Logo</Th>
                            <Th>Username</Th>
                            <Th>Email</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>logo1</Td>
                            <Td>user1</Td>
                            <Td>email1</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export const MainComponent = () => {
    return (
        <Box textAlign="center" fontSize="xl" p={3}>
            <Grid p={3} templateColumns="repeat(3, 1fr)">
                {BOX_DETAILS.map(box => (
                    <GridItem w="100%" key={box.link}>
                        <SprintBox box={box} />
                    </GridItem>
                ))}
                {/* <GridItem w="100%" colSpan={3}>
                    <SprintTable />
                </GridItem> */}
            </Grid>
        </Box>
    );
};
