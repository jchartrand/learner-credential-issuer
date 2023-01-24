import fs from 'fs/promises';
import { generateSecretKeySeed } from '@digitalcredentials/bnid';
/* 
These are the seeds for the signing dids.
They should be kept secret.
*/
const seeds = {
    dcc: 'add a seed here using generateSecretKeySeed',
    dcc_unregistered: 'add a seed here using generateSecretKeySeed',
    mcmaster: 'add a seed here using generateSecretKeySeed'
}

export default seeds

/* 
this next method could be used to 
add a new seed to an env file.
We'd have to move the seeds above into the env file.
*/
export async function setNewDIDSeed(seedNameForEnvFile) {
    try {
      //const newDidSeed = await generateSecretKeySeed();
      //seeds.seedNameForEnvFile = newDidSeed
      //const envEntry = `\nDID_SEED=${newDidSeed}`;
     // await fs.appendFile('./.env', envEntry);
      //process.env.DID_SEED = newDidSeed
     // resetConfig()
     // const {didSeed} = getConfig()
     // return didSeed
    } catch (err) {
        console.log(err);
    }
  }