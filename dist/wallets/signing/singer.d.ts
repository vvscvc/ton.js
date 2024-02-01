/// <reference types="node" />
import { Cell } from "@ton/core";
export type SingedAuthSendArgs = {
    secretKey: Buffer;
};
export type ExternallySingedAuthSendArgs = {
    signer: (buffer: Buffer) => Promise<Buffer>;
};
export declare function signPayload<T extends SingedAuthSendArgs | ExternallySingedAuthSendArgs>(args: T, payloadToSign: Buffer, packResult: (signature: Buffer) => Cell): T extends ExternallySingedAuthSendArgs ? Promise<Cell> : Cell;
