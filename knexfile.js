
module.exports = {

  /**
   * Node bindings for mariasql won't build on Ubuntu 16 
   * perhaps we're running out of memory?
   * For now / for the demo use sqlite as a replacement since it's bindings build fine
   */
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
