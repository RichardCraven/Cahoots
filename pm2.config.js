module.exports = {
  apps : [
      {
        name: "cahoots",
        script: "./server/app.js",
        watch: true,
        env: {
            "NODE_ENV": "development"
        },
        env_production: {
            "NODE_ENV": "production",
        }
      }
  ]
}
