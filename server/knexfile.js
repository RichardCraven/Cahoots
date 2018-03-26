module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'cahootsDB',
      host: '18.217.62.59 ',
      user: 'richardcraven',
      password: '12345678'
    }
  },
  production: {
  	client: 'pg',
    connection: {
      database: 'cahootsDB',
      host: '18.217.62.59 ',
      user: 'richardcraven',
      password: '12345678'
    }
  }
}
//ssh -i ./ghost-ubuntu.pem ubuntu@solarcrusaders.com  <-- this is the command to get to the remote command prompt (has to be run from the same directory as the pem file)