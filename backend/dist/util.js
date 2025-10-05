"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (num) => {
    const options = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let ans = "";
    for (let i = 0; i < num; i++) {
        ans = ans + options[Math.floor(Math.random() * options.length)];
    }
    return ans;
};
exports.random = random;
//# sourceMappingURL=util.js.map