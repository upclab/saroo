export default function (collection) {
  const keys = Object.keys(collection);
  return keys.length > 0 ? keys[0] : null;
}
