export default [
    
    /*
    NEXT:  add different signing keys to file, and choose based on issuer URI.

    To handle different signing DIDs, use the issuerURL to look up the signing DID. I guess there'd be a collection
    of suites, one per signing key.  Hmmmm, maybe another file then called dids.txt that contains the seeds, like so:
    DCC_TEST_ISSUER: theSeedGoesHere
    UNREGISTERED_TEST_ISSUER: theSeedGoesHere

    Add properties:  expiry, status (e.g., revoked i.e, to indicate that the cred should be immediately revoked.), 

    */
        {
            displayTitle: 'Badge',
            displaySubtitle: 'Fully Valid',
            type: 'degree',
            expirationDate: '2025-12-20T22:42:27.438Z',
            holderName: 'Ian Malcom',
            issuerName: 'Digital Credentials Consortium Test Issuer',
            issuerImage: 'https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png',
          //  credImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Diagram_for_the_computation_of_Bernoulli_numbers.jpg/440px-Diagram_for_the_computation_of_Bernoulli_numbers.jpg',
            issuerURL: "https://www.dcconsortium.org/",
            issuerKey: 'DCC',
            title: 'Sample Credential',
            grantedDate: '2023',
            description: `This is a sample credential issued by the Digital Credentials Consortium to demonstrate the functionality of Verifiable Credentials for wallets and verifiers.`,
            achievementName: `Badge`,
            achievementType: `Badge`,
            criteria: `This credential has the following criteria - achievementType Badge, no subjectName, exists in issuer registry, not revoked, not expired, linked issuer image.`
        },
        {
            displayTitle: 'Badge',
            type: 'badge',
            displaySubtitle: 'Unregistered Signer',
            expirationDate: '2025-12-20T22:42:27.438Z',
            holderName: 'Ian Malcom',
            issuerName: 'Digital Credentials Consortium Test Issuer',
            issuerImage: 'https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png',
          //  credImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Diagram_for_the_computation_of_Bernoulli_numbers.jpg/440px-Diagram_for_the_computation_of_Bernoulli_numbers.jpg',
            issuerURL: "https://www.dcconsortium.org/",
            issuerKey: 'DCC_UNREGISTERED',
            title: 'Sample Credential',
            grantedDate: '2023',
            description: `This is a sample credential issued by the Digital Credentials Consortium to demonstrate the functionality of Verifiable Credentials for wallets and verifiers.`,
            achievementName: `Badge`,
            achievementType: `Badge`,
            criteria: `This credential has the following criteria - achievementType Badge, no subjectName, not registered in issuer registry, not revoked, not expired, linked issuer image.`
        },
        {
            displayTitle: 'Badge',
            displaySubtitle: 'Expired',
            type: 'badge',
            test: 'expired',
            expirationDate: '2025-12-20T22:42:27.438Z',
            holderName: 'Ian Malcom',
            issuerName: 'Digital Credentials Consortium Test Issuer',
            issuerImage: 'https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png',
          //  credImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Diagram_for_the_computation_of_Bernoulli_numbers.jpg/440px-Diagram_for_the_computation_of_Bernoulli_numbers.jpg',
            issuerURL: "https://www.dcconsortium.org/",
            issuerKey: 'DCC',
            title: 'Sample Credential',
            grantedDate: '2023',
            description: `This is a sample credential issued by the Digital Credentials Consortium to demonstrate the functionality of Verifiable Credentials for wallets and verifiers.`,
            achievementName: `Badge`,
            achievementType: `Badge`,
            criteria: `This credential has the following criteria - achievementType Badge, no subjectName, registered in issuer registry, not revoked, expired, linked issuer image.`
        },
        {
            displayTitle: 'Badge',
            displaySubtitle: 'Invalid Signature (tampered)',
            type: 'degree',
            test: 'tampered',
            expirationDate: '2025-12-20T22:42:27.438Z',
            holderName: 'Ian Malcom',
            issuerName: 'Digital Credentials Consortium Test Issuer',
            issuerImage: 'https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png',
          //  credImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Diagram_for_the_computation_of_Bernoulli_numbers.jpg/440px-Diagram_for_the_computation_of_Bernoulli_numbers.jpg',
            issuerURL: "https://www.dcconsortium.org/",
            issuerKey: 'DCC',
            title: 'Sample Credential',
            grantedDate: '2023',
            description: `This is a sample credential issued by the Digital Credentials Consortium to demonstrate the functionality of Verifiable Credentials for wallets and verifiers.`,
            achievementName: `Badge`,
            achievementType: `Badge`,
            criteria: `This credential has the following criteria - achievementType Badge, no subjectName, invalid signature, registered in issuer registry, not revoked, not expired, linked issuer image.`
        }
    
]