import mongoose from "mongoose";
export declare const userModel: mongoose.Model<{
    username: string;
    password?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    username: string;
    password?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    username: string;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username: string;
    password?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    username: string;
    password?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    username: string;
    password?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const contentModel: mongoose.Model<{
    type?: string | null;
    link?: string | null;
    title?: string | null;
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    type?: string | null;
    link?: string | null;
    title?: string | null;
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    type?: string | null;
    link?: string | null;
    title?: string | null;
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type?: string | null;
    link?: string | null;
    title?: string | null;
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type?: string | null;
    link?: string | null;
    title?: string | null;
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    type?: string | null;
    link?: string | null;
    title?: string | null;
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const linkModel: mongoose.Model<{
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
    hash?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
    hash?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
    hash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
    hash?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
    hash?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    userId?: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
    hash?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=db.d.ts.map