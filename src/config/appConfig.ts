import dotenv from "dotenv";
dotenv.config();


interface IApp {
    sessionLifeTime: string | number,
    sessionName: string,
    sessionSecret : string,
    apiPath?: string,
    appDesc?: string,
    teplatePath?: string,
    port?: string | number,
    musqlUser?: string,
    mysqlPass?: string,
    mysqlPort?: string | number
}

export const appConfig:IApp = {
    sessionLifeTime: process.env.SESSION_SECRET_LIFETIME || 3600,
    sessionName : process.env.SESSION_SECRET_NAME || "session_name",
    sessionSecret : process.env.SESSION_SECRET_SECRET || 'mysecret',
    port : process.env.PORT || 3000,
    apiPath: '/api',
    appDesc: "this is a boilerplate of express js",
    teplatePath: 'templates'
}