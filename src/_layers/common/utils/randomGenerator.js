function aliasGenerator() {
  return Math.random().toString(36).slice(2).toUpperCase();
}

module.exports = {
  aliasGenerator,
}