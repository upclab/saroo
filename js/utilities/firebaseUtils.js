export function snapshotToArray(snapshot) {
  const returnArr = [];

  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
}

export function snapshotToObject(snapshot) {
  const returnObj = snapshot.val();
  returnObj.key = snapshot.key;
  return returnObj;
}

export function objectToArray(firebaseObject) {
  const returnArr = [];

  Object.keys(firebaseObject).forEach((key) => {
    const item = firebaseObject[key];
    item.key = key;
    returnArr.push(item);
  });

  return returnArr;
}
