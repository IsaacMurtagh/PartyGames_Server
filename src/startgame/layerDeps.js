const inAws = !!process.env.AWS_REGION;

const connectionsTable = inAws ? require('/opt/nodejs/tables/connectionsTable') : require('../_layers/common/tables/connectionsTable');
const SocketManager = inAws ? require('/opt/nodejs/SocketManager') : require('../_layers/common/SocketManager');

module.exports = {
  SocketManager,
  connectionsTable,
}