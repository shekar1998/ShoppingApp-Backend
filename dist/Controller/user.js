"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsers = exports.DeleteUsers = exports.GetUserCount = exports.Login = exports.Register = exports.getUSersById = exports.getUSers = void 0;
var user_1 = __importDefault(require("../Model/user"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
var getUSers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Entering Users");
                return [4 /*yield*/, user_1.default.find({})];
            case 1:
                users = _a.sent();
                if (!users) {
                    return [2 /*return*/, res.status(400).json({
                            status: 'No Users',
                        })];
                }
                res.send(users);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                res.json({
                    status: 'Failed!',
                    message: err_1.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUSers = getUSers;
var getUSersById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.findById(req.params.id).select('-passwordHash')];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(500).json({ message: 'The user with the given ID was not found.' });
                }
                res.status(200).send(user);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                res.json({
                    status: 'Failed!',
                    message: err_2.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUSersById = getUSersById;
var Register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userSignin, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(req.body);
                return [4 /*yield*/, user_1.default.create({
                        name: req.body.name,
                        email: req.body.email,
                        passwordHash: bcryptjs_1.default.hashSync(req.body.passwordHash, 10),
                        phone: req.body.phone,
                        isAdmin: req.body.isAdmin,
                        street: req.body.street,
                        zip: req.body.zip,
                        city: req.body.city,
                        country: req.body.country,
                        Image: req.body.Image
                    })];
            case 1:
                userSignin = _a.sent();
                if (!userSignin) {
                    return [2 /*return*/, res.status(400).json({
                            status: 'Cannot Create',
                        })];
                }
                res.send(userSignin);
                res.status(200).json({
                    status: 'Successful',
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log(err_3);
                res.json({
                    status: 'Failed!',
                    message: err_3.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.Register = Register;
var Login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, secret, token, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(req.body);
                return [4 /*yield*/, user_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                secret = process.env.SECRET_KEY;
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ status: 'No User Found' })];
                }
                if (user && bcryptjs_1.default.compareSync(req.body.password, user.passwordHash)) {
                    token = jsonwebtoken_1.default.sign({ userId: user._id, isAdmin: user.isAdmin }, secret, { expiresIn: '1d' });
                    res.status(200).send({ user: user, token: token });
                }
                else {
                    return [2 /*return*/, res.status(400).json({ status: 'password is wrong' })];
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.log(err_4);
                res.json({
                    status: 'Failed!',
                    message: err_4.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.Login = Login;
var GetUserCount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.countDocuments(function (count) { return count; })];
            case 1:
                user = _a.sent();
                res.send({
                    ProductCount: user,
                });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                console.log(err_5);
                res.json({
                    status: 'Failed!',
                    message: err_5.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetUserCount = GetUserCount;
var DeleteUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!mongoose_1.default.isValidObjectId(req.params.id)) {
                    return [2 /*return*/, res.status(400).json({
                            status: 'Invalid Id',
                        })];
                }
                return [4 /*yield*/, user_1.default.findByIdAndRemove(req.params.id)];
            case 1:
                user = _a.sent();
                res.status(200).json({
                    status: 'Successfully deleted',
                });
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                console.log(err_6);
                res.json({
                    status: 'Failed!',
                    message: err_6.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeleteUsers = DeleteUsers;
var UpdateUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!mongoose_1.default.isValidObjectId(req.params.id)) {
                    return [2 /*return*/, res.status(400).json({
                            status: 'Invalid Id',
                        })];
                }
                console.log(req.params);
                console.log(req.body);
                return [4 /*yield*/, user_1.default.findByIdAndUpdate(req.params.id, __assign({}, req.body), { new: true })];
            case 1:
                user = _a.sent();
                res.send(user);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                console.log(err_7);
                res.json({
                    status: 'Failed!',
                    message: err_7.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.UpdateUsers = UpdateUsers;
