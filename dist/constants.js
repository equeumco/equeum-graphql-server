"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles["UNVERIFIED"] = "UNVERIFIED";
    UserRoles["LIMITED"] = "LIMITED";
    UserRoles["USER"] = "USER";
    UserRoles["BETA_TESTER"] = "BETA_TESTER";
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["MACHINE"] = "MACHINE";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
;
exports.NODE_ENV = process.env.NODE_ENV || 'dev';
//# sourceMappingURL=constants.js.map