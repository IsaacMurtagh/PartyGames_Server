const inAws = !!process.env.AWS_REGION;

try {
  const connectionsTable = inAws ? require('/opt/nodejs/tables/connectionsTable') : require('../_layers/common/tables/connectionsTable');
  const gamesTable = inAws ? require('/opt/nodejs/tables/gamesTable') : require('../_layers/common/tables/gamesTable');
  const usersTable = inAws ? require('/opt/nodejs/tables/usersTable') : require('../_layers/common/tables/usersTable');
  const Connection = inAws ? require('/opt/nodejs/models/Connection') : require('../_layers/common/models/Connection');
  const Participant = inAws ? require('/opt/nodejs/models/Participant') : require('../_layers/common/models/Participant');
  const SocketManager = inAws ? require('/opt/nodejs/SocketManager') : require('../_layers/common/SocketManager');
  const handleGracefully = inAws ? require('/opt/nodejs/utils/handleGracefully') : require('../_layers/common/utils/handleGracefully');

  module.exports = {
    Connection,
    Participant,
    SocketManager,
    handleGracefully,
    connectionsTable,
    gamesTable,
    usersTable
  }
} catch(err) {
  console.log(err);
}