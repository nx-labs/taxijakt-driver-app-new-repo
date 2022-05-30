"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
exports.__esModule = true;
exports.PathUtils = void 0;
var parent_file_finder_1 = require("./parent-file-finder");
var PathUtils = /** @class */ (function () {
    function PathUtils() {
    }
    PathUtils.getProjectRoot = function (startPath) {
        if (startPath === void 0) { startPath = __dirname; }
        var result = startPath;
        var res = parent_file_finder_1.ParentFileFinder.findFile(startPath, "package.json");
        if (res.fileFound) {
            result = res.path;
        }
        return result;
    };
    return PathUtils;
}());
exports.PathUtils = PathUtils;
