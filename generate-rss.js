"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getPost = void 0;
var fs = __importStar(require("fs"));
var fsPromise = fs.promises;
var path_1 = require("path");
var gray_matter_1 = __importDefault(require("gray-matter"));
var postDirPath = (0, path_1.join)(process.cwd(), "src/_posts");
var outputPostDirPath = (0, path_1.join)(process.cwd(), "out/posts");
var getPost = function (slug) { return __awaiter(void 0, void 0, void 0, function () {
    var fullPath, fileContents, data, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fullPath = (0, path_1.join)(postDirPath, "".concat(slug, ".md"));
                return [4 /*yield*/, fsPromise.readFile(fullPath, "utf8")];
            case 1:
                fileContents = _a.sent();
                data = (0, gray_matter_1["default"])(fileContents).data;
                post = {
                    slug: slug,
                    title: data["title"],
                    date: Date.parse(data["date"])
                };
                return [2 /*return*/, post];
        }
    });
}); };
exports.getPost = getPost;
var getAllPosts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var filenames, slugs, promisePosts, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fsPromise.readdir(outputPostDirPath)];
            case 1:
                filenames = _a.sent();
                slugs = filenames.map(function (filename) { return filename.replace(/\.html$/, ""); });
                promisePosts = slugs
                    .filter(function (filename) { return filename != "preview.md"; })
                    .map(function (filename) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, exports.getPost)(filename)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); });
                console.log("Getting filename list...");
                return [4 /*yield*/, Promise.all(promisePosts)];
            case 2:
                posts = _a.sent();
                posts.sort(function (a, b) { return b.date - a.date; });
                return [2 /*return*/, posts];
        }
    });
}); };
var createFeed = function (post) { return "    <item>\n      <title>".concat(post.title, "</title>\n      <link>https://oldbigbuddha.dev/posts/").concat(post.slug, "</link>\n      <guid>https://oldbigbuddha.dev/posts/").concat(post.slug, "</guid>\n      <pubDate>").concat(new Date(post.date).toUTCString(), "</pubDate>\n    </item>"); };
var writeRss = function (filePath, content) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Writing to ".concat(filePath));
                return [4 /*yield*/, fsPromise.writeFile(filePath, content, "utf-8")];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var generateRss = function () { return __awaiter(void 0, void 0, void 0, function () {
    var posts, lastBuildDate, feeds, rss, filePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllPosts()];
            case 1:
                posts = _a.sent();
                lastBuildDate = new Date(posts.slice(-1)[0].date).toUTCString();
                feeds = posts.map(function (post) { return createFeed(post); });
                rss = "<?xml version=\"1.0\" ?>\n<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n  <channel>\n    <title>Simple is Best</title>\n    <link>https://oldbigbuddha.dev</link>\n    <description>\u30B7\u30F3\u30D7\u30EB\u304C\u4E00\u756A</description>\n    <language>ja</language>\n    <lastBuildDate>".concat(lastBuildDate, "</lastBuildDate>\n    <atom:link href=\"https://oldbigbuddha.dev/posts/rss.xml\" rel=\"self\" type=\"application/rss+xml\" />\n").concat(feeds.join("\n"), "\n  </channel>\n</rss>");
                filePath = (0, path_1.join)(process.cwd(), "out/posts/rss.xml");
                return [4 /*yield*/, writeRss(filePath, rss)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
generateRss();
