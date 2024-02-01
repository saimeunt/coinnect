
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CreatorAccount
 * 
 */
export type CreatorAccount = $Result.DefaultSelection<Prisma.$CreatorAccountPayload>
/**
 * Model UserAccount
 * 
 */
export type UserAccount = $Result.DefaultSelection<Prisma.$UserAccountPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model Exclusivity
 * 
 */
export type Exclusivity = $Result.DefaultSelection<Prisma.$ExclusivityPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.creatorAccount`: Exposes CRUD operations for the **CreatorAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreatorAccounts
    * const creatorAccounts = await prisma.creatorAccount.findMany()
    * ```
    */
  get creatorAccount(): Prisma.CreatorAccountDelegate<ExtArgs>;

  /**
   * `prisma.userAccount`: Exposes CRUD operations for the **UserAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAccounts
    * const userAccounts = await prisma.userAccount.findMany()
    * ```
    */
  get userAccount(): Prisma.UserAccountDelegate<ExtArgs>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs>;

  /**
   * `prisma.exclusivity`: Exposes CRUD operations for the **Exclusivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exclusivities
    * const exclusivities = await prisma.exclusivity.findMany()
    * ```
    */
  get exclusivity(): Prisma.ExclusivityDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.9.1
   * Query Engine version: 23fdc5965b1e05fc54e5f26ed3de66776b93de64
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    CreatorAccount: 'CreatorAccount',
    UserAccount: 'UserAccount',
    Post: 'Post',
    Exclusivity: 'Exclusivity'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'creatorAccount' | 'userAccount' | 'post' | 'exclusivity'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CreatorAccount: {
        payload: Prisma.$CreatorAccountPayload<ExtArgs>
        fields: Prisma.CreatorAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreatorAccountFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CreatorAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreatorAccountFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CreatorAccountPayload>
          }
          findFirst: {
            args: Prisma.CreatorAccountFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CreatorAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreatorAccountFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CreatorAccountPayload>
          }
          findMany: {
            args: Prisma.CreatorAccountFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CreatorAccountPayload>[]
          }
          create: {
            args: Prisma.CreatorAccountCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CreatorAccountPayload>
          }
          createMany: {
            args: Prisma.CreatorAccountCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.CreatorAccountDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CreatorAccountPayload>
          }
          update: {
            args: Prisma.CreatorAccountUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CreatorAccountPayload>
          }
          deleteMany: {
            args: Prisma.CreatorAccountDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CreatorAccountUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CreatorAccountUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CreatorAccountPayload>
          }
          aggregate: {
            args: Prisma.CreatorAccountAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCreatorAccount>
          }
          groupBy: {
            args: Prisma.CreatorAccountGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CreatorAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreatorAccountCountArgs<ExtArgs>,
            result: $Utils.Optional<CreatorAccountCountAggregateOutputType> | number
          }
        }
      }
      UserAccount: {
        payload: Prisma.$UserAccountPayload<ExtArgs>
        fields: Prisma.UserAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAccountFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAccountFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          findFirst: {
            args: Prisma.UserAccountFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAccountFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          findMany: {
            args: Prisma.UserAccountFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>[]
          }
          create: {
            args: Prisma.UserAccountCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          createMany: {
            args: Prisma.UserAccountCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserAccountDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          update: {
            args: Prisma.UserAccountUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          deleteMany: {
            args: Prisma.UserAccountDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserAccountUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserAccountUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          aggregate: {
            args: Prisma.UserAccountAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserAccount>
          }
          groupBy: {
            args: Prisma.UserAccountGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAccountCountArgs<ExtArgs>,
            result: $Utils.Optional<UserAccountCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>,
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>,
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      Exclusivity: {
        payload: Prisma.$ExclusivityPayload<ExtArgs>
        fields: Prisma.ExclusivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExclusivityFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ExclusivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExclusivityFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ExclusivityPayload>
          }
          findFirst: {
            args: Prisma.ExclusivityFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ExclusivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExclusivityFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ExclusivityPayload>
          }
          findMany: {
            args: Prisma.ExclusivityFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ExclusivityPayload>[]
          }
          create: {
            args: Prisma.ExclusivityCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ExclusivityPayload>
          }
          createMany: {
            args: Prisma.ExclusivityCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ExclusivityDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ExclusivityPayload>
          }
          update: {
            args: Prisma.ExclusivityUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ExclusivityPayload>
          }
          deleteMany: {
            args: Prisma.ExclusivityDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ExclusivityUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ExclusivityUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ExclusivityPayload>
          }
          aggregate: {
            args: Prisma.ExclusivityAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateExclusivity>
          }
          groupBy: {
            args: Prisma.ExclusivityGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ExclusivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExclusivityCountArgs<ExtArgs>,
            result: $Utils.Optional<ExclusivityCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CreatorAccountCountOutputType
   */

  export type CreatorAccountCountOutputType = {
    posts: number
    exclusivities: number
  }

  export type CreatorAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | CreatorAccountCountOutputTypeCountPostsArgs
    exclusivities?: boolean | CreatorAccountCountOutputTypeCountExclusivitiesArgs
  }

  // Custom InputTypes

  /**
   * CreatorAccountCountOutputType without action
   */
  export type CreatorAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccountCountOutputType
     */
    select?: CreatorAccountCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * CreatorAccountCountOutputType without action
   */
  export type CreatorAccountCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * CreatorAccountCountOutputType without action
   */
  export type CreatorAccountCountOutputTypeCountExclusivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExclusivityWhereInput
  }



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    address: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    address: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    address: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    address?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    address?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    address?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    address: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    address?: boolean
    creatorAccount?: boolean | User$creatorAccountArgs<ExtArgs>
    userAccount?: boolean | User$userAccountArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    address?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorAccount?: boolean | User$creatorAccountArgs<ExtArgs>
    userAccount?: boolean | User$userAccountArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      creatorAccount: Prisma.$CreatorAccountPayload<ExtArgs> | null
      userAccount: Prisma.$UserAccountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      address: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    creatorAccount<T extends User$creatorAccountArgs<ExtArgs> = {}>(args?: Subset<T, User$creatorAccountArgs<ExtArgs>>): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    userAccount<T extends User$userAccountArgs<ExtArgs> = {}>(args?: Subset<T, User$userAccountArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.creatorAccount
   */
  export type User$creatorAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    where?: CreatorAccountWhereInput
  }


  /**
   * User.userAccount
   */
  export type User$userAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
    where?: UserAccountWhereInput
  }


  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model CreatorAccount
   */

  export type AggregateCreatorAccount = {
    _count: CreatorAccountCountAggregateOutputType | null
    _avg: CreatorAccountAvgAggregateOutputType | null
    _sum: CreatorAccountSumAggregateOutputType | null
    _min: CreatorAccountMinAggregateOutputType | null
    _max: CreatorAccountMaxAggregateOutputType | null
  }

  export type CreatorAccountAvgAggregateOutputType = {
    interests: number | null
  }

  export type CreatorAccountSumAggregateOutputType = {
    interests: number[]
  }

  export type CreatorAccountMinAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    description: string | null
    avatarUrl: string | null
    bannerUrl: string | null
    obolId: string | null
    userId: string | null
  }

  export type CreatorAccountMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    description: string | null
    avatarUrl: string | null
    bannerUrl: string | null
    obolId: string | null
    userId: string | null
  }

  export type CreatorAccountCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    description: number
    avatarUrl: number
    bannerUrl: number
    interests: number
    cards: number
    obolId: number
    userId: number
    _all: number
  }


  export type CreatorAccountAvgAggregateInputType = {
    interests?: true
  }

  export type CreatorAccountSumAggregateInputType = {
    interests?: true
  }

  export type CreatorAccountMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    avatarUrl?: true
    bannerUrl?: true
    obolId?: true
    userId?: true
  }

  export type CreatorAccountMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    avatarUrl?: true
    bannerUrl?: true
    obolId?: true
    userId?: true
  }

  export type CreatorAccountCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    description?: true
    avatarUrl?: true
    bannerUrl?: true
    interests?: true
    cards?: true
    obolId?: true
    userId?: true
    _all?: true
  }

  export type CreatorAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorAccount to aggregate.
     */
    where?: CreatorAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorAccounts to fetch.
     */
    orderBy?: CreatorAccountOrderByWithRelationInput | CreatorAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreatorAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreatorAccounts
    **/
    _count?: true | CreatorAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreatorAccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreatorAccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreatorAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreatorAccountMaxAggregateInputType
  }

  export type GetCreatorAccountAggregateType<T extends CreatorAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateCreatorAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreatorAccount[P]>
      : GetScalarType<T[P], AggregateCreatorAccount[P]>
  }




  export type CreatorAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreatorAccountWhereInput
    orderBy?: CreatorAccountOrderByWithAggregationInput | CreatorAccountOrderByWithAggregationInput[]
    by: CreatorAccountScalarFieldEnum[] | CreatorAccountScalarFieldEnum
    having?: CreatorAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreatorAccountCountAggregateInputType | true
    _avg?: CreatorAccountAvgAggregateInputType
    _sum?: CreatorAccountSumAggregateInputType
    _min?: CreatorAccountMinAggregateInputType
    _max?: CreatorAccountMaxAggregateInputType
  }

  export type CreatorAccountGroupByOutputType = {
    id: string
    slug: string
    title: string
    description: string
    avatarUrl: string
    bannerUrl: string
    interests: number[]
    cards: JsonValue
    obolId: string
    userId: string
    _count: CreatorAccountCountAggregateOutputType | null
    _avg: CreatorAccountAvgAggregateOutputType | null
    _sum: CreatorAccountSumAggregateOutputType | null
    _min: CreatorAccountMinAggregateOutputType | null
    _max: CreatorAccountMaxAggregateOutputType | null
  }

  type GetCreatorAccountGroupByPayload<T extends CreatorAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreatorAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreatorAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreatorAccountGroupByOutputType[P]>
            : GetScalarType<T[P], CreatorAccountGroupByOutputType[P]>
        }
      >
    >


  export type CreatorAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    avatarUrl?: boolean
    bannerUrl?: boolean
    interests?: boolean
    cards?: boolean
    obolId?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    posts?: boolean | CreatorAccount$postsArgs<ExtArgs>
    exclusivities?: boolean | CreatorAccount$exclusivitiesArgs<ExtArgs>
    _count?: boolean | CreatorAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creatorAccount"]>

  export type CreatorAccountSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    avatarUrl?: boolean
    bannerUrl?: boolean
    interests?: boolean
    cards?: boolean
    obolId?: boolean
    userId?: boolean
  }

  export type CreatorAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    posts?: boolean | CreatorAccount$postsArgs<ExtArgs>
    exclusivities?: boolean | CreatorAccount$exclusivitiesArgs<ExtArgs>
    _count?: boolean | CreatorAccountCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $CreatorAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreatorAccount"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      posts: Prisma.$PostPayload<ExtArgs>[]
      exclusivities: Prisma.$ExclusivityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      title: string
      description: string
      avatarUrl: string
      bannerUrl: string
      interests: number[]
      cards: Prisma.JsonValue
      obolId: string
      userId: string
    }, ExtArgs["result"]["creatorAccount"]>
    composites: {}
  }


  type CreatorAccountGetPayload<S extends boolean | null | undefined | CreatorAccountDefaultArgs> = $Result.GetResult<Prisma.$CreatorAccountPayload, S>

  type CreatorAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CreatorAccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CreatorAccountCountAggregateInputType | true
    }

  export interface CreatorAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreatorAccount'], meta: { name: 'CreatorAccount' } }
    /**
     * Find zero or one CreatorAccount that matches the filter.
     * @param {CreatorAccountFindUniqueArgs} args - Arguments to find a CreatorAccount
     * @example
     * // Get one CreatorAccount
     * const creatorAccount = await prisma.creatorAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CreatorAccountFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CreatorAccountFindUniqueArgs<ExtArgs>>
    ): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one CreatorAccount that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CreatorAccountFindUniqueOrThrowArgs} args - Arguments to find a CreatorAccount
     * @example
     * // Get one CreatorAccount
     * const creatorAccount = await prisma.creatorAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CreatorAccountFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CreatorAccountFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first CreatorAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorAccountFindFirstArgs} args - Arguments to find a CreatorAccount
     * @example
     * // Get one CreatorAccount
     * const creatorAccount = await prisma.creatorAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CreatorAccountFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CreatorAccountFindFirstArgs<ExtArgs>>
    ): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first CreatorAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorAccountFindFirstOrThrowArgs} args - Arguments to find a CreatorAccount
     * @example
     * // Get one CreatorAccount
     * const creatorAccount = await prisma.creatorAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CreatorAccountFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CreatorAccountFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more CreatorAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorAccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreatorAccounts
     * const creatorAccounts = await prisma.creatorAccount.findMany()
     * 
     * // Get first 10 CreatorAccounts
     * const creatorAccounts = await prisma.creatorAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creatorAccountWithIdOnly = await prisma.creatorAccount.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CreatorAccountFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CreatorAccountFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a CreatorAccount.
     * @param {CreatorAccountCreateArgs} args - Arguments to create a CreatorAccount.
     * @example
     * // Create one CreatorAccount
     * const CreatorAccount = await prisma.creatorAccount.create({
     *   data: {
     *     // ... data to create a CreatorAccount
     *   }
     * })
     * 
    **/
    create<T extends CreatorAccountCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CreatorAccountCreateArgs<ExtArgs>>
    ): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many CreatorAccounts.
     *     @param {CreatorAccountCreateManyArgs} args - Arguments to create many CreatorAccounts.
     *     @example
     *     // Create many CreatorAccounts
     *     const creatorAccount = await prisma.creatorAccount.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CreatorAccountCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CreatorAccountCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CreatorAccount.
     * @param {CreatorAccountDeleteArgs} args - Arguments to delete one CreatorAccount.
     * @example
     * // Delete one CreatorAccount
     * const CreatorAccount = await prisma.creatorAccount.delete({
     *   where: {
     *     // ... filter to delete one CreatorAccount
     *   }
     * })
     * 
    **/
    delete<T extends CreatorAccountDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CreatorAccountDeleteArgs<ExtArgs>>
    ): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one CreatorAccount.
     * @param {CreatorAccountUpdateArgs} args - Arguments to update one CreatorAccount.
     * @example
     * // Update one CreatorAccount
     * const creatorAccount = await prisma.creatorAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CreatorAccountUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CreatorAccountUpdateArgs<ExtArgs>>
    ): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more CreatorAccounts.
     * @param {CreatorAccountDeleteManyArgs} args - Arguments to filter CreatorAccounts to delete.
     * @example
     * // Delete a few CreatorAccounts
     * const { count } = await prisma.creatorAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CreatorAccountDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CreatorAccountDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreatorAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreatorAccounts
     * const creatorAccount = await prisma.creatorAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CreatorAccountUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CreatorAccountUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CreatorAccount.
     * @param {CreatorAccountUpsertArgs} args - Arguments to update or create a CreatorAccount.
     * @example
     * // Update or create a CreatorAccount
     * const creatorAccount = await prisma.creatorAccount.upsert({
     *   create: {
     *     // ... data to create a CreatorAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreatorAccount we want to update
     *   }
     * })
    **/
    upsert<T extends CreatorAccountUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CreatorAccountUpsertArgs<ExtArgs>>
    ): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of CreatorAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorAccountCountArgs} args - Arguments to filter CreatorAccounts to count.
     * @example
     * // Count the number of CreatorAccounts
     * const count = await prisma.creatorAccount.count({
     *   where: {
     *     // ... the filter for the CreatorAccounts we want to count
     *   }
     * })
    **/
    count<T extends CreatorAccountCountArgs>(
      args?: Subset<T, CreatorAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreatorAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreatorAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreatorAccountAggregateArgs>(args: Subset<T, CreatorAccountAggregateArgs>): Prisma.PrismaPromise<GetCreatorAccountAggregateType<T>>

    /**
     * Group by CreatorAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreatorAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreatorAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreatorAccountGroupByArgs['orderBy'] }
        : { orderBy?: CreatorAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreatorAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreatorAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreatorAccount model
   */
  readonly fields: CreatorAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreatorAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreatorAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    posts<T extends CreatorAccount$postsArgs<ExtArgs> = {}>(args?: Subset<T, CreatorAccount$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, 'findMany'> | Null>;

    exclusivities<T extends CreatorAccount$exclusivitiesArgs<ExtArgs> = {}>(args?: Subset<T, CreatorAccount$exclusivitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExclusivityPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the CreatorAccount model
   */ 
  interface CreatorAccountFieldRefs {
    readonly id: FieldRef<"CreatorAccount", 'String'>
    readonly slug: FieldRef<"CreatorAccount", 'String'>
    readonly title: FieldRef<"CreatorAccount", 'String'>
    readonly description: FieldRef<"CreatorAccount", 'String'>
    readonly avatarUrl: FieldRef<"CreatorAccount", 'String'>
    readonly bannerUrl: FieldRef<"CreatorAccount", 'String'>
    readonly interests: FieldRef<"CreatorAccount", 'Int[]'>
    readonly cards: FieldRef<"CreatorAccount", 'Json'>
    readonly obolId: FieldRef<"CreatorAccount", 'String'>
    readonly userId: FieldRef<"CreatorAccount", 'String'>
  }
    

  // Custom InputTypes

  /**
   * CreatorAccount findUnique
   */
  export type CreatorAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    /**
     * Filter, which CreatorAccount to fetch.
     */
    where: CreatorAccountWhereUniqueInput
  }


  /**
   * CreatorAccount findUniqueOrThrow
   */
  export type CreatorAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    /**
     * Filter, which CreatorAccount to fetch.
     */
    where: CreatorAccountWhereUniqueInput
  }


  /**
   * CreatorAccount findFirst
   */
  export type CreatorAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    /**
     * Filter, which CreatorAccount to fetch.
     */
    where?: CreatorAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorAccounts to fetch.
     */
    orderBy?: CreatorAccountOrderByWithRelationInput | CreatorAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorAccounts.
     */
    cursor?: CreatorAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorAccounts.
     */
    distinct?: CreatorAccountScalarFieldEnum | CreatorAccountScalarFieldEnum[]
  }


  /**
   * CreatorAccount findFirstOrThrow
   */
  export type CreatorAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    /**
     * Filter, which CreatorAccount to fetch.
     */
    where?: CreatorAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorAccounts to fetch.
     */
    orderBy?: CreatorAccountOrderByWithRelationInput | CreatorAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreatorAccounts.
     */
    cursor?: CreatorAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreatorAccounts.
     */
    distinct?: CreatorAccountScalarFieldEnum | CreatorAccountScalarFieldEnum[]
  }


  /**
   * CreatorAccount findMany
   */
  export type CreatorAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    /**
     * Filter, which CreatorAccounts to fetch.
     */
    where?: CreatorAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreatorAccounts to fetch.
     */
    orderBy?: CreatorAccountOrderByWithRelationInput | CreatorAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreatorAccounts.
     */
    cursor?: CreatorAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreatorAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreatorAccounts.
     */
    skip?: number
    distinct?: CreatorAccountScalarFieldEnum | CreatorAccountScalarFieldEnum[]
  }


  /**
   * CreatorAccount create
   */
  export type CreatorAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a CreatorAccount.
     */
    data: XOR<CreatorAccountCreateInput, CreatorAccountUncheckedCreateInput>
  }


  /**
   * CreatorAccount createMany
   */
  export type CreatorAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreatorAccounts.
     */
    data: CreatorAccountCreateManyInput | CreatorAccountCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * CreatorAccount update
   */
  export type CreatorAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a CreatorAccount.
     */
    data: XOR<CreatorAccountUpdateInput, CreatorAccountUncheckedUpdateInput>
    /**
     * Choose, which CreatorAccount to update.
     */
    where: CreatorAccountWhereUniqueInput
  }


  /**
   * CreatorAccount updateMany
   */
  export type CreatorAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreatorAccounts.
     */
    data: XOR<CreatorAccountUpdateManyMutationInput, CreatorAccountUncheckedUpdateManyInput>
    /**
     * Filter which CreatorAccounts to update
     */
    where?: CreatorAccountWhereInput
  }


  /**
   * CreatorAccount upsert
   */
  export type CreatorAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the CreatorAccount to update in case it exists.
     */
    where: CreatorAccountWhereUniqueInput
    /**
     * In case the CreatorAccount found by the `where` argument doesn't exist, create a new CreatorAccount with this data.
     */
    create: XOR<CreatorAccountCreateInput, CreatorAccountUncheckedCreateInput>
    /**
     * In case the CreatorAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreatorAccountUpdateInput, CreatorAccountUncheckedUpdateInput>
  }


  /**
   * CreatorAccount delete
   */
  export type CreatorAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    /**
     * Filter which CreatorAccount to delete.
     */
    where: CreatorAccountWhereUniqueInput
  }


  /**
   * CreatorAccount deleteMany
   */
  export type CreatorAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreatorAccounts to delete
     */
    where?: CreatorAccountWhereInput
  }


  /**
   * CreatorAccount.posts
   */
  export type CreatorAccount$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }


  /**
   * CreatorAccount.exclusivities
   */
  export type CreatorAccount$exclusivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
    where?: ExclusivityWhereInput
    orderBy?: ExclusivityOrderByWithRelationInput | ExclusivityOrderByWithRelationInput[]
    cursor?: ExclusivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExclusivityScalarFieldEnum | ExclusivityScalarFieldEnum[]
  }


  /**
   * CreatorAccount without action
   */
  export type CreatorAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
  }



  /**
   * Model UserAccount
   */

  export type AggregateUserAccount = {
    _count: UserAccountCountAggregateOutputType | null
    _avg: UserAccountAvgAggregateOutputType | null
    _sum: UserAccountSumAggregateOutputType | null
    _min: UserAccountMinAggregateOutputType | null
    _max: UserAccountMaxAggregateOutputType | null
  }

  export type UserAccountAvgAggregateOutputType = {
    interests: number | null
  }

  export type UserAccountSumAggregateOutputType = {
    interests: number[]
  }

  export type UserAccountMinAggregateOutputType = {
    id: string | null
    username: string | null
    avatarUrl: string | null
    userId: string | null
  }

  export type UserAccountMaxAggregateOutputType = {
    id: string | null
    username: string | null
    avatarUrl: string | null
    userId: string | null
  }

  export type UserAccountCountAggregateOutputType = {
    id: number
    username: number
    avatarUrl: number
    interests: number
    userId: number
    _all: number
  }


  export type UserAccountAvgAggregateInputType = {
    interests?: true
  }

  export type UserAccountSumAggregateInputType = {
    interests?: true
  }

  export type UserAccountMinAggregateInputType = {
    id?: true
    username?: true
    avatarUrl?: true
    userId?: true
  }

  export type UserAccountMaxAggregateInputType = {
    id?: true
    username?: true
    avatarUrl?: true
    userId?: true
  }

  export type UserAccountCountAggregateInputType = {
    id?: true
    username?: true
    avatarUrl?: true
    interests?: true
    userId?: true
    _all?: true
  }

  export type UserAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAccount to aggregate.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAccounts
    **/
    _count?: true | UserAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserAccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAccountMaxAggregateInputType
  }

  export type GetUserAccountAggregateType<T extends UserAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAccount[P]>
      : GetScalarType<T[P], AggregateUserAccount[P]>
  }




  export type UserAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAccountWhereInput
    orderBy?: UserAccountOrderByWithAggregationInput | UserAccountOrderByWithAggregationInput[]
    by: UserAccountScalarFieldEnum[] | UserAccountScalarFieldEnum
    having?: UserAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAccountCountAggregateInputType | true
    _avg?: UserAccountAvgAggregateInputType
    _sum?: UserAccountSumAggregateInputType
    _min?: UserAccountMinAggregateInputType
    _max?: UserAccountMaxAggregateInputType
  }

  export type UserAccountGroupByOutputType = {
    id: string
    username: string
    avatarUrl: string
    interests: number[]
    userId: string
    _count: UserAccountCountAggregateOutputType | null
    _avg: UserAccountAvgAggregateOutputType | null
    _sum: UserAccountSumAggregateOutputType | null
    _min: UserAccountMinAggregateOutputType | null
    _max: UserAccountMaxAggregateOutputType | null
  }

  type GetUserAccountGroupByPayload<T extends UserAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAccountGroupByOutputType[P]>
            : GetScalarType<T[P], UserAccountGroupByOutputType[P]>
        }
      >
    >


  export type UserAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    avatarUrl?: boolean
    interests?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAccount"]>

  export type UserAccountSelectScalar = {
    id?: boolean
    username?: boolean
    avatarUrl?: boolean
    interests?: boolean
    userId?: boolean
  }

  export type UserAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $UserAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAccount"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      avatarUrl: string
      interests: number[]
      userId: string
    }, ExtArgs["result"]["userAccount"]>
    composites: {}
  }


  type UserAccountGetPayload<S extends boolean | null | undefined | UserAccountDefaultArgs> = $Result.GetResult<Prisma.$UserAccountPayload, S>

  type UserAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserAccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserAccountCountAggregateInputType | true
    }

  export interface UserAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAccount'], meta: { name: 'UserAccount' } }
    /**
     * Find zero or one UserAccount that matches the filter.
     * @param {UserAccountFindUniqueArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserAccountFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserAccountFindUniqueArgs<ExtArgs>>
    ): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserAccount that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserAccountFindUniqueOrThrowArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserAccountFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAccountFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindFirstArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserAccountFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAccountFindFirstArgs<ExtArgs>>
    ): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindFirstOrThrowArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserAccountFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAccountFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAccounts
     * const userAccounts = await prisma.userAccount.findMany()
     * 
     * // Get first 10 UserAccounts
     * const userAccounts = await prisma.userAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAccountWithIdOnly = await prisma.userAccount.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserAccountFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAccountFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserAccount.
     * @param {UserAccountCreateArgs} args - Arguments to create a UserAccount.
     * @example
     * // Create one UserAccount
     * const UserAccount = await prisma.userAccount.create({
     *   data: {
     *     // ... data to create a UserAccount
     *   }
     * })
     * 
    **/
    create<T extends UserAccountCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserAccountCreateArgs<ExtArgs>>
    ): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserAccounts.
     *     @param {UserAccountCreateManyArgs} args - Arguments to create many UserAccounts.
     *     @example
     *     // Create many UserAccounts
     *     const userAccount = await prisma.userAccount.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserAccountCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAccountCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserAccount.
     * @param {UserAccountDeleteArgs} args - Arguments to delete one UserAccount.
     * @example
     * // Delete one UserAccount
     * const UserAccount = await prisma.userAccount.delete({
     *   where: {
     *     // ... filter to delete one UserAccount
     *   }
     * })
     * 
    **/
    delete<T extends UserAccountDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserAccountDeleteArgs<ExtArgs>>
    ): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserAccount.
     * @param {UserAccountUpdateArgs} args - Arguments to update one UserAccount.
     * @example
     * // Update one UserAccount
     * const userAccount = await prisma.userAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserAccountUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserAccountUpdateArgs<ExtArgs>>
    ): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserAccounts.
     * @param {UserAccountDeleteManyArgs} args - Arguments to filter UserAccounts to delete.
     * @example
     * // Delete a few UserAccounts
     * const { count } = await prisma.userAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserAccountDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAccountDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAccounts
     * const userAccount = await prisma.userAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserAccountUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserAccountUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserAccount.
     * @param {UserAccountUpsertArgs} args - Arguments to update or create a UserAccount.
     * @example
     * // Update or create a UserAccount
     * const userAccount = await prisma.userAccount.upsert({
     *   create: {
     *     // ... data to create a UserAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAccount we want to update
     *   }
     * })
    **/
    upsert<T extends UserAccountUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserAccountUpsertArgs<ExtArgs>>
    ): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of UserAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountCountArgs} args - Arguments to filter UserAccounts to count.
     * @example
     * // Count the number of UserAccounts
     * const count = await prisma.userAccount.count({
     *   where: {
     *     // ... the filter for the UserAccounts we want to count
     *   }
     * })
    **/
    count<T extends UserAccountCountArgs>(
      args?: Subset<T, UserAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAccountAggregateArgs>(args: Subset<T, UserAccountAggregateArgs>): Prisma.PrismaPromise<GetUserAccountAggregateType<T>>

    /**
     * Group by UserAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAccountGroupByArgs['orderBy'] }
        : { orderBy?: UserAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAccount model
   */
  readonly fields: UserAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the UserAccount model
   */ 
  interface UserAccountFieldRefs {
    readonly id: FieldRef<"UserAccount", 'String'>
    readonly username: FieldRef<"UserAccount", 'String'>
    readonly avatarUrl: FieldRef<"UserAccount", 'String'>
    readonly interests: FieldRef<"UserAccount", 'Int[]'>
    readonly userId: FieldRef<"UserAccount", 'String'>
  }
    

  // Custom InputTypes

  /**
   * UserAccount findUnique
   */
  export type UserAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where: UserAccountWhereUniqueInput
  }


  /**
   * UserAccount findUniqueOrThrow
   */
  export type UserAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where: UserAccountWhereUniqueInput
  }


  /**
   * UserAccount findFirst
   */
  export type UserAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAccounts.
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAccounts.
     */
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }


  /**
   * UserAccount findFirstOrThrow
   */
  export type UserAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAccounts.
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAccounts.
     */
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }


  /**
   * UserAccount findMany
   */
  export type UserAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccounts to fetch.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAccounts.
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }


  /**
   * UserAccount create
   */
  export type UserAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAccount.
     */
    data: XOR<UserAccountCreateInput, UserAccountUncheckedCreateInput>
  }


  /**
   * UserAccount createMany
   */
  export type UserAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAccounts.
     */
    data: UserAccountCreateManyInput | UserAccountCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * UserAccount update
   */
  export type UserAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAccount.
     */
    data: XOR<UserAccountUpdateInput, UserAccountUncheckedUpdateInput>
    /**
     * Choose, which UserAccount to update.
     */
    where: UserAccountWhereUniqueInput
  }


  /**
   * UserAccount updateMany
   */
  export type UserAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAccounts.
     */
    data: XOR<UserAccountUpdateManyMutationInput, UserAccountUncheckedUpdateManyInput>
    /**
     * Filter which UserAccounts to update
     */
    where?: UserAccountWhereInput
  }


  /**
   * UserAccount upsert
   */
  export type UserAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAccount to update in case it exists.
     */
    where: UserAccountWhereUniqueInput
    /**
     * In case the UserAccount found by the `where` argument doesn't exist, create a new UserAccount with this data.
     */
    create: XOR<UserAccountCreateInput, UserAccountUncheckedCreateInput>
    /**
     * In case the UserAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAccountUpdateInput, UserAccountUncheckedUpdateInput>
  }


  /**
   * UserAccount delete
   */
  export type UserAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter which UserAccount to delete.
     */
    where: UserAccountWhereUniqueInput
  }


  /**
   * UserAccount deleteMany
   */
  export type UserAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAccounts to delete
     */
    where?: UserAccountWhereInput
  }


  /**
   * UserAccount without action
   */
  export type UserAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAccountInclude<ExtArgs> | null
  }



  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    videoUrl: string | null
    title: string | null
    description: string | null
    tier: string | null
    date: Date | null
    creatorAccountId: string | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    videoUrl: string | null
    title: string | null
    description: string | null
    tier: string | null
    date: Date | null
    creatorAccountId: string | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    videoUrl: number
    title: number
    description: number
    tier: number
    date: number
    creatorAccountId: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    videoUrl?: true
    title?: true
    description?: true
    tier?: true
    date?: true
    creatorAccountId?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    videoUrl?: true
    title?: true
    description?: true
    tier?: true
    date?: true
    creatorAccountId?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    videoUrl?: true
    title?: true
    description?: true
    tier?: true
    date?: true
    creatorAccountId?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    videoUrl: string
    title: string
    description: string
    tier: string
    date: Date
    creatorAccountId: string
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoUrl?: boolean
    title?: boolean
    description?: boolean
    tier?: boolean
    date?: boolean
    creatorAccountId?: boolean
    creatorAccount?: boolean | Post$creatorAccountArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    videoUrl?: boolean
    title?: boolean
    description?: boolean
    tier?: boolean
    date?: boolean
    creatorAccountId?: boolean
  }

  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorAccount?: boolean | Post$creatorAccountArgs<ExtArgs>
  }


  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      creatorAccount: Prisma.$CreatorAccountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      videoUrl: string
      title: string
      description: string
      tier: string
      date: Date
      creatorAccountId: string
    }, ExtArgs["result"]["post"]>
    composites: {}
  }


  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PostFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>
    ): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Post that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PostFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>
    ): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PostFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
    **/
    create<T extends PostCreateArgs<ExtArgs>>(
      args: SelectSubset<T, PostCreateArgs<ExtArgs>>
    ): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Posts.
     *     @param {PostCreateManyArgs} args - Arguments to create many Posts.
     *     @example
     *     // Create many Posts
     *     const post = await prisma.post.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PostCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
    **/
    delete<T extends PostDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, PostDeleteArgs<ExtArgs>>
    ): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PostUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, PostUpdateArgs<ExtArgs>>
    ): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PostDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PostUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
    **/
    upsert<T extends PostUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, PostUpsertArgs<ExtArgs>>
    ): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    creatorAccount<T extends Post$creatorAccountArgs<ExtArgs> = {}>(args?: Subset<T, Post$creatorAccountArgs<ExtArgs>>): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Post model
   */ 
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly videoUrl: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly description: FieldRef<"Post", 'String'>
    readonly tier: FieldRef<"Post", 'String'>
    readonly date: FieldRef<"Post", 'DateTime'>
    readonly creatorAccountId: FieldRef<"Post", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }


  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }


  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }


  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }


  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }


  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }


  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }


  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
  }


  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }


  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }


  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
  }


  /**
   * Post.creatorAccount
   */
  export type Post$creatorAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    where?: CreatorAccountWhereInput
  }


  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PostInclude<ExtArgs> | null
  }



  /**
   * Model Exclusivity
   */

  export type AggregateExclusivity = {
    _count: ExclusivityCountAggregateOutputType | null
    _min: ExclusivityMinAggregateOutputType | null
    _max: ExclusivityMaxAggregateOutputType | null
  }

  export type ExclusivityMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    imageUrl: string | null
    price: string | null
    totalSupply: string | null
    tokenId: string | null
    creatorAccountId: string | null
  }

  export type ExclusivityMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    imageUrl: string | null
    price: string | null
    totalSupply: string | null
    tokenId: string | null
    creatorAccountId: string | null
  }

  export type ExclusivityCountAggregateOutputType = {
    id: number
    title: number
    description: number
    imageUrl: number
    price: number
    totalSupply: number
    tokenId: number
    creatorAccountId: number
    _all: number
  }


  export type ExclusivityMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    price?: true
    totalSupply?: true
    tokenId?: true
    creatorAccountId?: true
  }

  export type ExclusivityMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    price?: true
    totalSupply?: true
    tokenId?: true
    creatorAccountId?: true
  }

  export type ExclusivityCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    price?: true
    totalSupply?: true
    tokenId?: true
    creatorAccountId?: true
    _all?: true
  }

  export type ExclusivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exclusivity to aggregate.
     */
    where?: ExclusivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exclusivities to fetch.
     */
    orderBy?: ExclusivityOrderByWithRelationInput | ExclusivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExclusivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exclusivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exclusivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exclusivities
    **/
    _count?: true | ExclusivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExclusivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExclusivityMaxAggregateInputType
  }

  export type GetExclusivityAggregateType<T extends ExclusivityAggregateArgs> = {
        [P in keyof T & keyof AggregateExclusivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExclusivity[P]>
      : GetScalarType<T[P], AggregateExclusivity[P]>
  }




  export type ExclusivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExclusivityWhereInput
    orderBy?: ExclusivityOrderByWithAggregationInput | ExclusivityOrderByWithAggregationInput[]
    by: ExclusivityScalarFieldEnum[] | ExclusivityScalarFieldEnum
    having?: ExclusivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExclusivityCountAggregateInputType | true
    _min?: ExclusivityMinAggregateInputType
    _max?: ExclusivityMaxAggregateInputType
  }

  export type ExclusivityGroupByOutputType = {
    id: string
    title: string
    description: string
    imageUrl: string
    price: string
    totalSupply: string
    tokenId: string
    creatorAccountId: string
    _count: ExclusivityCountAggregateOutputType | null
    _min: ExclusivityMinAggregateOutputType | null
    _max: ExclusivityMaxAggregateOutputType | null
  }

  type GetExclusivityGroupByPayload<T extends ExclusivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExclusivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExclusivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExclusivityGroupByOutputType[P]>
            : GetScalarType<T[P], ExclusivityGroupByOutputType[P]>
        }
      >
    >


  export type ExclusivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    price?: boolean
    totalSupply?: boolean
    tokenId?: boolean
    creatorAccountId?: boolean
    creatorAccount?: boolean | Exclusivity$creatorAccountArgs<ExtArgs>
  }, ExtArgs["result"]["exclusivity"]>

  export type ExclusivitySelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    price?: boolean
    totalSupply?: boolean
    tokenId?: boolean
    creatorAccountId?: boolean
  }

  export type ExclusivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creatorAccount?: boolean | Exclusivity$creatorAccountArgs<ExtArgs>
  }


  export type $ExclusivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exclusivity"
    objects: {
      creatorAccount: Prisma.$CreatorAccountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      imageUrl: string
      price: string
      totalSupply: string
      tokenId: string
      creatorAccountId: string
    }, ExtArgs["result"]["exclusivity"]>
    composites: {}
  }


  type ExclusivityGetPayload<S extends boolean | null | undefined | ExclusivityDefaultArgs> = $Result.GetResult<Prisma.$ExclusivityPayload, S>

  type ExclusivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExclusivityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExclusivityCountAggregateInputType | true
    }

  export interface ExclusivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exclusivity'], meta: { name: 'Exclusivity' } }
    /**
     * Find zero or one Exclusivity that matches the filter.
     * @param {ExclusivityFindUniqueArgs} args - Arguments to find a Exclusivity
     * @example
     * // Get one Exclusivity
     * const exclusivity = await prisma.exclusivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ExclusivityFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ExclusivityFindUniqueArgs<ExtArgs>>
    ): Prisma__ExclusivityClient<$Result.GetResult<Prisma.$ExclusivityPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Exclusivity that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ExclusivityFindUniqueOrThrowArgs} args - Arguments to find a Exclusivity
     * @example
     * // Get one Exclusivity
     * const exclusivity = await prisma.exclusivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ExclusivityFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ExclusivityFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ExclusivityClient<$Result.GetResult<Prisma.$ExclusivityPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Exclusivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExclusivityFindFirstArgs} args - Arguments to find a Exclusivity
     * @example
     * // Get one Exclusivity
     * const exclusivity = await prisma.exclusivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ExclusivityFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ExclusivityFindFirstArgs<ExtArgs>>
    ): Prisma__ExclusivityClient<$Result.GetResult<Prisma.$ExclusivityPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Exclusivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExclusivityFindFirstOrThrowArgs} args - Arguments to find a Exclusivity
     * @example
     * // Get one Exclusivity
     * const exclusivity = await prisma.exclusivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ExclusivityFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ExclusivityFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ExclusivityClient<$Result.GetResult<Prisma.$ExclusivityPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Exclusivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExclusivityFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exclusivities
     * const exclusivities = await prisma.exclusivity.findMany()
     * 
     * // Get first 10 Exclusivities
     * const exclusivities = await prisma.exclusivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exclusivityWithIdOnly = await prisma.exclusivity.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ExclusivityFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ExclusivityFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExclusivityPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Exclusivity.
     * @param {ExclusivityCreateArgs} args - Arguments to create a Exclusivity.
     * @example
     * // Create one Exclusivity
     * const Exclusivity = await prisma.exclusivity.create({
     *   data: {
     *     // ... data to create a Exclusivity
     *   }
     * })
     * 
    **/
    create<T extends ExclusivityCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ExclusivityCreateArgs<ExtArgs>>
    ): Prisma__ExclusivityClient<$Result.GetResult<Prisma.$ExclusivityPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Exclusivities.
     *     @param {ExclusivityCreateManyArgs} args - Arguments to create many Exclusivities.
     *     @example
     *     // Create many Exclusivities
     *     const exclusivity = await prisma.exclusivity.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ExclusivityCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ExclusivityCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Exclusivity.
     * @param {ExclusivityDeleteArgs} args - Arguments to delete one Exclusivity.
     * @example
     * // Delete one Exclusivity
     * const Exclusivity = await prisma.exclusivity.delete({
     *   where: {
     *     // ... filter to delete one Exclusivity
     *   }
     * })
     * 
    **/
    delete<T extends ExclusivityDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ExclusivityDeleteArgs<ExtArgs>>
    ): Prisma__ExclusivityClient<$Result.GetResult<Prisma.$ExclusivityPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Exclusivity.
     * @param {ExclusivityUpdateArgs} args - Arguments to update one Exclusivity.
     * @example
     * // Update one Exclusivity
     * const exclusivity = await prisma.exclusivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ExclusivityUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ExclusivityUpdateArgs<ExtArgs>>
    ): Prisma__ExclusivityClient<$Result.GetResult<Prisma.$ExclusivityPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Exclusivities.
     * @param {ExclusivityDeleteManyArgs} args - Arguments to filter Exclusivities to delete.
     * @example
     * // Delete a few Exclusivities
     * const { count } = await prisma.exclusivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ExclusivityDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ExclusivityDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exclusivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExclusivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exclusivities
     * const exclusivity = await prisma.exclusivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ExclusivityUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ExclusivityUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Exclusivity.
     * @param {ExclusivityUpsertArgs} args - Arguments to update or create a Exclusivity.
     * @example
     * // Update or create a Exclusivity
     * const exclusivity = await prisma.exclusivity.upsert({
     *   create: {
     *     // ... data to create a Exclusivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exclusivity we want to update
     *   }
     * })
    **/
    upsert<T extends ExclusivityUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ExclusivityUpsertArgs<ExtArgs>>
    ): Prisma__ExclusivityClient<$Result.GetResult<Prisma.$ExclusivityPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Exclusivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExclusivityCountArgs} args - Arguments to filter Exclusivities to count.
     * @example
     * // Count the number of Exclusivities
     * const count = await prisma.exclusivity.count({
     *   where: {
     *     // ... the filter for the Exclusivities we want to count
     *   }
     * })
    **/
    count<T extends ExclusivityCountArgs>(
      args?: Subset<T, ExclusivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExclusivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exclusivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExclusivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExclusivityAggregateArgs>(args: Subset<T, ExclusivityAggregateArgs>): Prisma.PrismaPromise<GetExclusivityAggregateType<T>>

    /**
     * Group by Exclusivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExclusivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExclusivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExclusivityGroupByArgs['orderBy'] }
        : { orderBy?: ExclusivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExclusivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExclusivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exclusivity model
   */
  readonly fields: ExclusivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exclusivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExclusivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    creatorAccount<T extends Exclusivity$creatorAccountArgs<ExtArgs> = {}>(args?: Subset<T, Exclusivity$creatorAccountArgs<ExtArgs>>): Prisma__CreatorAccountClient<$Result.GetResult<Prisma.$CreatorAccountPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Exclusivity model
   */ 
  interface ExclusivityFieldRefs {
    readonly id: FieldRef<"Exclusivity", 'String'>
    readonly title: FieldRef<"Exclusivity", 'String'>
    readonly description: FieldRef<"Exclusivity", 'String'>
    readonly imageUrl: FieldRef<"Exclusivity", 'String'>
    readonly price: FieldRef<"Exclusivity", 'String'>
    readonly totalSupply: FieldRef<"Exclusivity", 'String'>
    readonly tokenId: FieldRef<"Exclusivity", 'String'>
    readonly creatorAccountId: FieldRef<"Exclusivity", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Exclusivity findUnique
   */
  export type ExclusivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
    /**
     * Filter, which Exclusivity to fetch.
     */
    where: ExclusivityWhereUniqueInput
  }


  /**
   * Exclusivity findUniqueOrThrow
   */
  export type ExclusivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
    /**
     * Filter, which Exclusivity to fetch.
     */
    where: ExclusivityWhereUniqueInput
  }


  /**
   * Exclusivity findFirst
   */
  export type ExclusivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
    /**
     * Filter, which Exclusivity to fetch.
     */
    where?: ExclusivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exclusivities to fetch.
     */
    orderBy?: ExclusivityOrderByWithRelationInput | ExclusivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exclusivities.
     */
    cursor?: ExclusivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exclusivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exclusivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exclusivities.
     */
    distinct?: ExclusivityScalarFieldEnum | ExclusivityScalarFieldEnum[]
  }


  /**
   * Exclusivity findFirstOrThrow
   */
  export type ExclusivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
    /**
     * Filter, which Exclusivity to fetch.
     */
    where?: ExclusivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exclusivities to fetch.
     */
    orderBy?: ExclusivityOrderByWithRelationInput | ExclusivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exclusivities.
     */
    cursor?: ExclusivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exclusivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exclusivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exclusivities.
     */
    distinct?: ExclusivityScalarFieldEnum | ExclusivityScalarFieldEnum[]
  }


  /**
   * Exclusivity findMany
   */
  export type ExclusivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
    /**
     * Filter, which Exclusivities to fetch.
     */
    where?: ExclusivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exclusivities to fetch.
     */
    orderBy?: ExclusivityOrderByWithRelationInput | ExclusivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exclusivities.
     */
    cursor?: ExclusivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exclusivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exclusivities.
     */
    skip?: number
    distinct?: ExclusivityScalarFieldEnum | ExclusivityScalarFieldEnum[]
  }


  /**
   * Exclusivity create
   */
  export type ExclusivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Exclusivity.
     */
    data: XOR<ExclusivityCreateInput, ExclusivityUncheckedCreateInput>
  }


  /**
   * Exclusivity createMany
   */
  export type ExclusivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exclusivities.
     */
    data: ExclusivityCreateManyInput | ExclusivityCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Exclusivity update
   */
  export type ExclusivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Exclusivity.
     */
    data: XOR<ExclusivityUpdateInput, ExclusivityUncheckedUpdateInput>
    /**
     * Choose, which Exclusivity to update.
     */
    where: ExclusivityWhereUniqueInput
  }


  /**
   * Exclusivity updateMany
   */
  export type ExclusivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exclusivities.
     */
    data: XOR<ExclusivityUpdateManyMutationInput, ExclusivityUncheckedUpdateManyInput>
    /**
     * Filter which Exclusivities to update
     */
    where?: ExclusivityWhereInput
  }


  /**
   * Exclusivity upsert
   */
  export type ExclusivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Exclusivity to update in case it exists.
     */
    where: ExclusivityWhereUniqueInput
    /**
     * In case the Exclusivity found by the `where` argument doesn't exist, create a new Exclusivity with this data.
     */
    create: XOR<ExclusivityCreateInput, ExclusivityUncheckedCreateInput>
    /**
     * In case the Exclusivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExclusivityUpdateInput, ExclusivityUncheckedUpdateInput>
  }


  /**
   * Exclusivity delete
   */
  export type ExclusivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
    /**
     * Filter which Exclusivity to delete.
     */
    where: ExclusivityWhereUniqueInput
  }


  /**
   * Exclusivity deleteMany
   */
  export type ExclusivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exclusivities to delete
     */
    where?: ExclusivityWhereInput
  }


  /**
   * Exclusivity.creatorAccount
   */
  export type Exclusivity$creatorAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreatorAccount
     */
    select?: CreatorAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CreatorAccountInclude<ExtArgs> | null
    where?: CreatorAccountWhereInput
  }


  /**
   * Exclusivity without action
   */
  export type ExclusivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exclusivity
     */
    select?: ExclusivitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ExclusivityInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    address: 'address'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CreatorAccountScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    description: 'description',
    avatarUrl: 'avatarUrl',
    bannerUrl: 'bannerUrl',
    interests: 'interests',
    cards: 'cards',
    obolId: 'obolId',
    userId: 'userId'
  };

  export type CreatorAccountScalarFieldEnum = (typeof CreatorAccountScalarFieldEnum)[keyof typeof CreatorAccountScalarFieldEnum]


  export const UserAccountScalarFieldEnum: {
    id: 'id',
    username: 'username',
    avatarUrl: 'avatarUrl',
    interests: 'interests',
    userId: 'userId'
  };

  export type UserAccountScalarFieldEnum = (typeof UserAccountScalarFieldEnum)[keyof typeof UserAccountScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    videoUrl: 'videoUrl',
    title: 'title',
    description: 'description',
    tier: 'tier',
    date: 'date',
    creatorAccountId: 'creatorAccountId'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const ExclusivityScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    imageUrl: 'imageUrl',
    price: 'price',
    totalSupply: 'totalSupply',
    tokenId: 'tokenId',
    creatorAccountId: 'creatorAccountId'
  };

  export type ExclusivityScalarFieldEnum = (typeof ExclusivityScalarFieldEnum)[keyof typeof ExclusivityScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    address?: StringFilter<"User"> | string
    creatorAccount?: XOR<CreatorAccountNullableRelationFilter, CreatorAccountWhereInput> | null
    userAccount?: XOR<UserAccountNullableRelationFilter, UserAccountWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    address?: SortOrder
    creatorAccount?: CreatorAccountOrderByWithRelationInput
    userAccount?: UserAccountOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    address?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    email?: StringFilter<"User"> | string
    creatorAccount?: XOR<CreatorAccountNullableRelationFilter, CreatorAccountWhereInput> | null
    userAccount?: XOR<UserAccountNullableRelationFilter, UserAccountWhereInput> | null
  }, "id" | "address">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    address?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    address?: StringWithAggregatesFilter<"User"> | string
  }

  export type CreatorAccountWhereInput = {
    AND?: CreatorAccountWhereInput | CreatorAccountWhereInput[]
    OR?: CreatorAccountWhereInput[]
    NOT?: CreatorAccountWhereInput | CreatorAccountWhereInput[]
    id?: StringFilter<"CreatorAccount"> | string
    slug?: StringFilter<"CreatorAccount"> | string
    title?: StringFilter<"CreatorAccount"> | string
    description?: StringFilter<"CreatorAccount"> | string
    avatarUrl?: StringFilter<"CreatorAccount"> | string
    bannerUrl?: StringFilter<"CreatorAccount"> | string
    interests?: IntNullableListFilter<"CreatorAccount">
    cards?: JsonFilter<"CreatorAccount">
    obolId?: StringFilter<"CreatorAccount"> | string
    userId?: StringFilter<"CreatorAccount"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    posts?: PostListRelationFilter
    exclusivities?: ExclusivityListRelationFilter
  }

  export type CreatorAccountOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    avatarUrl?: SortOrder
    bannerUrl?: SortOrder
    interests?: SortOrder
    cards?: SortOrder
    obolId?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    posts?: PostOrderByRelationAggregateInput
    exclusivities?: ExclusivityOrderByRelationAggregateInput
  }

  export type CreatorAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    userId?: string
    AND?: CreatorAccountWhereInput | CreatorAccountWhereInput[]
    OR?: CreatorAccountWhereInput[]
    NOT?: CreatorAccountWhereInput | CreatorAccountWhereInput[]
    title?: StringFilter<"CreatorAccount"> | string
    description?: StringFilter<"CreatorAccount"> | string
    avatarUrl?: StringFilter<"CreatorAccount"> | string
    bannerUrl?: StringFilter<"CreatorAccount"> | string
    interests?: IntNullableListFilter<"CreatorAccount">
    cards?: JsonFilter<"CreatorAccount">
    obolId?: StringFilter<"CreatorAccount"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    posts?: PostListRelationFilter
    exclusivities?: ExclusivityListRelationFilter
  }, "id" | "slug" | "userId">

  export type CreatorAccountOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    avatarUrl?: SortOrder
    bannerUrl?: SortOrder
    interests?: SortOrder
    cards?: SortOrder
    obolId?: SortOrder
    userId?: SortOrder
    _count?: CreatorAccountCountOrderByAggregateInput
    _avg?: CreatorAccountAvgOrderByAggregateInput
    _max?: CreatorAccountMaxOrderByAggregateInput
    _min?: CreatorAccountMinOrderByAggregateInput
    _sum?: CreatorAccountSumOrderByAggregateInput
  }

  export type CreatorAccountScalarWhereWithAggregatesInput = {
    AND?: CreatorAccountScalarWhereWithAggregatesInput | CreatorAccountScalarWhereWithAggregatesInput[]
    OR?: CreatorAccountScalarWhereWithAggregatesInput[]
    NOT?: CreatorAccountScalarWhereWithAggregatesInput | CreatorAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreatorAccount"> | string
    slug?: StringWithAggregatesFilter<"CreatorAccount"> | string
    title?: StringWithAggregatesFilter<"CreatorAccount"> | string
    description?: StringWithAggregatesFilter<"CreatorAccount"> | string
    avatarUrl?: StringWithAggregatesFilter<"CreatorAccount"> | string
    bannerUrl?: StringWithAggregatesFilter<"CreatorAccount"> | string
    interests?: IntNullableListFilter<"CreatorAccount">
    cards?: JsonWithAggregatesFilter<"CreatorAccount">
    obolId?: StringWithAggregatesFilter<"CreatorAccount"> | string
    userId?: StringWithAggregatesFilter<"CreatorAccount"> | string
  }

  export type UserAccountWhereInput = {
    AND?: UserAccountWhereInput | UserAccountWhereInput[]
    OR?: UserAccountWhereInput[]
    NOT?: UserAccountWhereInput | UserAccountWhereInput[]
    id?: StringFilter<"UserAccount"> | string
    username?: StringFilter<"UserAccount"> | string
    avatarUrl?: StringFilter<"UserAccount"> | string
    interests?: IntNullableListFilter<"UserAccount">
    userId?: StringFilter<"UserAccount"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserAccountOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    avatarUrl?: SortOrder
    interests?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    userId?: string
    AND?: UserAccountWhereInput | UserAccountWhereInput[]
    OR?: UserAccountWhereInput[]
    NOT?: UserAccountWhereInput | UserAccountWhereInput[]
    avatarUrl?: StringFilter<"UserAccount"> | string
    interests?: IntNullableListFilter<"UserAccount">
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "username" | "userId">

  export type UserAccountOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    avatarUrl?: SortOrder
    interests?: SortOrder
    userId?: SortOrder
    _count?: UserAccountCountOrderByAggregateInput
    _avg?: UserAccountAvgOrderByAggregateInput
    _max?: UserAccountMaxOrderByAggregateInput
    _min?: UserAccountMinOrderByAggregateInput
    _sum?: UserAccountSumOrderByAggregateInput
  }

  export type UserAccountScalarWhereWithAggregatesInput = {
    AND?: UserAccountScalarWhereWithAggregatesInput | UserAccountScalarWhereWithAggregatesInput[]
    OR?: UserAccountScalarWhereWithAggregatesInput[]
    NOT?: UserAccountScalarWhereWithAggregatesInput | UserAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAccount"> | string
    username?: StringWithAggregatesFilter<"UserAccount"> | string
    avatarUrl?: StringWithAggregatesFilter<"UserAccount"> | string
    interests?: IntNullableListFilter<"UserAccount">
    userId?: StringWithAggregatesFilter<"UserAccount"> | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    videoUrl?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    description?: StringFilter<"Post"> | string
    tier?: StringFilter<"Post"> | string
    date?: DateTimeFilter<"Post"> | Date | string
    creatorAccountId?: StringFilter<"Post"> | string
    creatorAccount?: XOR<CreatorAccountNullableRelationFilter, CreatorAccountWhereInput> | null
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    videoUrl?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tier?: SortOrder
    date?: SortOrder
    creatorAccountId?: SortOrder
    creatorAccount?: CreatorAccountOrderByWithRelationInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    videoUrl?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    description?: StringFilter<"Post"> | string
    tier?: StringFilter<"Post"> | string
    date?: DateTimeFilter<"Post"> | Date | string
    creatorAccountId?: StringFilter<"Post"> | string
    creatorAccount?: XOR<CreatorAccountNullableRelationFilter, CreatorAccountWhereInput> | null
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    videoUrl?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tier?: SortOrder
    date?: SortOrder
    creatorAccountId?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    videoUrl?: StringWithAggregatesFilter<"Post"> | string
    title?: StringWithAggregatesFilter<"Post"> | string
    description?: StringWithAggregatesFilter<"Post"> | string
    tier?: StringWithAggregatesFilter<"Post"> | string
    date?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    creatorAccountId?: StringWithAggregatesFilter<"Post"> | string
  }

  export type ExclusivityWhereInput = {
    AND?: ExclusivityWhereInput | ExclusivityWhereInput[]
    OR?: ExclusivityWhereInput[]
    NOT?: ExclusivityWhereInput | ExclusivityWhereInput[]
    id?: StringFilter<"Exclusivity"> | string
    title?: StringFilter<"Exclusivity"> | string
    description?: StringFilter<"Exclusivity"> | string
    imageUrl?: StringFilter<"Exclusivity"> | string
    price?: StringFilter<"Exclusivity"> | string
    totalSupply?: StringFilter<"Exclusivity"> | string
    tokenId?: StringFilter<"Exclusivity"> | string
    creatorAccountId?: StringFilter<"Exclusivity"> | string
    creatorAccount?: XOR<CreatorAccountNullableRelationFilter, CreatorAccountWhereInput> | null
  }

  export type ExclusivityOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    price?: SortOrder
    totalSupply?: SortOrder
    tokenId?: SortOrder
    creatorAccountId?: SortOrder
    creatorAccount?: CreatorAccountOrderByWithRelationInput
  }

  export type ExclusivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExclusivityWhereInput | ExclusivityWhereInput[]
    OR?: ExclusivityWhereInput[]
    NOT?: ExclusivityWhereInput | ExclusivityWhereInput[]
    title?: StringFilter<"Exclusivity"> | string
    description?: StringFilter<"Exclusivity"> | string
    imageUrl?: StringFilter<"Exclusivity"> | string
    price?: StringFilter<"Exclusivity"> | string
    totalSupply?: StringFilter<"Exclusivity"> | string
    tokenId?: StringFilter<"Exclusivity"> | string
    creatorAccountId?: StringFilter<"Exclusivity"> | string
    creatorAccount?: XOR<CreatorAccountNullableRelationFilter, CreatorAccountWhereInput> | null
  }, "id">

  export type ExclusivityOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    price?: SortOrder
    totalSupply?: SortOrder
    tokenId?: SortOrder
    creatorAccountId?: SortOrder
    _count?: ExclusivityCountOrderByAggregateInput
    _max?: ExclusivityMaxOrderByAggregateInput
    _min?: ExclusivityMinOrderByAggregateInput
  }

  export type ExclusivityScalarWhereWithAggregatesInput = {
    AND?: ExclusivityScalarWhereWithAggregatesInput | ExclusivityScalarWhereWithAggregatesInput[]
    OR?: ExclusivityScalarWhereWithAggregatesInput[]
    NOT?: ExclusivityScalarWhereWithAggregatesInput | ExclusivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exclusivity"> | string
    title?: StringWithAggregatesFilter<"Exclusivity"> | string
    description?: StringWithAggregatesFilter<"Exclusivity"> | string
    imageUrl?: StringWithAggregatesFilter<"Exclusivity"> | string
    price?: StringWithAggregatesFilter<"Exclusivity"> | string
    totalSupply?: StringWithAggregatesFilter<"Exclusivity"> | string
    tokenId?: StringWithAggregatesFilter<"Exclusivity"> | string
    creatorAccountId?: StringWithAggregatesFilter<"Exclusivity"> | string
  }

  export type UserCreateInput = {
    id?: string
    email?: string
    address: string
    creatorAccount?: CreatorAccountCreateNestedOneWithoutUserInput
    userAccount?: UserAccountCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email?: string
    address: string
    creatorAccount?: CreatorAccountUncheckedCreateNestedOneWithoutUserInput
    userAccount?: UserAccountUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    creatorAccount?: CreatorAccountUpdateOneWithoutUserNestedInput
    userAccount?: UserAccountUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    creatorAccount?: CreatorAccountUncheckedUpdateOneWithoutUserNestedInput
    userAccount?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email?: string
    address: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
  }

  export type CreatorAccountCreateInput = {
    id?: string
    slug: string
    title?: string
    description?: string
    avatarUrl?: string
    bannerUrl?: string
    interests?: CreatorAccountCreateinterestsInput | number[]
    cards: JsonNullValueInput | InputJsonValue
    obolId?: string
    user: UserCreateNestedOneWithoutCreatorAccountInput
    posts?: PostCreateNestedManyWithoutCreatorAccountInput
    exclusivities?: ExclusivityCreateNestedManyWithoutCreatorAccountInput
  }

  export type CreatorAccountUncheckedCreateInput = {
    id?: string
    slug: string
    title?: string
    description?: string
    avatarUrl?: string
    bannerUrl?: string
    interests?: CreatorAccountCreateinterestsInput | number[]
    cards: JsonNullValueInput | InputJsonValue
    obolId?: string
    userId: string
    posts?: PostUncheckedCreateNestedManyWithoutCreatorAccountInput
    exclusivities?: ExclusivityUncheckedCreateNestedManyWithoutCreatorAccountInput
  }

  export type CreatorAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    bannerUrl?: StringFieldUpdateOperationsInput | string
    interests?: CreatorAccountUpdateinterestsInput | number[]
    cards?: JsonNullValueInput | InputJsonValue
    obolId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCreatorAccountNestedInput
    posts?: PostUpdateManyWithoutCreatorAccountNestedInput
    exclusivities?: ExclusivityUpdateManyWithoutCreatorAccountNestedInput
  }

  export type CreatorAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    bannerUrl?: StringFieldUpdateOperationsInput | string
    interests?: CreatorAccountUpdateinterestsInput | number[]
    cards?: JsonNullValueInput | InputJsonValue
    obolId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    posts?: PostUncheckedUpdateManyWithoutCreatorAccountNestedInput
    exclusivities?: ExclusivityUncheckedUpdateManyWithoutCreatorAccountNestedInput
  }

  export type CreatorAccountCreateManyInput = {
    id?: string
    slug: string
    title?: string
    description?: string
    avatarUrl?: string
    bannerUrl?: string
    interests?: CreatorAccountCreateinterestsInput | number[]
    cards: JsonNullValueInput | InputJsonValue
    obolId?: string
    userId: string
  }

  export type CreatorAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    bannerUrl?: StringFieldUpdateOperationsInput | string
    interests?: CreatorAccountUpdateinterestsInput | number[]
    cards?: JsonNullValueInput | InputJsonValue
    obolId?: StringFieldUpdateOperationsInput | string
  }

  export type CreatorAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    bannerUrl?: StringFieldUpdateOperationsInput | string
    interests?: CreatorAccountUpdateinterestsInput | number[]
    cards?: JsonNullValueInput | InputJsonValue
    obolId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserAccountCreateInput = {
    id?: string
    username: string
    avatarUrl?: string
    interests?: UserAccountCreateinterestsInput | number[]
    user: UserCreateNestedOneWithoutUserAccountInput
  }

  export type UserAccountUncheckedCreateInput = {
    id?: string
    username: string
    avatarUrl?: string
    interests?: UserAccountCreateinterestsInput | number[]
    userId: string
  }

  export type UserAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    interests?: UserAccountUpdateinterestsInput | number[]
    user?: UserUpdateOneRequiredWithoutUserAccountNestedInput
  }

  export type UserAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    interests?: UserAccountUpdateinterestsInput | number[]
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserAccountCreateManyInput = {
    id?: string
    username: string
    avatarUrl?: string
    interests?: UserAccountCreateinterestsInput | number[]
    userId: string
  }

  export type UserAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    interests?: UserAccountUpdateinterestsInput | number[]
  }

  export type UserAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    interests?: UserAccountUpdateinterestsInput | number[]
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PostCreateInput = {
    id?: string
    videoUrl?: string
    title?: string
    description?: string
    tier?: string
    date?: Date | string
    creatorAccount?: CreatorAccountCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    videoUrl?: string
    title?: string
    description?: string
    tier?: string
    date?: Date | string
    creatorAccountId: string
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorAccount?: CreatorAccountUpdateOneWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorAccountId?: StringFieldUpdateOperationsInput | string
  }

  export type PostCreateManyInput = {
    id?: string
    videoUrl?: string
    title?: string
    description?: string
    tier?: string
    date?: Date | string
    creatorAccountId: string
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorAccountId?: StringFieldUpdateOperationsInput | string
  }

  export type ExclusivityCreateInput = {
    id?: string
    title?: string
    description?: string
    imageUrl?: string
    price?: string
    totalSupply?: string
    tokenId?: string
    creatorAccount?: CreatorAccountCreateNestedOneWithoutExclusivitiesInput
  }

  export type ExclusivityUncheckedCreateInput = {
    id?: string
    title?: string
    description?: string
    imageUrl?: string
    price?: string
    totalSupply?: string
    tokenId?: string
    creatorAccountId: string
  }

  export type ExclusivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    totalSupply?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    creatorAccount?: CreatorAccountUpdateOneWithoutExclusivitiesNestedInput
  }

  export type ExclusivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    totalSupply?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    creatorAccountId?: StringFieldUpdateOperationsInput | string
  }

  export type ExclusivityCreateManyInput = {
    id?: string
    title?: string
    description?: string
    imageUrl?: string
    price?: string
    totalSupply?: string
    tokenId?: string
    creatorAccountId: string
  }

  export type ExclusivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    totalSupply?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
  }

  export type ExclusivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    totalSupply?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    creatorAccountId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type CreatorAccountNullableRelationFilter = {
    is?: CreatorAccountWhereInput | null
    isNot?: CreatorAccountWhereInput | null
  }

  export type UserAccountNullableRelationFilter = {
    is?: UserAccountWhereInput | null
    isNot?: UserAccountWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    address?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    address?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    address?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type ExclusivityListRelationFilter = {
    every?: ExclusivityWhereInput
    some?: ExclusivityWhereInput
    none?: ExclusivityWhereInput
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExclusivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreatorAccountCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    avatarUrl?: SortOrder
    bannerUrl?: SortOrder
    interests?: SortOrder
    cards?: SortOrder
    obolId?: SortOrder
    userId?: SortOrder
  }

  export type CreatorAccountAvgOrderByAggregateInput = {
    interests?: SortOrder
  }

  export type CreatorAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    avatarUrl?: SortOrder
    bannerUrl?: SortOrder
    obolId?: SortOrder
    userId?: SortOrder
  }

  export type CreatorAccountMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    avatarUrl?: SortOrder
    bannerUrl?: SortOrder
    obolId?: SortOrder
    userId?: SortOrder
  }

  export type CreatorAccountSumOrderByAggregateInput = {
    interests?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type UserAccountCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    avatarUrl?: SortOrder
    interests?: SortOrder
    userId?: SortOrder
  }

  export type UserAccountAvgOrderByAggregateInput = {
    interests?: SortOrder
  }

  export type UserAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    avatarUrl?: SortOrder
    userId?: SortOrder
  }

  export type UserAccountMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    avatarUrl?: SortOrder
    userId?: SortOrder
  }

  export type UserAccountSumOrderByAggregateInput = {
    interests?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    videoUrl?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tier?: SortOrder
    date?: SortOrder
    creatorAccountId?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    videoUrl?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tier?: SortOrder
    date?: SortOrder
    creatorAccountId?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    videoUrl?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tier?: SortOrder
    date?: SortOrder
    creatorAccountId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ExclusivityCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    price?: SortOrder
    totalSupply?: SortOrder
    tokenId?: SortOrder
    creatorAccountId?: SortOrder
  }

  export type ExclusivityMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    price?: SortOrder
    totalSupply?: SortOrder
    tokenId?: SortOrder
    creatorAccountId?: SortOrder
  }

  export type ExclusivityMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    price?: SortOrder
    totalSupply?: SortOrder
    tokenId?: SortOrder
    creatorAccountId?: SortOrder
  }

  export type CreatorAccountCreateNestedOneWithoutUserInput = {
    create?: XOR<CreatorAccountCreateWithoutUserInput, CreatorAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreatorAccountCreateOrConnectWithoutUserInput
    connect?: CreatorAccountWhereUniqueInput
  }

  export type UserAccountCreateNestedOneWithoutUserInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput
    connect?: UserAccountWhereUniqueInput
  }

  export type CreatorAccountUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CreatorAccountCreateWithoutUserInput, CreatorAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreatorAccountCreateOrConnectWithoutUserInput
    connect?: CreatorAccountWhereUniqueInput
  }

  export type UserAccountUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput
    connect?: UserAccountWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type CreatorAccountUpdateOneWithoutUserNestedInput = {
    create?: XOR<CreatorAccountCreateWithoutUserInput, CreatorAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreatorAccountCreateOrConnectWithoutUserInput
    upsert?: CreatorAccountUpsertWithoutUserInput
    disconnect?: CreatorAccountWhereInput | boolean
    delete?: CreatorAccountWhereInput | boolean
    connect?: CreatorAccountWhereUniqueInput
    update?: XOR<XOR<CreatorAccountUpdateToOneWithWhereWithoutUserInput, CreatorAccountUpdateWithoutUserInput>, CreatorAccountUncheckedUpdateWithoutUserInput>
  }

  export type UserAccountUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput
    upsert?: UserAccountUpsertWithoutUserInput
    disconnect?: UserAccountWhereInput | boolean
    delete?: UserAccountWhereInput | boolean
    connect?: UserAccountWhereUniqueInput
    update?: XOR<XOR<UserAccountUpdateToOneWithWhereWithoutUserInput, UserAccountUpdateWithoutUserInput>, UserAccountUncheckedUpdateWithoutUserInput>
  }

  export type CreatorAccountUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CreatorAccountCreateWithoutUserInput, CreatorAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreatorAccountCreateOrConnectWithoutUserInput
    upsert?: CreatorAccountUpsertWithoutUserInput
    disconnect?: CreatorAccountWhereInput | boolean
    delete?: CreatorAccountWhereInput | boolean
    connect?: CreatorAccountWhereUniqueInput
    update?: XOR<XOR<CreatorAccountUpdateToOneWithWhereWithoutUserInput, CreatorAccountUpdateWithoutUserInput>, CreatorAccountUncheckedUpdateWithoutUserInput>
  }

  export type UserAccountUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput
    upsert?: UserAccountUpsertWithoutUserInput
    disconnect?: UserAccountWhereInput | boolean
    delete?: UserAccountWhereInput | boolean
    connect?: UserAccountWhereUniqueInput
    update?: XOR<XOR<UserAccountUpdateToOneWithWhereWithoutUserInput, UserAccountUpdateWithoutUserInput>, UserAccountUncheckedUpdateWithoutUserInput>
  }

  export type CreatorAccountCreateinterestsInput = {
    set: number[]
  }

  export type UserCreateNestedOneWithoutCreatorAccountInput = {
    create?: XOR<UserCreateWithoutCreatorAccountInput, UserUncheckedCreateWithoutCreatorAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatorAccountInput
    connect?: UserWhereUniqueInput
  }

  export type PostCreateNestedManyWithoutCreatorAccountInput = {
    create?: XOR<PostCreateWithoutCreatorAccountInput, PostUncheckedCreateWithoutCreatorAccountInput> | PostCreateWithoutCreatorAccountInput[] | PostUncheckedCreateWithoutCreatorAccountInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCreatorAccountInput | PostCreateOrConnectWithoutCreatorAccountInput[]
    createMany?: PostCreateManyCreatorAccountInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ExclusivityCreateNestedManyWithoutCreatorAccountInput = {
    create?: XOR<ExclusivityCreateWithoutCreatorAccountInput, ExclusivityUncheckedCreateWithoutCreatorAccountInput> | ExclusivityCreateWithoutCreatorAccountInput[] | ExclusivityUncheckedCreateWithoutCreatorAccountInput[]
    connectOrCreate?: ExclusivityCreateOrConnectWithoutCreatorAccountInput | ExclusivityCreateOrConnectWithoutCreatorAccountInput[]
    createMany?: ExclusivityCreateManyCreatorAccountInputEnvelope
    connect?: ExclusivityWhereUniqueInput | ExclusivityWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutCreatorAccountInput = {
    create?: XOR<PostCreateWithoutCreatorAccountInput, PostUncheckedCreateWithoutCreatorAccountInput> | PostCreateWithoutCreatorAccountInput[] | PostUncheckedCreateWithoutCreatorAccountInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCreatorAccountInput | PostCreateOrConnectWithoutCreatorAccountInput[]
    createMany?: PostCreateManyCreatorAccountInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ExclusivityUncheckedCreateNestedManyWithoutCreatorAccountInput = {
    create?: XOR<ExclusivityCreateWithoutCreatorAccountInput, ExclusivityUncheckedCreateWithoutCreatorAccountInput> | ExclusivityCreateWithoutCreatorAccountInput[] | ExclusivityUncheckedCreateWithoutCreatorAccountInput[]
    connectOrCreate?: ExclusivityCreateOrConnectWithoutCreatorAccountInput | ExclusivityCreateOrConnectWithoutCreatorAccountInput[]
    createMany?: ExclusivityCreateManyCreatorAccountInputEnvelope
    connect?: ExclusivityWhereUniqueInput | ExclusivityWhereUniqueInput[]
  }

  export type CreatorAccountUpdateinterestsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type UserUpdateOneRequiredWithoutCreatorAccountNestedInput = {
    create?: XOR<UserCreateWithoutCreatorAccountInput, UserUncheckedCreateWithoutCreatorAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatorAccountInput
    upsert?: UserUpsertWithoutCreatorAccountInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatorAccountInput, UserUpdateWithoutCreatorAccountInput>, UserUncheckedUpdateWithoutCreatorAccountInput>
  }

  export type PostUpdateManyWithoutCreatorAccountNestedInput = {
    create?: XOR<PostCreateWithoutCreatorAccountInput, PostUncheckedCreateWithoutCreatorAccountInput> | PostCreateWithoutCreatorAccountInput[] | PostUncheckedCreateWithoutCreatorAccountInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCreatorAccountInput | PostCreateOrConnectWithoutCreatorAccountInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutCreatorAccountInput | PostUpsertWithWhereUniqueWithoutCreatorAccountInput[]
    createMany?: PostCreateManyCreatorAccountInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutCreatorAccountInput | PostUpdateWithWhereUniqueWithoutCreatorAccountInput[]
    updateMany?: PostUpdateManyWithWhereWithoutCreatorAccountInput | PostUpdateManyWithWhereWithoutCreatorAccountInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ExclusivityUpdateManyWithoutCreatorAccountNestedInput = {
    create?: XOR<ExclusivityCreateWithoutCreatorAccountInput, ExclusivityUncheckedCreateWithoutCreatorAccountInput> | ExclusivityCreateWithoutCreatorAccountInput[] | ExclusivityUncheckedCreateWithoutCreatorAccountInput[]
    connectOrCreate?: ExclusivityCreateOrConnectWithoutCreatorAccountInput | ExclusivityCreateOrConnectWithoutCreatorAccountInput[]
    upsert?: ExclusivityUpsertWithWhereUniqueWithoutCreatorAccountInput | ExclusivityUpsertWithWhereUniqueWithoutCreatorAccountInput[]
    createMany?: ExclusivityCreateManyCreatorAccountInputEnvelope
    set?: ExclusivityWhereUniqueInput | ExclusivityWhereUniqueInput[]
    disconnect?: ExclusivityWhereUniqueInput | ExclusivityWhereUniqueInput[]
    delete?: ExclusivityWhereUniqueInput | ExclusivityWhereUniqueInput[]
    connect?: ExclusivityWhereUniqueInput | ExclusivityWhereUniqueInput[]
    update?: ExclusivityUpdateWithWhereUniqueWithoutCreatorAccountInput | ExclusivityUpdateWithWhereUniqueWithoutCreatorAccountInput[]
    updateMany?: ExclusivityUpdateManyWithWhereWithoutCreatorAccountInput | ExclusivityUpdateManyWithWhereWithoutCreatorAccountInput[]
    deleteMany?: ExclusivityScalarWhereInput | ExclusivityScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutCreatorAccountNestedInput = {
    create?: XOR<PostCreateWithoutCreatorAccountInput, PostUncheckedCreateWithoutCreatorAccountInput> | PostCreateWithoutCreatorAccountInput[] | PostUncheckedCreateWithoutCreatorAccountInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCreatorAccountInput | PostCreateOrConnectWithoutCreatorAccountInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutCreatorAccountInput | PostUpsertWithWhereUniqueWithoutCreatorAccountInput[]
    createMany?: PostCreateManyCreatorAccountInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutCreatorAccountInput | PostUpdateWithWhereUniqueWithoutCreatorAccountInput[]
    updateMany?: PostUpdateManyWithWhereWithoutCreatorAccountInput | PostUpdateManyWithWhereWithoutCreatorAccountInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ExclusivityUncheckedUpdateManyWithoutCreatorAccountNestedInput = {
    create?: XOR<ExclusivityCreateWithoutCreatorAccountInput, ExclusivityUncheckedCreateWithoutCreatorAccountInput> | ExclusivityCreateWithoutCreatorAccountInput[] | ExclusivityUncheckedCreateWithoutCreatorAccountInput[]
    connectOrCreate?: ExclusivityCreateOrConnectWithoutCreatorAccountInput | ExclusivityCreateOrConnectWithoutCreatorAccountInput[]
    upsert?: ExclusivityUpsertWithWhereUniqueWithoutCreatorAccountInput | ExclusivityUpsertWithWhereUniqueWithoutCreatorAccountInput[]
    createMany?: ExclusivityCreateManyCreatorAccountInputEnvelope
    set?: ExclusivityWhereUniqueInput | ExclusivityWhereUniqueInput[]
    disconnect?: ExclusivityWhereUniqueInput | ExclusivityWhereUniqueInput[]
    delete?: ExclusivityWhereUniqueInput | ExclusivityWhereUniqueInput[]
    connect?: ExclusivityWhereUniqueInput | ExclusivityWhereUniqueInput[]
    update?: ExclusivityUpdateWithWhereUniqueWithoutCreatorAccountInput | ExclusivityUpdateWithWhereUniqueWithoutCreatorAccountInput[]
    updateMany?: ExclusivityUpdateManyWithWhereWithoutCreatorAccountInput | ExclusivityUpdateManyWithWhereWithoutCreatorAccountInput[]
    deleteMany?: ExclusivityScalarWhereInput | ExclusivityScalarWhereInput[]
  }

  export type UserAccountCreateinterestsInput = {
    set: number[]
  }

  export type UserCreateNestedOneWithoutUserAccountInput = {
    create?: XOR<UserCreateWithoutUserAccountInput, UserUncheckedCreateWithoutUserAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserAccountInput
    connect?: UserWhereUniqueInput
  }

  export type UserAccountUpdateinterestsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type UserUpdateOneRequiredWithoutUserAccountNestedInput = {
    create?: XOR<UserCreateWithoutUserAccountInput, UserUncheckedCreateWithoutUserAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserAccountInput
    upsert?: UserUpsertWithoutUserAccountInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserAccountInput, UserUpdateWithoutUserAccountInput>, UserUncheckedUpdateWithoutUserAccountInput>
  }

  export type CreatorAccountCreateNestedOneWithoutPostsInput = {
    create?: XOR<CreatorAccountCreateWithoutPostsInput, CreatorAccountUncheckedCreateWithoutPostsInput>
    connectOrCreate?: CreatorAccountCreateOrConnectWithoutPostsInput
    connect?: CreatorAccountWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CreatorAccountUpdateOneWithoutPostsNestedInput = {
    create?: XOR<CreatorAccountCreateWithoutPostsInput, CreatorAccountUncheckedCreateWithoutPostsInput>
    connectOrCreate?: CreatorAccountCreateOrConnectWithoutPostsInput
    upsert?: CreatorAccountUpsertWithoutPostsInput
    disconnect?: CreatorAccountWhereInput | boolean
    delete?: CreatorAccountWhereInput | boolean
    connect?: CreatorAccountWhereUniqueInput
    update?: XOR<XOR<CreatorAccountUpdateToOneWithWhereWithoutPostsInput, CreatorAccountUpdateWithoutPostsInput>, CreatorAccountUncheckedUpdateWithoutPostsInput>
  }

  export type CreatorAccountCreateNestedOneWithoutExclusivitiesInput = {
    create?: XOR<CreatorAccountCreateWithoutExclusivitiesInput, CreatorAccountUncheckedCreateWithoutExclusivitiesInput>
    connectOrCreate?: CreatorAccountCreateOrConnectWithoutExclusivitiesInput
    connect?: CreatorAccountWhereUniqueInput
  }

  export type CreatorAccountUpdateOneWithoutExclusivitiesNestedInput = {
    create?: XOR<CreatorAccountCreateWithoutExclusivitiesInput, CreatorAccountUncheckedCreateWithoutExclusivitiesInput>
    connectOrCreate?: CreatorAccountCreateOrConnectWithoutExclusivitiesInput
    upsert?: CreatorAccountUpsertWithoutExclusivitiesInput
    disconnect?: CreatorAccountWhereInput | boolean
    delete?: CreatorAccountWhereInput | boolean
    connect?: CreatorAccountWhereUniqueInput
    update?: XOR<XOR<CreatorAccountUpdateToOneWithWhereWithoutExclusivitiesInput, CreatorAccountUpdateWithoutExclusivitiesInput>, CreatorAccountUncheckedUpdateWithoutExclusivitiesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CreatorAccountCreateWithoutUserInput = {
    id?: string
    slug: string
    title?: string
    description?: string
    avatarUrl?: string
    bannerUrl?: string
    interests?: CreatorAccountCreateinterestsInput | number[]
    cards: JsonNullValueInput | InputJsonValue
    obolId?: string
    posts?: PostCreateNestedManyWithoutCreatorAccountInput
    exclusivities?: ExclusivityCreateNestedManyWithoutCreatorAccountInput
  }

  export type CreatorAccountUncheckedCreateWithoutUserInput = {
    id?: string
    slug: string
    title?: string
    description?: string
    avatarUrl?: string
    bannerUrl?: string
    interests?: CreatorAccountCreateinterestsInput | number[]
    cards: JsonNullValueInput | InputJsonValue
    obolId?: string
    posts?: PostUncheckedCreateNestedManyWithoutCreatorAccountInput
    exclusivities?: ExclusivityUncheckedCreateNestedManyWithoutCreatorAccountInput
  }

  export type CreatorAccountCreateOrConnectWithoutUserInput = {
    where: CreatorAccountWhereUniqueInput
    create: XOR<CreatorAccountCreateWithoutUserInput, CreatorAccountUncheckedCreateWithoutUserInput>
  }

  export type UserAccountCreateWithoutUserInput = {
    id?: string
    username: string
    avatarUrl?: string
    interests?: UserAccountCreateinterestsInput | number[]
  }

  export type UserAccountUncheckedCreateWithoutUserInput = {
    id?: string
    username: string
    avatarUrl?: string
    interests?: UserAccountCreateinterestsInput | number[]
  }

  export type UserAccountCreateOrConnectWithoutUserInput = {
    where: UserAccountWhereUniqueInput
    create: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
  }

  export type CreatorAccountUpsertWithoutUserInput = {
    update: XOR<CreatorAccountUpdateWithoutUserInput, CreatorAccountUncheckedUpdateWithoutUserInput>
    create: XOR<CreatorAccountCreateWithoutUserInput, CreatorAccountUncheckedCreateWithoutUserInput>
    where?: CreatorAccountWhereInput
  }

  export type CreatorAccountUpdateToOneWithWhereWithoutUserInput = {
    where?: CreatorAccountWhereInput
    data: XOR<CreatorAccountUpdateWithoutUserInput, CreatorAccountUncheckedUpdateWithoutUserInput>
  }

  export type CreatorAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    bannerUrl?: StringFieldUpdateOperationsInput | string
    interests?: CreatorAccountUpdateinterestsInput | number[]
    cards?: JsonNullValueInput | InputJsonValue
    obolId?: StringFieldUpdateOperationsInput | string
    posts?: PostUpdateManyWithoutCreatorAccountNestedInput
    exclusivities?: ExclusivityUpdateManyWithoutCreatorAccountNestedInput
  }

  export type CreatorAccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    bannerUrl?: StringFieldUpdateOperationsInput | string
    interests?: CreatorAccountUpdateinterestsInput | number[]
    cards?: JsonNullValueInput | InputJsonValue
    obolId?: StringFieldUpdateOperationsInput | string
    posts?: PostUncheckedUpdateManyWithoutCreatorAccountNestedInput
    exclusivities?: ExclusivityUncheckedUpdateManyWithoutCreatorAccountNestedInput
  }

  export type UserAccountUpsertWithoutUserInput = {
    update: XOR<UserAccountUpdateWithoutUserInput, UserAccountUncheckedUpdateWithoutUserInput>
    create: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
    where?: UserAccountWhereInput
  }

  export type UserAccountUpdateToOneWithWhereWithoutUserInput = {
    where?: UserAccountWhereInput
    data: XOR<UserAccountUpdateWithoutUserInput, UserAccountUncheckedUpdateWithoutUserInput>
  }

  export type UserAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    interests?: UserAccountUpdateinterestsInput | number[]
  }

  export type UserAccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    interests?: UserAccountUpdateinterestsInput | number[]
  }

  export type UserCreateWithoutCreatorAccountInput = {
    id?: string
    email?: string
    address: string
    userAccount?: UserAccountCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatorAccountInput = {
    id?: string
    email?: string
    address: string
    userAccount?: UserAccountUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatorAccountInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatorAccountInput, UserUncheckedCreateWithoutCreatorAccountInput>
  }

  export type PostCreateWithoutCreatorAccountInput = {
    id?: string
    videoUrl?: string
    title?: string
    description?: string
    tier?: string
    date?: Date | string
  }

  export type PostUncheckedCreateWithoutCreatorAccountInput = {
    id?: string
    videoUrl?: string
    title?: string
    description?: string
    tier?: string
    date?: Date | string
  }

  export type PostCreateOrConnectWithoutCreatorAccountInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCreatorAccountInput, PostUncheckedCreateWithoutCreatorAccountInput>
  }

  export type PostCreateManyCreatorAccountInputEnvelope = {
    data: PostCreateManyCreatorAccountInput | PostCreateManyCreatorAccountInput[]
    skipDuplicates?: boolean
  }

  export type ExclusivityCreateWithoutCreatorAccountInput = {
    id?: string
    title?: string
    description?: string
    imageUrl?: string
    price?: string
    totalSupply?: string
    tokenId?: string
  }

  export type ExclusivityUncheckedCreateWithoutCreatorAccountInput = {
    id?: string
    title?: string
    description?: string
    imageUrl?: string
    price?: string
    totalSupply?: string
    tokenId?: string
  }

  export type ExclusivityCreateOrConnectWithoutCreatorAccountInput = {
    where: ExclusivityWhereUniqueInput
    create: XOR<ExclusivityCreateWithoutCreatorAccountInput, ExclusivityUncheckedCreateWithoutCreatorAccountInput>
  }

  export type ExclusivityCreateManyCreatorAccountInputEnvelope = {
    data: ExclusivityCreateManyCreatorAccountInput | ExclusivityCreateManyCreatorAccountInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatorAccountInput = {
    update: XOR<UserUpdateWithoutCreatorAccountInput, UserUncheckedUpdateWithoutCreatorAccountInput>
    create: XOR<UserCreateWithoutCreatorAccountInput, UserUncheckedCreateWithoutCreatorAccountInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatorAccountInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatorAccountInput, UserUncheckedUpdateWithoutCreatorAccountInput>
  }

  export type UserUpdateWithoutCreatorAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    userAccount?: UserAccountUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatorAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    userAccount?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PostUpsertWithWhereUniqueWithoutCreatorAccountInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutCreatorAccountInput, PostUncheckedUpdateWithoutCreatorAccountInput>
    create: XOR<PostCreateWithoutCreatorAccountInput, PostUncheckedCreateWithoutCreatorAccountInput>
  }

  export type PostUpdateWithWhereUniqueWithoutCreatorAccountInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutCreatorAccountInput, PostUncheckedUpdateWithoutCreatorAccountInput>
  }

  export type PostUpdateManyWithWhereWithoutCreatorAccountInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutCreatorAccountInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: StringFilter<"Post"> | string
    videoUrl?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    description?: StringFilter<"Post"> | string
    tier?: StringFilter<"Post"> | string
    date?: DateTimeFilter<"Post"> | Date | string
    creatorAccountId?: StringFilter<"Post"> | string
  }

  export type ExclusivityUpsertWithWhereUniqueWithoutCreatorAccountInput = {
    where: ExclusivityWhereUniqueInput
    update: XOR<ExclusivityUpdateWithoutCreatorAccountInput, ExclusivityUncheckedUpdateWithoutCreatorAccountInput>
    create: XOR<ExclusivityCreateWithoutCreatorAccountInput, ExclusivityUncheckedCreateWithoutCreatorAccountInput>
  }

  export type ExclusivityUpdateWithWhereUniqueWithoutCreatorAccountInput = {
    where: ExclusivityWhereUniqueInput
    data: XOR<ExclusivityUpdateWithoutCreatorAccountInput, ExclusivityUncheckedUpdateWithoutCreatorAccountInput>
  }

  export type ExclusivityUpdateManyWithWhereWithoutCreatorAccountInput = {
    where: ExclusivityScalarWhereInput
    data: XOR<ExclusivityUpdateManyMutationInput, ExclusivityUncheckedUpdateManyWithoutCreatorAccountInput>
  }

  export type ExclusivityScalarWhereInput = {
    AND?: ExclusivityScalarWhereInput | ExclusivityScalarWhereInput[]
    OR?: ExclusivityScalarWhereInput[]
    NOT?: ExclusivityScalarWhereInput | ExclusivityScalarWhereInput[]
    id?: StringFilter<"Exclusivity"> | string
    title?: StringFilter<"Exclusivity"> | string
    description?: StringFilter<"Exclusivity"> | string
    imageUrl?: StringFilter<"Exclusivity"> | string
    price?: StringFilter<"Exclusivity"> | string
    totalSupply?: StringFilter<"Exclusivity"> | string
    tokenId?: StringFilter<"Exclusivity"> | string
    creatorAccountId?: StringFilter<"Exclusivity"> | string
  }

  export type UserCreateWithoutUserAccountInput = {
    id?: string
    email?: string
    address: string
    creatorAccount?: CreatorAccountCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserAccountInput = {
    id?: string
    email?: string
    address: string
    creatorAccount?: CreatorAccountUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserAccountInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserAccountInput, UserUncheckedCreateWithoutUserAccountInput>
  }

  export type UserUpsertWithoutUserAccountInput = {
    update: XOR<UserUpdateWithoutUserAccountInput, UserUncheckedUpdateWithoutUserAccountInput>
    create: XOR<UserCreateWithoutUserAccountInput, UserUncheckedCreateWithoutUserAccountInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserAccountInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserAccountInput, UserUncheckedUpdateWithoutUserAccountInput>
  }

  export type UserUpdateWithoutUserAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    creatorAccount?: CreatorAccountUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    creatorAccount?: CreatorAccountUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CreatorAccountCreateWithoutPostsInput = {
    id?: string
    slug: string
    title?: string
    description?: string
    avatarUrl?: string
    bannerUrl?: string
    interests?: CreatorAccountCreateinterestsInput | number[]
    cards: JsonNullValueInput | InputJsonValue
    obolId?: string
    user: UserCreateNestedOneWithoutCreatorAccountInput
    exclusivities?: ExclusivityCreateNestedManyWithoutCreatorAccountInput
  }

  export type CreatorAccountUncheckedCreateWithoutPostsInput = {
    id?: string
    slug: string
    title?: string
    description?: string
    avatarUrl?: string
    bannerUrl?: string
    interests?: CreatorAccountCreateinterestsInput | number[]
    cards: JsonNullValueInput | InputJsonValue
    obolId?: string
    userId: string
    exclusivities?: ExclusivityUncheckedCreateNestedManyWithoutCreatorAccountInput
  }

  export type CreatorAccountCreateOrConnectWithoutPostsInput = {
    where: CreatorAccountWhereUniqueInput
    create: XOR<CreatorAccountCreateWithoutPostsInput, CreatorAccountUncheckedCreateWithoutPostsInput>
  }

  export type CreatorAccountUpsertWithoutPostsInput = {
    update: XOR<CreatorAccountUpdateWithoutPostsInput, CreatorAccountUncheckedUpdateWithoutPostsInput>
    create: XOR<CreatorAccountCreateWithoutPostsInput, CreatorAccountUncheckedCreateWithoutPostsInput>
    where?: CreatorAccountWhereInput
  }

  export type CreatorAccountUpdateToOneWithWhereWithoutPostsInput = {
    where?: CreatorAccountWhereInput
    data: XOR<CreatorAccountUpdateWithoutPostsInput, CreatorAccountUncheckedUpdateWithoutPostsInput>
  }

  export type CreatorAccountUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    bannerUrl?: StringFieldUpdateOperationsInput | string
    interests?: CreatorAccountUpdateinterestsInput | number[]
    cards?: JsonNullValueInput | InputJsonValue
    obolId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCreatorAccountNestedInput
    exclusivities?: ExclusivityUpdateManyWithoutCreatorAccountNestedInput
  }

  export type CreatorAccountUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    bannerUrl?: StringFieldUpdateOperationsInput | string
    interests?: CreatorAccountUpdateinterestsInput | number[]
    cards?: JsonNullValueInput | InputJsonValue
    obolId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    exclusivities?: ExclusivityUncheckedUpdateManyWithoutCreatorAccountNestedInput
  }

  export type CreatorAccountCreateWithoutExclusivitiesInput = {
    id?: string
    slug: string
    title?: string
    description?: string
    avatarUrl?: string
    bannerUrl?: string
    interests?: CreatorAccountCreateinterestsInput | number[]
    cards: JsonNullValueInput | InputJsonValue
    obolId?: string
    user: UserCreateNestedOneWithoutCreatorAccountInput
    posts?: PostCreateNestedManyWithoutCreatorAccountInput
  }

  export type CreatorAccountUncheckedCreateWithoutExclusivitiesInput = {
    id?: string
    slug: string
    title?: string
    description?: string
    avatarUrl?: string
    bannerUrl?: string
    interests?: CreatorAccountCreateinterestsInput | number[]
    cards: JsonNullValueInput | InputJsonValue
    obolId?: string
    userId: string
    posts?: PostUncheckedCreateNestedManyWithoutCreatorAccountInput
  }

  export type CreatorAccountCreateOrConnectWithoutExclusivitiesInput = {
    where: CreatorAccountWhereUniqueInput
    create: XOR<CreatorAccountCreateWithoutExclusivitiesInput, CreatorAccountUncheckedCreateWithoutExclusivitiesInput>
  }

  export type CreatorAccountUpsertWithoutExclusivitiesInput = {
    update: XOR<CreatorAccountUpdateWithoutExclusivitiesInput, CreatorAccountUncheckedUpdateWithoutExclusivitiesInput>
    create: XOR<CreatorAccountCreateWithoutExclusivitiesInput, CreatorAccountUncheckedCreateWithoutExclusivitiesInput>
    where?: CreatorAccountWhereInput
  }

  export type CreatorAccountUpdateToOneWithWhereWithoutExclusivitiesInput = {
    where?: CreatorAccountWhereInput
    data: XOR<CreatorAccountUpdateWithoutExclusivitiesInput, CreatorAccountUncheckedUpdateWithoutExclusivitiesInput>
  }

  export type CreatorAccountUpdateWithoutExclusivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    bannerUrl?: StringFieldUpdateOperationsInput | string
    interests?: CreatorAccountUpdateinterestsInput | number[]
    cards?: JsonNullValueInput | InputJsonValue
    obolId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCreatorAccountNestedInput
    posts?: PostUpdateManyWithoutCreatorAccountNestedInput
  }

  export type CreatorAccountUncheckedUpdateWithoutExclusivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    bannerUrl?: StringFieldUpdateOperationsInput | string
    interests?: CreatorAccountUpdateinterestsInput | number[]
    cards?: JsonNullValueInput | InputJsonValue
    obolId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    posts?: PostUncheckedUpdateManyWithoutCreatorAccountNestedInput
  }

  export type PostCreateManyCreatorAccountInput = {
    id?: string
    videoUrl?: string
    title?: string
    description?: string
    tier?: string
    date?: Date | string
  }

  export type ExclusivityCreateManyCreatorAccountInput = {
    id?: string
    title?: string
    description?: string
    imageUrl?: string
    price?: string
    totalSupply?: string
    tokenId?: string
  }

  export type PostUpdateWithoutCreatorAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateWithoutCreatorAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyWithoutCreatorAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExclusivityUpdateWithoutCreatorAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    totalSupply?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
  }

  export type ExclusivityUncheckedUpdateWithoutCreatorAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    totalSupply?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
  }

  export type ExclusivityUncheckedUpdateManyWithoutCreatorAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    totalSupply?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CreatorAccountCountOutputTypeDefaultArgs instead
     */
    export type CreatorAccountCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CreatorAccountCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CreatorAccountDefaultArgs instead
     */
    export type CreatorAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CreatorAccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserAccountDefaultArgs instead
     */
    export type UserAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserAccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PostDefaultArgs instead
     */
    export type PostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PostDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExclusivityDefaultArgs instead
     */
    export type ExclusivityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExclusivityDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}