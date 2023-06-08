"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
const logger_1 = require("./shared/logger");
// Handling uncaught exceptions
process.on('uncaughtException', error => {
    logger_1.errorlogger.error(error);
    process.exit(1);
});
let server;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the database
            yield mongoose_1.default.connect(index_1.default.database_url);
            logger_1.logger.info('✅ Database connected successfully');
            // Start the server
            server = app_1.default.listen(index_1.default.port, () => {
                logger_1.logger.info(`Application listening on port ${index_1.default.port}`);
            });
        }
        catch (err) {
            // Log error if database connection fails
            logger_1.errorlogger.error('❌ Failed to connect database.', err);
        }
        // Gracefully shutting down the server in case of unhandled rejection
        process.on('unhandledRejection', error => {
            logger_1.errorlogger.error(error);
            if (server) {
                // Close the server and log the error
                server.close(() => {
                    logger_1.errorlogger.error(error);
                    process.exit(1);
                });
            }
            else {
                // If server is not available, exit the process
                process.exit(1);
            }
        });
    });
}
// Call the bootstrap function to start the application
bootstrap();
// Handling SIGTERM signal
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM is received.');
    if (server) {
        // Close the server gracefully
        server.close();
    }
});
