type message = {
    message: string;
    path?: [string];
};

export default function ZodErroFormat(erro: string) {
    const erros = JSON.parse(erro) as message[];
    const message = erros.map((m) => {
        const string = `erro: [${m.path}] ${m.message}`;
        return string;
    });
    return message;
}
