"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.ValidationError = exports.UnAuthenticatedError = exports.NotAnOwnerError = void 0;
var NotAnOwnerError_1 = require("./NotAnOwnerError");
Object.defineProperty(exports, "NotAnOwnerError", { enumerable: true, get: function () { return __importDefault(NotAnOwnerError_1).default; } });
var UnAuthenticatedError_1 = require("./UnAuthenticatedError");
Object.defineProperty(exports, "UnAuthenticatedError", { enumerable: true, get: function () { return __importDefault(UnAuthenticatedError_1).default; } });
var ValidationError_1 = require("./ValidationError");
Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function () { return __importDefault(ValidationError_1).default; } });
var ForbiddenError_1 = require("./ForbiddenError");
Object.defineProperty(exports, "ForbiddenError", { enumerable: true, get: function () { return __importDefault(ForbiddenError_1).default; } });
//# sourceMappingURL=index.js.map