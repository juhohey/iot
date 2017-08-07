
module.exports = {

  mariadb: {
    client: 'mariasql',
    connection: {
      host : '127.0.0.1',
      user : process.env.dbuser,
      password : process.env.dbpasswd,
      db : 'iot' 
    }
  },
  development:{
    client: 'sqlite3',
    connection: {
      filename: "./iot.sqlite"
    }
  }
};
