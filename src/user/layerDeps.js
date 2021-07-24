const inAws = !!process.env.AWS_REGION;

const usersTable = inAws ? require('/opt/nodejs/tables/usersTable') : require('../_layers/common/tables/usersTable');
const User = inAws ? require('/opt/nodejs/models/User') : require('../_layers/common/models/User');

module.exports = {
  usersTable,
  User,
}