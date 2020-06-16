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
exports.__esModule = true;
var cheer = require("cheerio");
var got_1 = require("got");
exports["default"] = (function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var loginPage, $, ticket, tempCookie, finalCookie;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, got_1["default"].get("https://login.bit.edu.cn/cas/login?service=http%3A%2F%2Flexue.bit.edu.cn%2Flogin%2Findex.php", {
                    followRedirect: false
                })];
            case 1:
                loginPage = _a.sent();
                $ = cheer.load(loginPage.body);
                return [4 /*yield*/, got_1["default"].post("https://login.bit.edu.cn/cas/login?service=http%3A%2F%2Flexue.bit.edu.cn%2Flogin%2Findex.php", {
                        followRedirect: false,
                        form: {
                            username: username,
                            password: password,
                            lt: $("[name='lt']").val(),
                            execution: $("[name='execution']").val(),
                            _eventId: "submit",
                            rmShown: "1"
                        },
                        headers: {
                            'Host': 'login.bit.edu.cn',
                            'Connection': 'keep-alive',
                            'Origin': 'https://login.bit.edu.cn',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                            'Referer': 'https://login.bit.edu.cn/cas/login?service=http%3A%2F%2Flexue.bit.edu.cn%2Flogin%2Findex.php',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
                            'cookie': loginPage.headers["set-cookie"][0].slice(0, 48)
                        }
                    })];
            case 2:
                ticket = _a.sent();
                return [4 /*yield*/, got_1["default"].get(ticket.headers.location, {
                        followRedirect: false
                    })];
            case 3:
                tempCookie = _a.sent();
                return [4 /*yield*/, got_1["default"].get(tempCookie.headers.location, {
                        followRedirect: false,
                        headers: {
                            'Host': 'lexue.bit.edu.cn',
                            'Connection': 'keep-alive',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                            'Accept-Encoding': 'gzip, deflate',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
                            'Cookie': tempCookie.headers["set-cookie"][0].split(";")[0]
                        }
                    })];
            case 4:
                finalCookie = _a.sent();
                return [2 /*return*/, finalCookie.headers["set-cookie"][0].split(";")[0]];
        }
    });
}); });
