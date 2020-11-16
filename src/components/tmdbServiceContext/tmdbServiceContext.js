import React from 'react';

const {
    Provider: TMDbServiceProvider,
    Consumer : TMDbServiceConsumer
} = React.createContext();

export {
    TMDbServiceProvider,
    TMDbServiceConsumer
}