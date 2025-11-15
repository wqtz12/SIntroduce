
const admin = require('firebase-admin');
require('dotenv').config();

async function countDatabaseEntries() {
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

  // 2. Get a reference to the 'experiences' path
  const db = admin.database();
  const experiencesRef = db.ref('experiences');

  console.log("'experiences' 경로의 데이터 개수를 세는 중입니다...");

  try {
    const snapshot = await experiencesRef.once('value');
    const numChildren = snapshot.numChildren();

    if (numChildren > 0) {
      console.log(`조회 성공: 'experiences' 경로에는 총 ${numChildren}개의 데이터가 있습니다.`);
      if (numChildren > 1000) {
          console.log("진단: 데이터의 양이 매우 많아 전체를 한 번에 읽어오는 데 시간이 오래 걸리는 것으로 보입니다.");
      }
    } else {
      console.log("'experiences' 경로에 데이터가 없습니다.");
    }
  } catch (error) {
    console.error("데이터 개수 조회 중 오류가 발생했습니다:", error);
  }
}

countDatabaseEntries();
