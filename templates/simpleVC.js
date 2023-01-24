import crypto from 'crypto';
export function composeCredential (holderDid, credentialRecord) {
  const credential= {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1",
      "https://w3id.org/dcc/v1"
    ],
    "id": "http://somecred.org/043",
    "type": [
      "VerifiableCredential",
      "LearningCredential"
    ],
    "issuer": {
      "type": "Issuer",
      "id": "did:key:replacedAtSigningTime",
      "name": "McMaster University",
      "url": "https://credentials.mcmaster.ca"
    },
    "issuanceDate":  (new Date()).toISOString(),  //"2021-01-19T18:22:34.772810+00:00",
    "credentialSubject": {
      "type": "Person",
      "id": "did:key:z6MkrwMszMaErqpsCLb4F8DCHr8JqXHRYBtyjBMh62ZgH6yS",
      "name": "REPLACE THIS ALWAYS",
      "hasCredential": {
        "type": [
          "EducationalOccupationalCredential",
          "CourseCompletionCredential"
        ],
        "name": "REPLACE THIS ALWAYS, E.G., CONFIRMATION OF ENROLLMENT",
        "description": "REPLACE THIS ALWAYS, E.G., THIS IS TO CONFIRM, ETC."
      }
    }
  }

  if (credentialRecord.expirationDate) {
    credential.expirationDate = credentialRecord.expirationDate;
  }
  return credential;

}
