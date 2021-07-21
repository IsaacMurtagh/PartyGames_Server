const inAws = !!process.env.AWS_REGION;

try {
  const connectionsTable = inAws ? require('/opt/nodejs/tables/connectionsTable') : require('../_layers/common/tables/connectionsTable');
  const Connection = inAws ? require('/opt/nodejs/models/Connection') : require('../_layers/common/models/Connection');
  const SocketManager = inAws ? require('/opt/nodejs/SocketManager') : require('../_layers/common/SocketManager');
  const handleGracefully = inAws ? require('/opt/nodejs/utils/handleGracefully') : require('../_layers/common/utils/handleGracefully');

  module.exports = {
    connectionsTable,
    Connection,
    SocketManager,
    handleGracefully
  }
} catch(err) {
  console.log(err);
}