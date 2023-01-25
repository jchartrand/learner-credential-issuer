//import { DIDDocument } from "@digitalcredentials/sign-and-verify-core";
import ConfigurationError from "./errors.js";
import fs from 'fs/promises';
import { generateSecretKeySeed } from '@digitalcredentials/bnid';

let CONFIG = null;

function setConfig() {
  CONFIG = parseConfig();
}

function parseConfig() {
  if (!process.env.PORT) {
    throw new ConfigurationError("Environment variable 'PORT' is not set");
  }
  const didSeeds = {}
  Object.getOwnPropertyNames(process.env)
        .filter(propName=>propName.startsWith('DIDSEED_'))
        .forEach( propName => didSeeds[propName.slice(propName.indexOf('_') + 1)] = process.env[propName]);

  return Object.freeze({
    port: parseInt(process.env.PORT),
    lcpHost: process.env.LCP_HOST,
    isDev: (process.env.DEV && process.env.DEV==='TRUE'),
    didSeeds
  });
}

export function resetConfig() {
  CONFIG = null;
}

export function getConfig() {
  if (!CONFIG) {
    setConfig()
  }
  return CONFIG;
}


/* 
this next method could be used to 
add a new seed to an env file.
We'd have to move the seeds above into the env file.
*/
export async function setNewDIDSeed(seedName) {
    try {
      const newDidSeed = await generateSecretKeySeed();
     // seeds.seedNameForEnvFile = newDidSeed
      const envEntry = `\nDID_SEED_${seedName}=${newDidSeed}`;
      await fs.appendFile('./.env', envEntry);
      
      //process.env.DID_SEED = newDidSeed
     // resetConfig()
     // const {didSeed} = getConfig()
     // return didSeed
    } catch (err) {
        console.log(err);
    }
  }