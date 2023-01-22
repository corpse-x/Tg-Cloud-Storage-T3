import { z } from "zod";
import { Api } from "telegram";
import { createTRPCRouter, publicProcedure, tgMiddleware } from "../trpc";
import { env } from "../../../env/server.mjs";

export const exampleRouter = createTRPCRouter({
  sendCode: publicProcedure
    .use(tgMiddleware)
    .input(z.object({ phone: z.string().min(10).max(14) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.tg.connect();
      const { phoneCodeHash } = await ctx.tg.invoke(
        new Api.auth.SendCode({
          apiId: env.API_ID,
          apiHash: env.API_HASH,
          phoneNumber: input.phone,
          settings: new Api.CodeSettings({
            allowFlashcall: true,
            currentNumber: true,
            allowAppHash: true,
          }),
        })
      );
      const session = ctx.tg.session.save();
      console.log(session);
      return phoneCodeHash;
    }),

  signIn: publicProcedure
    .use(tgMiddleware)
    .input(
      z.object({
        phoneCode: z.string().length(5),
        phoneCodeHash: z.string(),
        phone: z.string().min(10).max(14),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { phoneCode, phoneCodeHash, phone } = input;
      await ctx.tg.connect();
      const result = await ctx.tg.invoke(
        new Api.auth.SignIn({
          phoneNumber: phone,
          phoneCodeHash: phoneCodeHash,
          phoneCode: phoneCode,
        })
      );
      const session = ctx.tg.session.save();
      return result;
    }),
});
