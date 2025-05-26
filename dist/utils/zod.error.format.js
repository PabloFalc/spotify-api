"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ZodErroFormat;
function ZodErroFormat(erro) {
    const erros = JSON.parse(erro);
    const message = erros.map((m) => {
        const string = `erro: [${m.path}] ${m.message}`;
        return string;
    });
    return message;
}
