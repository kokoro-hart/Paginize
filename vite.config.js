"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
var vitest_github_actions_reporter_1 = require("vitest-github-actions-reporter");
// eslint-disable-next-line import/no-default-export
exports.default = (0, config_1.defineConfig)({
    test: {
        reporters: process.env['GITHUB_ACTIONS'] ? ['default', new vitest_github_actions_reporter_1.default()] : 'default',
    },
});
