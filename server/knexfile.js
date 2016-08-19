module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'cahoots_db'

    }
  },
  production: {
  	client: 'pg',
    connection: {
      database: 'cahoots_db',
      host: 'cahootsdb.cnusdpqarpmx.us-west-2.rds.amazonaws.com',
      user: 'GavanizeComp',
      password: 'yogsoth30'
    }
  }
}
//ssh -i ./ghost-ubuntu.pem ubuntu@solarcrusaders.com  <-- this is the command to get to the remote command prompt (has to be run from the same directory as the pem file)