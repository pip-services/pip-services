import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { IEchoController } from './IEchoController';
export declare class EchoController implements IEchoController, ICommandable {
    private _commandSet;
    constructor();
    getCommandSet(): CommandSet;
    greetings(name: string, callback: (err: any, result: string) => void): void;
}
