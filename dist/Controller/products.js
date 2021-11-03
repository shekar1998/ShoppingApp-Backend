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
exports.UpdateProductImages = exports.UpdateProduct = exports.DeleteProducts = exports.CreateProducts = exports.GetFeaturedProduct = exports.GetProductCount = exports.GetProductsById = exports.GetProducts = exports.uploadImageArray = exports.uploadImage = void 0;
var products_1 = __importDefault(require("../Model/products"));
var mongoose_1 = __importDefault(require("mongoose"));
var multer_1 = __importDefault(require("multer"));
var mime_1 = __importDefault(require("mime"));
var FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var isValid = FILE_TYPE_MAP[file.mimetype];
        var uploadError = new Error('invalid image type');
        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, './public/Image');
    },
    filename: function (req, file, cb) {
        var fileName = file.originalname.split(' ').join('-');
        var extension = mime_1.default.extension(file);
        cb(null, fileName + "-" + Date.now() + "." + extension);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
exports.uploadImage = upload.single('image');
exports.uploadImageArray = upload.array('images', 10);
var GetProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, products, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('Entering Get Products');
                filter = {};
                if (req.query.categories) {
                    filter = { category: req.query.categories.split(',') };
                }
                return [4 /*yield*/, products_1.default.find(filter).populate('catogery')];
            case 1:
                products = _a.sent();
                res.send(products);
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
exports.GetProducts = GetProducts;
var GetProductsById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!mongoose_1.default.isValidObjectId(req.params.id)) {
                    return [2 /*return*/, res.status(400).json({
                            status: 'Invalid Id',
                        })];
                }
                return [4 /*yield*/, products_1.default.find({ _id: req.params.id }).populate('category')];
            case 1:
                products = _a.sent();
                res.send(products);
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
exports.GetProductsById = GetProductsById;
var GetProductCount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, products_1.default.countDocuments(function (count) { return count; })];
            case 1:
                products = _a.sent();
                res.send({
                    ProductCount: products,
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
exports.GetProductCount = GetProductCount;
var GetFeaturedProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var count, products, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                count = req.params.count ? req.params.count : 0;
                return [4 /*yield*/, products_1.default.find({ isFeatured: true }).limit(+count)];
            case 1:
                products = _a.sent();
                res.send(products);
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
exports.GetFeaturedProduct = GetFeaturedProduct;
var CreateProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, path, products, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log('Req => ', req.file.filename);
                if (!req.file.filename) {
                    return [2 /*return*/, res.status(500).json({
                            status: 'No Image is Uploaded',
                        })];
                }
                name_1 = req.file.filename;
                path = req.protocol + "://" + req.get('host') + "/public/Image/";
                return [4 /*yield*/, products_1.default.create(__assign(__assign({}, req.body), { image: "" + path + name_1 }))];
            case 1:
                products = _a.sent();
                if (!products) {
                    return [2 /*return*/, res.status(500).json({
                            status: 'Products cannot be created',
                        })];
                }
                res.status(200).json({
                    status: 'Successful',
                });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                console.log(err_5);
                res.json({
                    status: 'Failed!',
                    message: err_5,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CreateProducts = CreateProducts;
var DeleteProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!mongoose_1.default.isValidObjectId(req.params.id)) {
                    return [2 /*return*/, res.status(400).json({
                            status: 'Invalid Id',
                        })];
                }
                return [4 /*yield*/, products_1.default.findByIdAndRemove(req.params.id)];
            case 1:
                _a.sent();
                res.status(200).json({
                    status: 'Successful',
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
exports.DeleteProducts = DeleteProducts;
var UpdateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_2, path, products, products, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!mongoose_1.default.isValidObjectId(req.params.id)) {
                    return [2 /*return*/, res.status(400).json({
                            status: 'Invalid Id',
                        })];
                }
                if (!req.file.filename) return [3 /*break*/, 2];
                name_2 = req.file.filename;
                path = req.protocol + "://" + req.get('host') + "/public/Image/" + name_2;
                console.log('Entering => ', path);
                return [4 /*yield*/, products_1.default.findByIdAndUpdate(req.params.id, { image: path }, { new: true })];
            case 1:
                products = _a.sent();
                res.send(products);
                return [3 /*break*/, 4];
            case 2:
                console.log('No File');
                return [4 /*yield*/, products_1.default.findByIdAndUpdate(req.params.id, __assign({}, req.body), { new: true })];
            case 3:
                products = _a.sent();
                res.send(products);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_7 = _a.sent();
                console.log(err_7);
                res.json({
                    status: 'Failed!',
                    message: err_7.message,
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.UpdateProduct = UpdateProduct;
var UpdateProductImages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var files, path_1, ImagePaths_1, products, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!mongoose_1.default.isValidObjectId(req.params.id)) {
                    return [2 /*return*/, res.status(400).json({
                            status: 'Invalid Id',
                        })];
                }
                files = req.files;
                path_1 = req.protocol + "://" + req.get('host') + "/public/Image/";
                ImagePaths_1 = [];
                if (files) {
                    files.map(function (file) {
                        ImagePaths_1.push("" + path_1 + file.filename);
                    });
                }
                return [4 /*yield*/, products_1.default.findByIdAndUpdate(req.params.id, { images: ImagePaths_1 }, { new: true })];
            case 1:
                products = _a.sent();
                res.send(products);
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                console.log(err_8);
                res.json({
                    status: 'Failed!',
                    message: err_8.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.UpdateProductImages = UpdateProductImages;
