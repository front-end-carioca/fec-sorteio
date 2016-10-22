import runSequence from 'run-sequence';
module.exports = (callback) => runSequence(
  'dist',
  'server',
  callback
);
