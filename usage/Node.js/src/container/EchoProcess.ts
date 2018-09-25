import { ProcessContainer } from 'pip-services-container-node';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

import {EchoServiceFactory} from '../build/EchoServiceFactory';

export class EchoProcess extends ProcessContainer {
    public constructor() {
        super('echo', 'Echo microservice');

        this._factories.add(new EchoServiceFactory());
        this._factories.add(new DefaultRpcFactory());
    }
}