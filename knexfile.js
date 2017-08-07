
module.exports = {

  development: {
    client: 'mariasql',
    connection: {
      host : '127.0.0.1',
      user : process.env.dbuser,
      password : process.env.dbpasswd,
      db : 'iot' 
    }
  }
};
