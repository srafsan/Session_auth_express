"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.appConfig = {
    sessionLifeTime: process.env.SESSION_SECRET_LIFETIME || 3600,
    sessionName: process.env.SESSION_SECRET_NAME || "session_name",
    sessionSecret: process.env.SESSION_SECRET_SECRET || 'mysecret',
    port: process.env.PORT || 3000,
    apiPath: '/api',
    appDesc: "this is a boilerplate of express js",
    teplatePath: 'templates'
};
