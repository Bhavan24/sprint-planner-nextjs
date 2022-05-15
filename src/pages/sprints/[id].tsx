import { Badge, Box, Button, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { APP_NAME } from '../../constants';
import { SprintDetailsProps } from '../../interfaces';
import { DashboardLayout } from '../../layouts/dashboard';
import { Chakra } from '../../theme/Chakra';
import { properties } from '../../utils/sample-data';

const SprintDetailsPage = ({ item }: { item: SprintDetailsProps }) => (
    <Chakra>
        <DashboardLayout title={`Sprint: ${item.title} | ${APP_NAME}`}>
            <Grid templateColumns={['1fr', '1fr', '2fr 1fr']} gap={[0, 2, 10]}>
                <Box>
                    <Heading mb={2}>{item.title}</Heading>
                    <Flex alignItems="baseline">
                        {item.isNew && (
                            <Badge borderRadius="full" px="2" colorScheme="teal" mr="2">
                                New
                            </Badge>
                        )}
                        <Box
                            mb={6}
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                        >
                            {item.beds} beds &bull; {item.baths} baths
                        </Box>
                    </Flex>
                    <Image src={item.imageUrl} alt={item.imageAlt} borderRadius="md" />
                </Box>
                <Box>
                    <Flex
                        pt={[2, 2, 4]}
                        pb={[4, 4, 12]}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Heading>{item.formattedPrice}</Heading>
                        <Button size="lg" colorScheme="purple">
                            Book now
                        </Button>
                    </Flex>
                    <Text whiteSpace="pre-line">{item.description}</Text>
                </Box>
            </Grid>
        </DashboardLayout>
    </Chakra>
);

export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on properties
    const paths = properties.map(property => ({
        params: { id: property.id },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const id = params?.id;
        const sprint = properties.find(data => data.id === id);
        // By returning { props: item }, the StaticPropsDetail component
        // will receive `item` as a prop at build time
        return { props: { sprint } };
    } catch (err: any) {
        return { props: { errors: err.message } };
    }
};

export default SprintDetailsPage;
