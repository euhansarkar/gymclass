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
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = void 0;
const encryptPassword = (params, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if (params.action === 'create' && params.model === 'User') {
    //   const user = params.args.data;
    //   const salt = bcrypt.genSaltSync(10);
    //   const hash = bcrypt.hashSync(user.password, salt);
    //   user.password = hash;
    // }
    return yield next(params);
});
exports.encryptPassword = encryptPassword;
