import crypto from 'crypto';
export function composeCredential (holderDid, credentialRecord) {
    console.log("the credential Record in composeCredential:")
    console.log(credentialRecord)
    const credential= {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://purl.imsglobal.org/spec/ob/v3p0/context.json"
        ],
        "id": "urn:uuid:c9ae1c60-5b8b-463c-bf0a-0bf26deca25e",
        "type": [
          "VerifiableCredential",
          "OpenBadgeCredential"
        ],
        "name": credentialRecord.title,
        "issuer": {
          "type": [
            "Profile"
          ],
          "id": "did:key:z6MknvVdQF7JUJ1WtLbjUJU7xuUDoFND2F2fhPcJkrXcYG55",
          "name": credentialRecord.issuerName,
          "url": credentialRecord.issuerURL,
          "image": credentialRecord.issuerImage
        },
        "issuanceDate": (new Date()).toISOString(),  //"2021-01-19T18:22:34.772810+00:00",
        "credentialSubject": {
          "type": [
            "AchievementSubject"
          ],
          "id": holderDid,
          "achievement": {
            "id": "urn:uuid:bd6d9316-f7ae-4073-a1e5-2f7f5bd22922",
            "type": ["Achievement"],
            "achievementType": credentialRecord.achievementType,
            "name": credentialRecord.achievementName,
            "description": credentialRecord.description,
            "criteria": {
              "type": "Criteria",
              "narrative": credentialRecord.criteria
            }
          }
        }
      }
  
    if (credentialRecord.expirationDate) {
      credential.expirationDate = credentialRecord.expirationDate;
    }
    if (credentialRecord.credImage) {
        credential.credentialSubject.achievement.image = {
            id: credentialRecord.credImage,
            type: "Image"
          }
    }
    //if (credentialRecord.issuerImage) {
    //    credential.issuer.image = credentialRecord.issuerImage;
    //}
    credential.id = `urn:uuid:${crypto.randomUUID()}`

    return credential;
  }

    

   /*   
      {
      '@context': [
        "https://www.w3.org/2018/credentials/v1",
        "https://purl.imsglobal.org/spec/ob/v3p0/context.json"
      ],
      id: "urn:uuid:a63a60be-f4af-491c-87fc-2c8fd3007a58",
      type: [
        "VerifiableCredential",
        "OpenBadgeCredential"
      ],
      name: "JFF x vc-edu PlugFest 2 Interoperability",
      issuer: {
        type: [
          "Profile",
        ],
        id: 'ADDED AT SIGNING TIME',
        name: credentialRecord.issuer,
        url: "https://www.jff.org/",
        image: "https://w3c-ccg.github.io/vc-ed/plugfest-1-2022/images/JFF_LogoLockup.png"
      },
      issuanceDate: (new Date()).toISOString(),  //"2021-01-19T18:22:34.772810+00:00",
      credentialSubject: {
        type: ["AchievementSubject"],
        id: holderDid,
        achievement: {
          id: "urn:uuid:bd6d9316-f7ae-4073-a1e5-2f7f5bd22922",
          type: [
            "Achievement"
          ],
          name: "JFF x vc-edu PlugFest 2 Interoperability",
          description: "This credential solution supports the use of OBv3 and w3c Verifiable Credentials and is interoperable with at least two other solutions.  This was demonstrated successfully during JFF x vc-edu PlugFest 2.",
          criteria: {
            narrative: "Solutions providers earned this badge by demonstrating interoperability between multiple providers based on the OBv3 candidate final standard, with some additional required fields. Credential issuers earning this badge successfully issued a credential into at least two wallets.  Wallet implementers earning this badge successfully displayed credentials issued by at least two different credential issuers."
          },
          image: {
            id: "https://w3c-ccg.github.io/vc-ed/plugfest-2-2022/images/JFF-VC-EDU-PLUGFEST2-badge-image.png",
            type: "Image"
          }
        }
      }
    }
  */