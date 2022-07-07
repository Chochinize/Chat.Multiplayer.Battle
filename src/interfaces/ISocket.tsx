export interface ISocket {
    onopen: (arg: any) => any;
    onmessage: (arg: any) => any
    close: () => void;
    send: (arg: string) => any
}