// layer dependencies that come from a variable location
// depending on if running locally or inside aws.
const inAws = !!process.env.AWS_REGION;

const connectionsTable = inAws ? require('/opt/nodejs/tables/connectionsTable') : require('../_layers/common/tables/connectionsTable');
const Connection = inAws ? require('/opt/nodejs/models/Connection') : require('../_layers/common/models/Connection');

module.exports = {
  connectionsTable,
  Connection,
}