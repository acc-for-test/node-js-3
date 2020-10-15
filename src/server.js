const { PORT } = require('./common/config');
const app = require('./app');
const { errorLog, accessLog } = require('./common/logger');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process
  .on('unhandledRejection', (reason, promise) => {
    errorLog.log('error', `unhandledRejection: ${reason.message}`);
    process.exit(1);
  })
  .on('uncaughtException', (err, origin) => {
    errorLog.log('error', `uncaughtException: ${err.message}`);
    process.exit(1);
  });
