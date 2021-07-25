'use strict';
require('aws-sdk');

exports.handler = async (event, context) => {
  try {
    const game = await require('./handlers/startGame').handler(event);
  } catch(err) {
    console.error(err);
    return;
  }
}