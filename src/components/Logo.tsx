import { IconProps } from '@chakra-ui/react';

interface IconPropsExtended extends IconProps {
    size: number;
    style: {};
}

export const Logo = (props: IconPropsExtended) => {
    return <img src="/static/agile.png" alt="agile" style={props.style} width={props.size} height={props.size} />;
};
