// layer dependencies that come froma  variable location
// depending on if running locally or inside aws.
const inAws = !!process.env.AWS_REGION;

const usersTable = inAws ? require('/opt/nodejs/tables/usersTable') : require('../_layers/common/tables/usersTable');
const gamesTable = inAws ? require('/opt/nodejs/tables/gamesTable') : require('../_layers/common/tables/gamesTable');

const User = inAws ? require('/opt/nodejs/models/User') : require('../_layers/common/models/User');
const Game = inAws ? require('/opt/nodejs/models/Game') : require('../_layers/common/models/Game');



module.exports = {
  usersTable,
  gamesTable,
  User,
  Game,
}