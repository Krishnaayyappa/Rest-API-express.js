const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');
const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');


async function add(data1) {
  // const storedData = await readData();
  // const userId = generateId();
  const hashedPw = await hash(data1.password, 12);
  // storedData.users.push({ ...data, password: hashedPw, id: userId });
  const encryptedData = {...data1, password:hashedPw}
  const data = await writeData(encryptedData);
  return encryptedData;
}

async function get(email) {
  const data = await readData(email);
  console.log(data)
  if (data.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user =  data[0];
  console.log(user);
  return user;
}

exports.add = add;
exports.get = get;
