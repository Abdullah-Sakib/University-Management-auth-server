'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemisterService = void 0;
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const academicSemister_constants_1 = require('./academicSemister.constants');
const academicSemister_model_1 = require('./academicSemister.model');
const http_status_1 = __importDefault(require('http-status'));
const createSemister = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      academicSemister_constants_1.AcademicSemisterTitleCodeMapper[
        payload.title
      ] !== payload.code
    ) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid semister code'
      );
    }
    const result = yield academicSemister_model_1.AcademicSemister.create(
      payload
    );
    return result;
  });
exports.AcademicSemisterService = {
  createSemister,
};
