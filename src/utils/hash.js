import brypt from 'bcrypt';

async function hashPassword(password) {
  const salt = await brypt.genSalt(10);
  const hashed = await brypt.hash(password, salt);
  return hashed;
}

export default hashPassword;