const inAws = !!process.env.AWS_REGION;

const connectionsTable = inAws ? require('/opt/nodejs/tables/connectionsTable') : require('../_layers/common/tables/connectionsTable');
const gamesTable = inAws ? require('/opt/nodejs/tables/gamesTable') : require('../_layers/common/tables/gamesTable');
const usersTable = inAws ? require('/opt/nodejs/tables/usersTable') : require('../_layers/common/tables/usersTable');
const Connection = inAws ? require('/opt/nodejs/models/Connection') : require('../_layers/common/models/Connection');
const Participant = inAws ? require('/opt/nodejs/models/Participant') : require('../_layers/common/models/Participant');
const SocketManager = inAws ? require('/opt/nodejs/SocketManager') : require('../_layers/common/SocketManager');

module.exports = {
  Connection,
  Participant,
  SocketManager,
  connectionsTable,
  gamesTable,
  usersTable
}