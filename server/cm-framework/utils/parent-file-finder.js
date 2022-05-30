"use strict";
/*=--------------------------------------------------------------=

 TSPath - Typescript Path Resolver

 Author : Patrik Forsberg
 Email  : patrik.forsberg@coldmind.com
 GitHub : https://github.com/duffman

 I hope this piece of software brings joy into your life, makes
 you sleep better knowing that you are no longer in path hell!

 Use this software free of charge, the only thing I ask is that
 you obey to the terms stated in the license, i would also like
 you to keep the file header intact.

 Also, I would love to see you getting involved in the project!

 Enjoy!

 This software is subject to the LGPL v2 License, please find
 the full license attached in LICENCE.md

 =---------------------------------------------------------------=

 This file is part of the TypeScript Path Igniter Project:
 https://github.com/duffman/ts-path-igniter

 Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 Date: 2017-09-02

 =---------------------------------------------------------------= */
exports.__esModule = true;
exports.ParentFileFinder = exports.FileFindResult = void 0;
var fs = require("fs");
var path = require("path");
var FileFindResult = /** @class */ (function () {
    function FileFindResult(fileFound, path, result) {
        if (fileFound === void 0) { fileFound = false; }
        if (path === void 0) { path = ""; }
        if (result === void 0) { result = ""; }
        this.fileFound = fileFound;
        this.path = path;
        this.result = result;
    }
    return FileFindResult;
}());
exports.FileFindResult = FileFindResult;
var ParentFileFinder = /** @class */ (function () {
    function ParentFileFinder() {
    }
    /**
     * Cross platform method that verifies that the given path ends
     * with a path delimiter, NOTE that this method does no effort
     * in verifying that your path string is correct.
     * @param searchPath
     * @returns {string}
     */
    ParentFileFinder.ensureTrailingPathDelimiter = function (searchPath) {
        if (!searchPath) {
            return;
        }
        var pathSep = path.sep;
        if (searchPath.endsWith(pathSep) == false) {
            searchPath = searchPath + pathSep;
        }
        return searchPath;
    };
    /**
     * File finder which traverses parent directories
     * until a given filename is found.
     * @param startPath
     * @param filename
     * @returns {FileFindResult}
     */
    ParentFileFinder.findFile = function (startPath, filename) {
        var result = new FileFindResult();
        var sep = path.sep;
        var parts = startPath.split(sep);
        var tmpStr = sep;
        for (var i = 0; i < parts.length; i++) {
            tmpStr = path.resolve(tmpStr, parts[i]);
            tmpStr = ParentFileFinder.ensureTrailingPathDelimiter(tmpStr);
            parts[i] = tmpStr;
        }
        for (var i = parts.length - 1; i > 0; i--) {
            tmpStr = parts[i];
            var matchFile = path.resolve(tmpStr, filename);
            if (fs.existsSync(matchFile)) {
                result.fileFound = true;
                result.path = tmpStr;
                result.result = filename;
                break;
            }
        }
        return result;
    };
    return ParentFileFinder;
}());
exports.ParentFileFinder = ParentFileFinder;
