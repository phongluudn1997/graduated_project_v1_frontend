export default function TransforToFormData(object) {
  const data = new FormData();
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      data.set(key, object[key]);
    }
  }
  return data;
}
