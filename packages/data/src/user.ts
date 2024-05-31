import { users } from "@acme/db";
import * as t from 'io-ts';
import { PhoneNumber } from "./t_types/PhoneNumber";

export type UserSchema = typeof users.$inferSelect;


export const UserCodec = t.type({
  phone: PhoneNumber,
  password: t.string
});

export type UserDTO = t.TypeOf<typeof UserCodec>;