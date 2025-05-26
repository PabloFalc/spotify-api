// src/modules/auth/auth.response.ts

export type AuthResponseType = {
    token?: string;
    msg?: string;
    code: 200 | 500 | 401;
};

type AuthInput = {
    token?: string;
    msg?: string;
};

export const authReply = {
    success: ({ token, msg }: AuthInput): AuthResponseType => ({
        token,
        msg,
        code: 200,
    }),

    unauthorized: ({ token, msg }: AuthInput): AuthResponseType => ({
        token,
        msg,
        code: 401,
    }),

    error: ({ token, msg }: AuthInput): AuthResponseType => ({
        token,
        msg,
        code: 500,
    }),
};
