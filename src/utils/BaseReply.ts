export const reply = {
    badRequest<type>(msg?: string | string[], data?: type): ReplyType<type> {
        return {
            success: false,
            code: 404,
            msg,
            data,
        };
    },

    internalServerError<type>(
        msg?: string | string[],
        data?: type
    ): ReplyType<type> {
        return {
            success: false,
            code: 500,
            msg,
            data,
        };
    },
    success<type>(msg?: string | string[], data?: type): ReplyType<type> {
        return {
            success: true,
            code: 200,
            msg,
            data,
        };
    },

    created<type>(msg?: string | string[], data?: type): ReplyType<type> {
        return {
            success: true,
            code: 201,
            msg,
            data,
        };
    },

    notFound<type>(msg?: string | string[], data?: type): ReplyType<type> {
        return {
            success: false,
            code: 404,
            msg,
            data,
        };
    },
    unauthorized<type>(msg?: string | string[], data?: type): ReplyType<type> {
        return {
            success: false,
            code: 401,
            msg,
            data,
        };
    },
};

export type ReplyType<T> = {
    success: boolean;
    code: 400 | 401 | 404 | 500 | 200 | 201;
    msg?: string | string[];
    data?: T;
};
