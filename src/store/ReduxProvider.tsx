import React, { PropsWithChildren } from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import store, {persistor} from './store';
import Loading from '../components/common/loading/Loading';

const ReduxProvider = (props: PropsWithChildren<{}>) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<Loading/>}>{props.children}</PersistGate>
        </Provider>
    )
}

export default ReduxProvider;