"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../app/modules/user/user.router");
const academicSemister_router_1 = require("../app/modules/academicSemister/academicSemister.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        router: '/users/',
        path: user_router_1.UserRouter,
    },
    {
        router: '/academic-semisters/',
        path: academicSemister_router_1.AcademicSemisterRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.router, route.path));
exports.default = router;
