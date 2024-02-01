import { Cell } from "@ton/core";
import { sign } from "@ton/crypto";

export type SingedAuthSendArgs = {
    secretKey: Buffer;
}

export type ExternallySingedAuthSendArgs = {
    signer: (buffer: Buffer) => Promise<Buffer>;
}

export function signPayload<T extends SingedAuthSendArgs | ExternallySingedAuthSendArgs>(
    args: T, payloadToSign: Buffer, packResult: (signature: Buffer) => Cell
): T extends ExternallySingedAuthSendArgs ? Promise<Cell> : Cell {

    if ('secretKey' in args) {
        /**
         * Client provider an secretKey to sign transaction.
         */
        const signature = sign(payloadToSign, args.secretKey);
        return packResult(signature) as T extends ExternallySingedAuthSendArgs ? Promise<Cell> : Cell;
    }
    else {
        /**
         * Client use external storage for secretKey.
         * In this case lib could create a request to external resource to sign transaction.
         */
        return args.signer(payloadToSign)
            .then(packResult) as T extends ExternallySingedAuthSendArgs ? Promise<Cell> : Cell;
    }
}