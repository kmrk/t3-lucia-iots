import * as t from "io-ts";
import * as E from "fp-ts/Either";
import * as A from "fp-ts/Array";
import { identity, pipe } from "fp-ts/lib/function";
import { failure } from "io-ts/lib/PathReporter";

// from https://github.com/trpc/trpc/pull/3324#issuecomment-1422658244

/**
 * This is a helper function to make the error messages from io-ts
 * more readable.
 *
 * It takes the error object from io-ts and returns a string with
 * the first 3 errors.
 */
export const prettyError = (err: t.Errors) =>
  pipe(
    err,
    failure,
    A.takeLeft(3),
    (a) => a.map((s) => "- " + s),
    (a) => a.join("\n")
  );

/**
 * This is a helper function to make it easier to use io-ts
 * with trpc.
 *
 * It takes an io-ts decoder and returns a function that
 * takes a value and returns the decoded value or throws
 * an error if the value is invalid.
 */
export const ioParser =
  <T>(schema: t.Decoder<unknown, T>) =>
  (value: unknown) => {
    return pipe(
      schema.decode(value),
      E.fold((err) => {
        throw new Error(prettyError(err));
      }, identity)
    );
  };