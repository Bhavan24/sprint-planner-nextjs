import BasePage from '../components/base';
import { MainComponent } from '../components/main';
import { APP_NAME } from '../constants';
import { IndexProps } from '../interfaces';

const IndexPage = ({ cookies }: IndexProps) => {
    return (
        <BasePage cookies={cookies} title={APP_NAME}>
            <MainComponent />
        </BasePage>
    );
};

export default IndexPage;
