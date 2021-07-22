const inAws = !!process.env.AWS_REGION;

try {
  const connectionsTable = inAws ? require('/opt/nodejs/tables/connectionsTable') : require('../_layers/common/tables/connectionsTable');
  const gamesTable = inAws ? require('/opt/nodejs/tables/gamesTable') : require('../_layers/common/tables/gamesTable');
  const SocketManager = inAws ? require('/opt/nodejs/SocketManager') : require('../_layers/common/SocketManager');
  const handleGracefully = inAws ? require('/opt/nodejs/utils/handleGracefully') : require('../_layers/common/utils/handleGracefully');

  module.exports = {
    connectionsTable,
    gamesTable,
    SocketManager,
    handleGracefully
  }
} catch(err) {
  console.log(err);
}