// Environment variabelen.
var env = 
{
    webPort:        process.env.PORT || 3000,
    dbHost:         process.env.DB_HOST || 'localhost',
    dbPort:         process.env.DB_PORT || '',
    dbUser:         process.env.DB_USER || '',
    dbPassword:     process.env.DB_PASSWORD || '',
    dbDatabase:     process.env.DB_DATABASE || 'Tools'
}

module.exports = 
{
    env: env,
    dburl: "mongodb://" + env.dbUser + ":" + env.dbPassword + "@" + env.dbHost + ":" + env.dbPort + "/" + env.dbDatabase,
    secret:  process.env.secret
};