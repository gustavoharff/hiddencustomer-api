import { createConnection } from 'typeorm';

createConnection().then(
  connection => connection.isConnected && console.log('Database connected!'),
);
