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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path = require("path");
var hbs = require("hbs");
var forcast_1 = require("./utils/forcast");
var geoCode_1 = require("./utils/geoCode");
var app = (0, express_1.default)();
// const forcast = require("./utils/forcast");
// const geoCode = require("./utils/geoCode");
// defined path for express config
// servers the html files from the location ../public
var publicDirectoryPath = path.join(__dirname, "../public");
var viewPath = path.join(__dirname, "/templates/views");
var partialsPath = path.join(__dirname, "/templates/partials");
// setup handlebars engine and views location
// no routes eg /help, /about is needed as the html is served using __dirname as /about.html & /help.html
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express_1.default.static(publicDirectoryPath));
app.get("", function (req, res) {
    res.render("index", {
        title: "Weather App",
        name: "G",
    });
});
app.get("/about", function (req, res) {
    res.render("about", {
        title: "About Me",
        name: "G",
    });
});
app.get("/help", function (req, res) {
    res.render("help", {
        title: "Help",
        helpText: "this is the help message",
        name: "G",
    });
});
app.get("/weather", (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var geoData, forecastData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.query.address) {
                    res.send({
                        error: "You must provide an address term",
                    });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, geoCode_1.geoCode)(req.query.address)];
            case 2:
                geoData = _a.sent();
                return [4 /*yield*/, (0, forcast_1.forecast)(geoData.lat, geoData.long)];
            case 3:
                forecastData = _a.sent();
                res.send({
                    forecast: forecastData,
                    location: geoData.location,
                    address: req.query.address,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.send({
                    error: error_1 instanceof Error ? error_1.message : 'An error occurred',
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }));
app.get("/products", (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!req.query.search) {
            return [2 /*return*/, res.send({
                    error: "You must provide a search term",
                })];
        }
        console.log(req.query.search);
        res.send({
            products: [],
        });
        return [2 /*return*/];
    });
}); }));
app.get("/help/*", function (req, res) {
    res.render("404", {
        title: "404",
        name: "G",
        errorMessage: "Help article not found",
    });
});
app.get("*", function (req, res) {
    res.render("404", {
        title: "404",
        name: "G",
        errorMessage: "Page not found",
    });
});
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
// run - node run start - at web-server>
