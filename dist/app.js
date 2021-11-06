"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var connection_to_db_1 = __importDefault(require("./connection-to-db"));
var dotenv_1 = __importDefault(require("dotenv"));
var jwt_1 = require("./Helper/jwt");
var errorHandler_1 = require("./Helper/errorHandler");
dotenv_1.default.config();
//Routes
var categoriesRoutes = require('./Routes/categories');
var productsRoutes = require('./Routes/products');
var usersRoutes = require('./Routes/users');
var ordersRoutes = require('./Routes/orders');
var startServer = function () {
    var app = express_1.default();
    var api = process.env.API_URL;
    app.use(express_1.default.json());
    app.use(cors_1.default());
    app.use(jwt_1.ExpressJwt());
    app.use(errorHandler_1.ErrorHandler);
    app.use('/public/Image', express_1.default.static(__dirname + '/public/Image'));
    connection_to_db_1.default()
        .then(function () {
        console.log('Connected to database');
        var server = app.listen(process.env.PORT || 4000, function () {
            var port = server.address();
            console.log("Server Running at " + port.port);
        });
    })
        .catch(function (err) {
        console.log(err.message);
    });
    app.use(api + "/categories", categoriesRoutes);
    app.use(api + "/products", productsRoutes);
    app.use(api + "/users", usersRoutes);
    app.use(api + "/orders", ordersRoutes);
};
startServer();
