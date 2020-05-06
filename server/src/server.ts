import app from './app';

const server = app.listen(3000, () => {
/* eslint-disable no-console */
  console.log(
    'App is running at http://localhost:3000',
  );
/* eslint-enable no-console */
});
export default server;
