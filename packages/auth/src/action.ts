import * as TE from 'fp-ts/TaskEither';
import { pipe } from "fp-ts/lib/function";
import { IO } from 'fp-ts/lib/IO';
import * as t from "io-ts/PathReporter";
import bcrypt from 'bcryptjs';

import { db,eq,users } from '@acme/db';
import { UserCodec, UserSchema, type UserDTO } from "@acme/data";
import { Cookie } from 'lucia';
import { lucia } from './core';

const findUser = async (data: UserDTO) => await db.query.users.findFirst({ where: eq(users.phone, data.phone) });

export type injectCookieCallback = (cookie: Cookie) => void;

const makeSession = (injectCookie: injectCookieCallback) => (user: UserSchema): IO<void> =>
  async () => {
    const session = await lucia.createSession(user.id, { user });
    const sessionCookie = lucia.createSessionCookie(session.id);
    injectCookie(sessionCookie);
  };

const login = async (values: UserDTO, injectCookie: injectCookieCallback) =>
  pipe(
    values,
    UserCodec.decode,
    TE.fromEither,
    TE.mapLeft(e => `输入数据项异常:${t.failure(e)}`),
    TE.bind("data", d => TE.right(d)),
    TE.bind("user", ({ data }) => TE.tryCatch(async () => await findUser(data), (e) => `数据库查询异常:${e}`)),
    TE.chain(({ user, data }) => !bcrypt.compareSync(data.password, user!.password) ? TE.left("用户名或密码错误") : TE.right(user)),
    TE.chainIOK(u => makeSession(injectCookie)(u!))
  )();


const logout = async (sessionId: string) => {
  await lucia.invalidateSession(sessionId);
};

export { login, logout };