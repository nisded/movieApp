import { TMDbServiceConsumer } from '../tmdbServiceContext';

const withTMDbService = (Wrapped) => {
    return (props) => {
        return (
            <TMDbServiceConsumer>
                {
                    (tmdbService) => {
                        return <Wrapped {...props} tmdbService={tmdbService} />
                    }
                }
            </TMDbServiceConsumer>
        );
    };
};

export default withTMDbService;