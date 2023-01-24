// Tool used to generate did:key from secret seed
import { generateSecretKeySeed, decodeSecretKeySeed } from '@digitalcredentials/bnid';
import {driver} from '@digitalcredentials/did-method-key';
import {securityLoader } from '@digitalcredentials/security-document-loader';
import {issue, verify} from '@digitalbazaar/vc';
import {Ed25519VerificationKey2020} from '@digitalbazaar/ed25519-verification-key-2020';
import {Ed25519Signature2020} from '@digitalbazaar/ed25519-signature-2020';

import didSeeds from "../dids.js"

import ConfigurationError from "../errors.js";

function getSeed(issuerKey) {
    console.log("the seeds:")
    console.log(didSeeds)
    if (issuerKey in didSeeds) {
        return didSeeds[issuerKey]
    } else {
        throw new ConfigurationError(`No seed is set for the issuer identified by the issuer key in the supplied credential data: ${issuerKey}`);
    }
}

function decodeSeed(secretKeySeed) {
    let secretKeySeedBytes // Uint8Array;
    if (secretKeySeed.startsWith('z')) {
    // This is a multibase-decoded key seed, such as that generated via @digitalcredentials/did-cli
    secretKeySeedBytes = decodeSecretKeySeed({secretKeySeed});
    } else if (secretKeySeed.length >= 32) {
        secretKeySeedBytes = (new TextEncoder()).encode(secretKeySeed).slice(0, 32);
    } else {
    throw TypeError('"secretKeySeed" must be at least 32 bytes, preferably multibase-encoded.');
    }
    return secretKeySeedBytes;
}

let crypt;
const suites = {}

async function getSuite(issuerKey) {
    console.log('the suites so far:')
    console.log(suites)
    if (! suites[issuerKey]) {
        console.log("about to build new suite")
        const didSeed = getSeed(issuerKey)
        console.log('the seed:')
        console.log(didSeed)
        const didKeyDriver = driver();
        const didSeedBytes = decodeSeed(didSeed);
        const { didDocument, methodFor } = await didKeyDriver.generate({ seed: didSeedBytes });
        const assertionMethod = methodFor({purpose: 'assertionMethod'})
        const key = new Ed25519VerificationKey2020(assertionMethod)
        const suite = new Ed25519Signature2020({key});
        const signingDID = didDocument.id
        suites[issuerKey] = {suite, signingDID}
    }
    return suites[issuerKey]
}

async function build () {
    if (!crypt) {
        
        const documentLoader = securityLoader().build()
        const presentationSuite = new Ed25519Signature2020();

        const sign = async (credential, issuerKey)=>{
            const {suite, signingDID} = await getSuite(issuerKey)
            credential.issuer.id = signingDID;
            try {
                const signedVC = await issue({
                    credential,
                    suite,
                    documentLoader
                });
            return signedVC

            } catch (e) {
                console.log("Error in the signing try block:")
                console.log(e)
            }
        }
        const verifyDIDAuth = async (presentation, challenge) => {
            try {
                const result = await verify({
                    presentation, 
                    challenge, 
                    suite: presentationSuite, 
                    documentLoader
                });
                return result
            } catch (e) {
                console.log("Error in the verify try block:")
                console.log(e)
            }
        }
        crypt = {sign, verifyDIDAuth} 
    }

    
    return crypt;
}


export default {build}


/*

  Allow experimentation with the seed in .env

  Then when they are ready to try with their own DID:

  - provide a 'get started endpoint'???? that might even be called from the browser?
- it uses bnid to generate a seed:
import {generateSecretKeySeed} from 'bnid';
const secretKeySeed = await generateSecretKeySeed();

and sets that in the .env I guess.


// Example secretKeySeed: z1Aaj5A4UCsdMpXwdYAReXa4bxWYiKJtdAvB1zMzCHtCbtD

*/