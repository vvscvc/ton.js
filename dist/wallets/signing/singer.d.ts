/// <reference types="node" />
import { Builder, Cell } from "@ton/core";
export type SingedAuthSendArgs = {
    secretKey: Buffer;
};
export type ExternallySingedAuthSendArgs = {
    signer: (message: Cell) => Promise<Cell>;
};
export declare function signPayload<T extends SingedAuthSendArgs | ExternallySingedAuthSendArgs>(args: T, signingMessage: Builder, packResult: (signatureWithMessage: Cell) => Cell): T extends ExternallySingedAuthSendArgs ? Promise<Cell> : Cell;
export declare function signPayloadW5<T extends SingedAuthSendArgs | ExternallySingedAuthSendArgs>(args: T, signingMessage: Builder, packResult: (signatureWithMessage: Cell) => Cell): T extends ExternallySingedAuthSendArgs ? Promise<Cell> : Cell;
