function aliasGenerator() {
  return Math.random().toString(36).slice(2);
}

function choiceGenerator() {
  const choices = require('./gameChoices.json');
  return choices[Math.floor(Math.random() * choices.length)];
}

module.exports = {
  aliasGenerator,
  choiceGenerator
}