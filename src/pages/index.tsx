import { Box, Code, Text, Link, VStack, Grid } from '@chakra-ui/react';
import { Chakra } from '../theme/Chakra';
import { Layout } from '../components/Layout';
import { Logo } from '../components/Logo';
import { NextChakraLink } from '../components/NextChakraLink';

interface IndexProps {
    cookies?: string;
}

const IndexPage = ({ cookies }: IndexProps) => (
    <Chakra cookies={cookies}>
        <Layout title="Sprint Planner">
            <Box textAlign="center" fontSize="xl">
                <Grid minH="100vh" p={3}>
                    <VStack spacing={8}>
                        <Text>
                            Edit <Code fontSize="xl">pages/index.tsx</Code> and save to reload.
                            <br />
                            <br />
                            <NextChakraLink href="/properties" color="teal.500">
                                View the properties
                            </NextChakraLink>{' '}
                            to see the Nextjs <Code fontSize="xl">&lt;Link&gt;</Code> in action
                        </Text>
                        <Link
                            color="teal.500"
                            fontSize="2xl"
                            href="https://chakra-ui.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn more about Chakra
                        </Link>
                    </VStack>
                </Grid>
            </Box>
        </Layout>
    </Chakra>
);

export default IndexPage;
// export { getServerSideProps } from '../theme/Chakra';
