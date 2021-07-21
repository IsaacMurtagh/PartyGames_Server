const inAws = !!process.env.AWS_REGION;

try {
  const usersTable = inAws ? require('/opt/nodejs/tables/usersTable') : require('../_layers/common/tables/usersTable');
  const User = inAws ? require('/opt/nodejs/models/User') : require('../_layers/common/models/User');
  const handleGracefully = inAws ? require('/opt/nodejs/utils/handleGracefully') : require('../_layers/common/utils/handleGracefully');

  module.exports = {
    usersTable,
    User,
    handleGracefully
  }
} catch(err) {
  console.log(err);
}