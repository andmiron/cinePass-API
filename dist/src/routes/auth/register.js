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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterResponseSchema = exports.userRegisterSchema = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const argon2 = __importStar(require("argon2"));
const zod_1 = require("zod");
const users_1 = require("../../db/schema/users");
const userRegisterSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .email({
        message: "Invalid email address",
    })
        .transform((email) => email.toLowerCase()),
    password: zod_1.z
        .string({
        required_error: "Password is required",
    })
        .min(6, {
        message: "Password must be at least 6 characters long",
    }),
});
exports.userRegisterSchema = userRegisterSchema;
const userRegisterResponseSchema = zod_1.z
    .object({
    success: zod_1.z.boolean(),
    message: zod_1.z.string(),
    data: zod_1.z.object({
        user: (0, drizzle_zod_1.createSelectSchema)(users_1.users).pick({ id: true, email: true }),
    }),
})
    .describe("Success user registration response");
exports.userRegisterResponseSchema = userRegisterResponseSchema;
const registerRoute = async (app) => {
    app.post("/register", {
        schema: {
            tags: ["auth"],
            summary: "New user registration route",
            body: userRegisterSchema,
            response: {
                201: userRegisterResponseSchema,
            },
        },
    }, async (request, reply) => {
        const { email, password } = request.body;
        try {
            const hashedPassword = await argon2.hash(password);
            const user = await app.db
                .insert(users_1.users)
                .values({
                email,
                password: hashedPassword,
            })
                .returning({
                id: users_1.users.id,
                email: users_1.users.email,
            });
            await reply.status(201).send({
                success: true,
                message: "User registered successfully",
                data: {
                    user: user[0],
                },
            });
        }
        catch (err) {
            const error = err;
            if (error.code === "23505") {
                await reply.badRequest("User with this email already exists");
            }
            await reply.badRequest("Failed to register user");
        }
    });
    await app.after();
    app.log.info(`POST: ${app.prefix}/register`);
};
exports.default = registerRoute;
