import { Builder, Cell, beginCell } from "@ton/core";
import { sign } from "@ton/crypto";

export type SingedAuthSendArgs = {
    secretKey: Buffer;
}

export type ExternallySingedAuthSendArgs = {
    signer: (message: Cell) => Promise<Cell>;
}

export function signPayload<T extends SingedAuthSendArgs | ExternallySingedAuthSendArgs>(
    args: T, signingMessage: Builder, packResult: (signatureWithMessage: Cell) => Cell
): T extends ExternallySingedAuthSendArgs ? Promise<Cell> : Cell {

    if ('secretKey' in args) {
        /**
         * Client provider an secretKey to sign transaction.
         */
        const signature = sign(signingMessage.endCell().hash(), args.secretKey);
        const signatureWithMessage = beginCell()
            .storeBuffer(signature)
            .storeBuilder(signingMessage)
            .endCell()

        return packResult(signatureWithMessage) as T extends ExternallySingedAuthSendArgs ? Promise<Cell> : Cell;
    }
    else {
        /**
         * Client use external storage for secretKey.
         * In this case lib could create a request to external resource to sign transaction.
         */
        return args.signer(signingMessage.endCell())
            .then(packResult) as T extends ExternallySingedAuthSendArgs ? Promise<Cell> : Cell;
    }
}