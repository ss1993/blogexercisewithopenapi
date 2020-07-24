import * as t from 'io-ts'

// Interfaces for request of post and put and delete routes

export interface RequestBodyDefault { // use in PostRepository
  [key: string]: t.TypeOf<typeof t.string> | t.TypeOf<typeof t.number>
}

export interface RequestBodyPost { post: t.TypeOf<typeof t.string>; likes: t.TypeOf<typeof t.number>; comment: t.TypeOf<typeof t.string> }

// With t.type all fields are required, we use it for POST
export const RequestBodyValuesTypePost = t.type({post: t.string, likes: t.number, comment: t.string})
export type RequestBodyValuesTypePost = t.TypeOf<typeof RequestBodyValuesTypePost>

// With t.partial all fields are optional, we use it for put
// We can combine required and optional with t.intersection
export const RequestBodyValuesTypePut = t.partial({post: t.string, likes: t.number, comment: t.string})
export type RequestBodyValuesTypePut = t.TypeOf<typeof RequestBodyValuesTypePut>

const isRequestBody = (s: unknown): s is string => s === "post" || s === "likes" || s === "comment";

// Type<A, O, I>
export const requestBody = new t.Type<string, string, unknown>(
  "string",
  isRequestBody,
  (input, context) => isRequestBody(input) ? t.success(input) : t.failure(input, context),
  t.identity,
);
