export interface IEchoController {
    greetings(name: string, callback: (err: any, result: string) => void): void;
}