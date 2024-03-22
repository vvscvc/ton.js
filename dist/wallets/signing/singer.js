"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signPayloadW5 = exports.signPayload = void 0;
const core_1 = require("@ton/core");
const crypto_1 = require("@ton/crypto");
function signPayload(args, signingMessage) {
    if ('secretKey' in args) {
        /**
         * Client provider an secretKey to sign transaction.
         */
        const signature = (0, crypto_1.sign)(signingMessage.endCell().hash(), args.secretKey);
        const signatureWithMessage = (0, core_1.beginCell)()
            .storeBuffer(signature)
            .storeBuilder(signingMessage)
            .endCell();
        return signatureWithMessage;
    }
    else {
        /**
         * Client use external storage for secretKey.
         * In this case lib could create a request to external resource to sign transaction.
         */
        return args.signer(signingMessage.endCell());
    }
}
exports.signPayload = signPayload;
function signPayloadW5(args, signingMessage) {
    if ('secretKey' in args) {
        /**
         * Client provider an secretKey to sign transaction.
         */
        const signature = (0, crypto_1.sign)(signingMessage.endCell().hash(), args.secretKey);
        const signatureWithMessage = (0, core_1.beginCell)()
            .storeBuilder(signingMessage)
            .storeBuffer(signature)
            .endCell();
        return signatureWithMessage;
    }
    else {
        /**
         * Client use external storage for secretKey.
         * In this case lib could create a request to external resource to sign transaction.
         */
        return args.signer(signingMessage.endCell());
    }
}
exports.signPayloadW5 = signPayloadW5;
