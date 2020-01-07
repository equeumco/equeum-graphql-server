"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const getVersionNumber = () => {
    const packageFile = fs_1.default.readFileSync(`${__dirname}/../../package.json`, 'utf8');
    const { version } = JSON.parse(packageFile);
    return version;
};
exports.default = getVersionNumber;
//# sourceMappingURL=getPackageVersion.js.map