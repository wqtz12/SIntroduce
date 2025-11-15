
const admin = require('firebase-admin');
require('dotenv').config();

async function checkDatabase() {
  // 1. Initialize Firebase Admin
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountString) {
    console.error('FIREBASE_SERVICE_ACCOUNT 환경 변수를 찾을 수 없습니다.');
    return;
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    if (admin.apps.length === 0) { // Prevent re-initialization error
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://fir-101-e0467-default-rtdb.firebaseio.com"
      });
    }
  } catch (error) {
    console.error('Firebase 초기화 중 오류 발생:', error);
    return;
  }

  // 2. Read data from Realtime Database
  const db = admin.database();
  const experiencesRef = db.ref('experiences');

  console.log("'experiences' 경로에서 데이터를 조회합니다...");

  try {
    const snapshot = await experiencesRef.once('value');
    const data = snapshot.val();

    if (data) {
      console.log("데이터 조회 성공:");
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log("'experiences' 경로에 데이터가 없습니다.");
    }
  } catch (error) {
    console.error("데이터 조회 중 오류가 발생했습니다:", error);
  } finally {
    // 데이터베이스 연결을 명시적으로 닫아 스크립트가 종료되도록 합니다.
    admin.app().delete().then(() => {
      console.log('Firebase 앱이 종료되었습니다.');
    });
  }
}

checkDatabase();
