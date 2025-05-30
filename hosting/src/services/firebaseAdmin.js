import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
  await readFile(new URL('., import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function setAdminClaim(uid) {
  await admin.auth().setCustomUserClaims(uid, { isAdmin: true });
  console.log("Admin claim definido com sucesso");
}

// Substitua com o UID real do admin
setAdminClaim("aZrCQFAcjKaO7G4L7uq5mNurrg82");

const db = getFirestore();

export { admin, db };


