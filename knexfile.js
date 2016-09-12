module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'pyb_robots',
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.CLEARDB_DATABASE_URL || '',
      user: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
    }
  }
};
