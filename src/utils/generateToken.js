export default function generateRandomToken() {
  return   ("" + Math.random()).substring(2, 10);
}