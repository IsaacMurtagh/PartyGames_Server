const inAws = !!process.env.AWS_REGION;

const usersTable = inAws ? require('/opt/nodejs/tables/usersTable') : require('../_layers/common/tables/usersTable');
const gamesTable = inAws ? require('/opt/nodejs/tables/gamesTable') : require('../_layers/common/tables/gamesTable');
const User = inAws ? require('/opt/nodejs/models/User') : require('../_layers/common/models/User');
const Answer = inAws ? require('/opt/nodejs/models/Answer') : require('../_layers/common/models/Answer');

module.exports = {
  usersTable,
  gamesTable,
  User,
  Answer,
}