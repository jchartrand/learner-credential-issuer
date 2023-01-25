import express from 'express';
import axios from 'axios';
import { getConfig } from "../config.js";

const { isDev, port } = getConfig();

import demoData from "../demoData/index.js"

var router = express.Router();

/*
This next endpoint demonstrates what would happen after an eduGain login.

After eduGain authentication, this endpoint would be called, passing it the eduGain SAML token from
which we'd get the studentID.  (in the sample code below the studentID is just
  passed in as a request param for now.)

Then this endpoint uses the studentID to call an API endpoint/method that the issuer exposes
and that returns all the credential data for the studentID. The endpoint/method to call is 
registered by the issuer in a .env file.  The endpoint/method must return all the data in a
set format.  So, effectively this endpoint/method becomes the one thing that an issuer
has to implement to use the LCI and LCP with eduGain.
*/

router.get('/:studentID', async function(req, res, next) {
    const devPort = isDev?`:${port}`:''
    const lciHandleEndpoint = `${req.protocol}://${req.hostname}${devPort}/credentials/handle`
    console.log("the lci handle endpoint:")
    console.log(lciHandleEndpoint)
  // would also veify the SAML token coming in on the request.
    const studentID = req.params.studentID
    // this next call 'demoData' right now just gets preset demo data from a file,
    // but in production would call the issuer's method or endpoint as set in the
    // .env file.
    const dataFromIssuer = demoData[studentID]
    axios.post(lciHandleEndpoint, dataFromIssuer)
      .then(function (response) {
        const redirectURI=response.data.redirectTo
        res.redirect(redirectURI)
      })
      .catch(function (error) {
       // console.log(error);
       console.log('error in calling the post to /handle')
      });
  });

export default router