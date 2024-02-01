"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signPayload = void 0;
const crypto_1 = require("@ton/crypto");
function signPayload(args, payloadToSign, packResult) {
    if ('secretKey' in args) {
        /**
         * Client provider an secretKey to sign transaction.
         */
        const signature = (0, crypto_1.sign)(payloadToSign, args.secretKey);
        return packResult(signature);
    }
    else {
        /**
         * Client use external storage for secretKey.
         * In this case lib could create a request to external resource to sign transaction.
         */
        return args.signer(payloadToSign)
            .then(packResult);
    }
}
exports.signPayload = signPayload;
