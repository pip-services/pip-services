import { CommandSet } from 'pip-services-commons-node';
import { IEchoController } from './IEchoController';
export declare class EchoCommandSet extends CommandSet {
    private _controller;
    constructor(controller: IEchoController);
    private makeGreetingsCommand;
}
