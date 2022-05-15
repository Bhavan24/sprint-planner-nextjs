import { CookieProps } from '../../interfaces';
import { DashboardLayout } from '../../layouts/dashboard';
import { routes } from '../../routes';
import { Chakra } from '../../theme/Chakra';

/*
import { Heading, Wrap, WrapItem } from '@chakra-ui/react';
import { Layout } from '../../components/Layout';
import { properties } from '../../utils/sample-data';
import { PropertySummary } from '../../components/PropertySummary';
import { NextChakraLink } from '../../components/NextChakraLink';
import { Chakra } from '../../theme/Chakra';

interface PropertiesProps {
    cookies?: string;
}

const PropertiesPage = ({ cookies }: PropertiesProps) => (
    <Chakra cookies={cookies}>
        <Layout title="Next.js + TypeScript example | View properties">
            <Heading mb={4}>Available this weekend</Heading>
            <Wrap>
                {properties.map(property => (
                    <WrapItem key={property.id}>
                        <NextChakraLink href="/properties/[id]" as={`/properties/${property.id}`}>
                            <PropertySummary property={property} />
                        </NextChakraLink>
                    </WrapItem>
                ))}
            </Wrap>
        </Layout>
    </Chakra>
);

export default PropertiesPage;
// export { getServerSideProps } from '../../theme/Chakra';
*/

const current_page_name = routes[0].name;

const Sprints = ({ cookies }: CookieProps) => (
    <Chakra cookies={cookies}>
        <DashboardLayout title={current_page_name}>{current_page_name}</DashboardLayout>
    </Chakra>
);

export default Sprints;
