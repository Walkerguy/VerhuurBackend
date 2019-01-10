// Environment variabelen.
var env = 
{
    webPort:        process.env.PORT || 3000,
    dbHost:         process.env.DB_HOST || 'localhost',
    dbPort:         process.env.DB_PORT || '',
    dbUser:         process.env.DB_USER || '',
    dbPassword:     process.env.DB_PASSWORD || '',
    dbDatabase:     process.env.DB_DATABASE || ''
}

module.exports = 
{
    env: env,
    dburl: "mongodb://" + env.dbUser + ":" + env.dbPassword + "@" + env.dbHost + ":" + env.dbPort + "/" + env.dbDatabase
    //dburl: "mongodb://" + env.dbUser + ":" + env.dbPassword + "@ds029585.mlab.com:29585/mongodb_project"
};