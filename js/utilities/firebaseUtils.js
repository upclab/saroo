export default function (snapshot) {
  const returnArr = [];

  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
}
