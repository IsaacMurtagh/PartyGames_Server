
async function timeout( timeMs ) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeMs)
  })
}

module.exports = timeout;