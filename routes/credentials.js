import express from 'express';
import crypto from 'crypto';
import Keyv from 'keyv';
import crypt from '../services/crypt.js'
import { composeCredential } from '../templates/OB3.js';
const keyv = new Keyv();

import { getConfig } from "../config.js";
const { host, port, protocol, lcpHost, lcpPort, lcpProtocol  } = getConfig();

var router = express.Router();
const expiry = 1000 * 60 * 10; // store data expires after ten minutes

router.post('/handle', function(req, res, next) {
    const creds = []
    const credentialData = req.body
    console.log('credential Data passed in to handle:')
    console.log(credentialData)
    const uuidForList = crypto.randomUUID();
    credentialData.forEach(cred=>{
        const uuidForCredential = crypto.randomUUID();
        const challenge = crypto.randomUUID()
        cred.id = uuidForCredential
        cred.collectionEndpoint = `${protocol}://${host}:${port}/credentials/${uuidForList}/${uuidForCredential}`;
        cred.challenge = challenge;
        if (cred.type === 'degree') {
            cred.pdfLink = '${protocol}://${host}:${port}/credentials/pdf/${uuidForList}/${uuidForCredential}'
        }
        cred.deepLink = `dccrequest://request?issuer=me&vc_request_url=${cred.collectionEndpoint}&challenge=${challenge}&auth_type=bearer`
        creds.push(cred)
    })
    
    keyv.set(uuidForList, creds, expiry)
    res.json({redirectTo: `${lcpProtocol}://${lcpHost}:${lcpPort}/learner-credential-portal/credentials?list=${protocol}://${host}:${port}/credentials/${uuidForList}`})
   
    // Could potentially also redirect directly from here, like so:
   // res.redirect(`${lcpProtocol}://${lcpHost}:${lcpPort}/learner-credential-portal/credentials?list=${protocol}://${host}:${port}/credentials/${uuidForList}`)
   
});

router.get('/:listid', async function(req, res, next) {
    const theList = await keyv.get(req.params.listid)
    res.json(theList);
  });

router.post('/:listid/:credid', async function(req, res, next) {
    const {credid, listid} = req.params

    const {sign, verifyDIDAuth} = await crypt.build()
    const didAuthResponse = req.body
  
    const holderDID = didAuthResponse.holder || "did:key:unknown"
    const credList = await keyv.get(listid)
    const credentialRecord = credList.find(cred => cred.id === credid)
    const isDiDAuthValid = await verifyDIDAuth(didAuthResponse, credentialRecord.challenge)

    // if (isDiDAuthValid) {} else {}
    const unsignedVC = composeCredential(holderDID, credentialRecord)
    if (credentialRecord.test) {
        if (credentialRecord.test.includes('expired')) {
        unsignedVC.expirationDate = (new Date(Date.now() + 1000)).toISOString()
        }
        if (credentialRecord.test.includes('tampered')) {
            unsignedVC.expirationDate = (new Date(Date.now() + 1000)).toISOString()
        }
    }
    const signedVC = await sign(unsignedVC, credentialRecord.issuerKey)
    if (credentialRecord.test) {
        if (credentialRecord.test.includes('tampered')) {
            signedVC.issuer.name = 'University of Oxford'
        }
    }
    res.json(signedVC)
     
});

/* THIS IS JUST THE BEGINNINGS OF ROUGH CODE TO SHOW WHAT 
COULD BE DONE TO RETURN A PDF */
router.get('pdf/:listid/:credid', async function(req, res, next) {
    /*

        REDO THIS TO GENERATE THE VC AND ALSO GENERATE A PDF, AND INSERT THE VC AS QR.
        SO, I NEED SOME PDF ROUTINES PER CRED TYPE.

    */
    const {credid, listid} = req.params
    const didAuthResponse = req.body

    const {sign, verifyDIDAuth} = await crypt.build()
    
    let holderDID;
    
    if (didAuthResponse) {
        // A DID might be available if endpoint was invoked from a wallet, OR if
        // the endpoint was invoked from a web page, but the web page had used a CHAPI
        // GET to get a DIDAuth from a web or mobile wallet
        const isDiDAuthValid = await verifyDIDAuth(didAuthResponse, credentialRecord.challenge)
        if (isDiDAuthValid) {
            holderDID = isDidAdAuthResponse.holder;
        } else {
            throw new Error("holder DID isn't valid")
        }
    } else {
        // No DID was supplied, so we just issue this as a factual assertion
        holderDID = "did:key:unknown"
    } 
   
    const credList = await keyv.get(listid)
    const credentialRecord = credList.find(cred => cred.id === credid)
    /*
    Might want to leave out the subjectName.id and an email address, like so:
    "identifier": {
				"type": "IdentityObject",
				"identityHash": "jc.chartrand@gmail.com",
				"hashed": "false"
			},
    But, there could also be some way to add the student's name - Kerri
    thinks that just like issuer has issuer.name, there might be a credentialSubject.name
    I'm not totally sure, though, that that's what she meant.
    */
   
    const unsignedVC = composeCredential(holderDID, credentialRecord)
    const signedVC = await sign(unsignedVC, credentialRecord.issuerKey)
    generateAndReturnPDF(response, credentialRecord, signedVC)
  
     
});

const generateAndReturnPDF = (response, credentialRecord, signedVC) => {
    // generate QR
    // generate PDF from pdfKit
    // add QR to PDF
       // let doc = new PDFKit({size: 'LETTER', margin: indent});
       // doc.pipe(response);
        // BUILD THE PDFKIT DOC HERE
        //doc.end()      // THIS SENDS THE PDFKIT DOC BACK AS THE RESPONSE.
  
}
export default router