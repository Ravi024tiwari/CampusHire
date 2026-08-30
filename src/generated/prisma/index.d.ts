
/**
 * Client
**/

import * as runtime from './runtime/client.js';
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
 * Model StudentProfile
 * 
 */
export type StudentProfile = $Result.DefaultSelection<Prisma.$StudentProfilePayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model RecruiterProfile
 * 
 */
export type RecruiterProfile = $Result.DefaultSelection<Prisma.$RecruiterProfilePayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model Application
 * 
 */
export type Application = $Result.DefaultSelection<Prisma.$ApplicationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  STUDENT: 'STUDENT',
  RECRUITER: 'RECRUITER',
  TPO_ADMIN: 'TPO_ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const JobType: {
  FULL_TIME: 'FULL_TIME',
  INTERNSHIP: 'INTERNSHIP',
  INTERN_PLUS_FTE: 'INTERN_PLUS_FTE'
};

export type JobType = (typeof JobType)[keyof typeof JobType]


export const JobStatus: {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]


export const ApplicationStatus: {
  APPLIED: 'APPLIED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  SHORTLISTED: 'SHORTLISTED',
  INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED',
  OFFERED: 'OFFERED',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED'
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type JobType = $Enums.JobType

export const JobType: typeof $Enums.JobType

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.studentProfile`: Exposes CRUD operations for the **StudentProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentProfiles
    * const studentProfiles = await prisma.studentProfile.findMany()
    * ```
    */
  get studentProfile(): Prisma.StudentProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recruiterProfile`: Exposes CRUD operations for the **RecruiterProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecruiterProfiles
    * const recruiterProfiles = await prisma.recruiterProfile.findMany()
    * ```
    */
  get recruiterProfile(): Prisma.RecruiterProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.application`: Exposes CRUD operations for the **Application** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Applications
    * const applications = await prisma.application.findMany()
    * ```
    */
  get application(): Prisma.ApplicationDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
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
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    StudentProfile: 'StudentProfile',
    Company: 'Company',
    RecruiterProfile: 'RecruiterProfile',
    Job: 'Job',
    Application: 'Application'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "studentProfile" | "company" | "recruiterProfile" | "job" | "application"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      StudentProfile: {
        payload: Prisma.$StudentProfilePayload<ExtArgs>
        fields: Prisma.StudentProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          findFirst: {
            args: Prisma.StudentProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          findMany: {
            args: Prisma.StudentProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>[]
          }
          create: {
            args: Prisma.StudentProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          createMany: {
            args: Prisma.StudentProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>[]
          }
          delete: {
            args: Prisma.StudentProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          update: {
            args: Prisma.StudentProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          deleteMany: {
            args: Prisma.StudentProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>[]
          }
          upsert: {
            args: Prisma.StudentProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentProfilePayload>
          }
          aggregate: {
            args: Prisma.StudentProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentProfile>
          }
          groupBy: {
            args: Prisma.StudentProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentProfileCountArgs<ExtArgs>
            result: $Utils.Optional<StudentProfileCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      RecruiterProfile: {
        payload: Prisma.$RecruiterProfilePayload<ExtArgs>
        fields: Prisma.RecruiterProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecruiterProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecruiterProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          findFirst: {
            args: Prisma.RecruiterProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecruiterProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          findMany: {
            args: Prisma.RecruiterProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>[]
          }
          create: {
            args: Prisma.RecruiterProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          createMany: {
            args: Prisma.RecruiterProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecruiterProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>[]
          }
          delete: {
            args: Prisma.RecruiterProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          update: {
            args: Prisma.RecruiterProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          deleteMany: {
            args: Prisma.RecruiterProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecruiterProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecruiterProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>[]
          }
          upsert: {
            args: Prisma.RecruiterProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterProfilePayload>
          }
          aggregate: {
            args: Prisma.RecruiterProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecruiterProfile>
          }
          groupBy: {
            args: Prisma.RecruiterProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecruiterProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecruiterProfileCountArgs<ExtArgs>
            result: $Utils.Optional<RecruiterProfileCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      Application: {
        payload: Prisma.$ApplicationPayload<ExtArgs>
        fields: Prisma.ApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findFirst: {
            args: Prisma.ApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findMany: {
            args: Prisma.ApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          create: {
            args: Prisma.ApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          createMany: {
            args: Prisma.ApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          delete: {
            args: Prisma.ApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          update: {
            args: Prisma.ApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          deleteMany: {
            args: Prisma.ApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          upsert: {
            args: Prisma.ApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          aggregate: {
            args: Prisma.ApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplication>
          }
          groupBy: {
            args: Prisma.ApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    studentProfile?: StudentProfileOmit
    company?: CompanyOmit
    recruiterProfile?: RecruiterProfileOmit
    job?: JobOmit
    application?: ApplicationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
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
   * Count Type StudentProfileCountOutputType
   */

  export type StudentProfileCountOutputType = {
    applications: number
  }

  export type StudentProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | StudentProfileCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * StudentProfileCountOutputType without action
   */
  export type StudentProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfileCountOutputType
     */
    select?: StudentProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentProfileCountOutputType without action
   */
  export type StudentProfileCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    recruiters: number
    jobs: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiters?: boolean | CompanyCountOutputTypeCountRecruitersArgs
    jobs?: boolean | CompanyCountOutputTypeCountJobsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountRecruitersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecruiterProfileWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    applications: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     */
    select?: JobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
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
    passwordHash: string | null
    name: string | null
    role: $Enums.Role | null
    avatarUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    role: $Enums.Role | null
    avatarUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    role: number
    avatarUrl: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    role?: true
    avatarUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    role?: true
    avatarUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    role?: true
    avatarUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
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
    passwordHash: string | null
    name: string
    role: $Enums.Role
    avatarUrl: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
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
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | User$studentArgs<ExtArgs>
    recruiter?: boolean | User$recruiterArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "role" | "avatarUrl" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | User$studentArgs<ExtArgs>
    recruiter?: boolean | User$recruiterArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      student: Prisma.$StudentProfilePayload<ExtArgs> | null
      recruiter: Prisma.$RecruiterProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string | null
      name: string
      role: $Enums.Role
      avatarUrl: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends User$studentArgs<ExtArgs> = {}>(args?: Subset<T, User$studentArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    recruiter<T extends User$recruiterArgs<ExtArgs> = {}>(args?: Subset<T, User$recruiterArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.student
   */
  export type User$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    where?: StudentProfileWhereInput
  }

  /**
   * User.recruiter
   */
  export type User$recruiterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    where?: RecruiterProfileWhereInput
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model StudentProfile
   */

  export type AggregateStudentProfile = {
    _count: StudentProfileCountAggregateOutputType | null
    _avg: StudentProfileAvgAggregateOutputType | null
    _sum: StudentProfileSumAggregateOutputType | null
    _min: StudentProfileMinAggregateOutputType | null
    _max: StudentProfileMaxAggregateOutputType | null
  }

  export type StudentProfileAvgAggregateOutputType = {
    batchYear: number | null
    cgpa: number | null
    tenthMarks: number | null
    twelfthMarks: number | null
  }

  export type StudentProfileSumAggregateOutputType = {
    batchYear: number | null
    cgpa: number | null
    tenthMarks: number | null
    twelfthMarks: number | null
  }

  export type StudentProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    enrollmentNumber: string | null
    branch: string | null
    batchYear: number | null
    cgpa: number | null
    tenthMarks: number | null
    twelfthMarks: number | null
    resumeUrl: string | null
    linkedinUrl: string | null
    githubUrl: string | null
    portfolioUrl: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    enrollmentNumber: string | null
    branch: string | null
    batchYear: number | null
    cgpa: number | null
    tenthMarks: number | null
    twelfthMarks: number | null
    resumeUrl: string | null
    linkedinUrl: string | null
    githubUrl: string | null
    portfolioUrl: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentProfileCountAggregateOutputType = {
    id: number
    userId: number
    enrollmentNumber: number
    branch: number
    batchYear: number
    cgpa: number
    tenthMarks: number
    twelfthMarks: number
    resumeUrl: number
    skills: number
    linkedinUrl: number
    githubUrl: number
    portfolioUrl: number
    isVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentProfileAvgAggregateInputType = {
    batchYear?: true
    cgpa?: true
    tenthMarks?: true
    twelfthMarks?: true
  }

  export type StudentProfileSumAggregateInputType = {
    batchYear?: true
    cgpa?: true
    tenthMarks?: true
    twelfthMarks?: true
  }

  export type StudentProfileMinAggregateInputType = {
    id?: true
    userId?: true
    enrollmentNumber?: true
    branch?: true
    batchYear?: true
    cgpa?: true
    tenthMarks?: true
    twelfthMarks?: true
    resumeUrl?: true
    linkedinUrl?: true
    githubUrl?: true
    portfolioUrl?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    enrollmentNumber?: true
    branch?: true
    batchYear?: true
    cgpa?: true
    tenthMarks?: true
    twelfthMarks?: true
    resumeUrl?: true
    linkedinUrl?: true
    githubUrl?: true
    portfolioUrl?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentProfileCountAggregateInputType = {
    id?: true
    userId?: true
    enrollmentNumber?: true
    branch?: true
    batchYear?: true
    cgpa?: true
    tenthMarks?: true
    twelfthMarks?: true
    resumeUrl?: true
    skills?: true
    linkedinUrl?: true
    githubUrl?: true
    portfolioUrl?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentProfile to aggregate.
     */
    where?: StudentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProfiles to fetch.
     */
    orderBy?: StudentProfileOrderByWithRelationInput | StudentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentProfiles
    **/
    _count?: true | StudentProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentProfileMaxAggregateInputType
  }

  export type GetStudentProfileAggregateType<T extends StudentProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentProfile[P]>
      : GetScalarType<T[P], AggregateStudentProfile[P]>
  }




  export type StudentProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentProfileWhereInput
    orderBy?: StudentProfileOrderByWithAggregationInput | StudentProfileOrderByWithAggregationInput[]
    by: StudentProfileScalarFieldEnum[] | StudentProfileScalarFieldEnum
    having?: StudentProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentProfileCountAggregateInputType | true
    _avg?: StudentProfileAvgAggregateInputType
    _sum?: StudentProfileSumAggregateInputType
    _min?: StudentProfileMinAggregateInputType
    _max?: StudentProfileMaxAggregateInputType
  }

  export type StudentProfileGroupByOutputType = {
    id: string
    userId: string
    enrollmentNumber: string
    branch: string
    batchYear: number
    cgpa: number
    tenthMarks: number | null
    twelfthMarks: number | null
    resumeUrl: string | null
    skills: string[]
    linkedinUrl: string | null
    githubUrl: string | null
    portfolioUrl: string | null
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: StudentProfileCountAggregateOutputType | null
    _avg: StudentProfileAvgAggregateOutputType | null
    _sum: StudentProfileSumAggregateOutputType | null
    _min: StudentProfileMinAggregateOutputType | null
    _max: StudentProfileMaxAggregateOutputType | null
  }

  type GetStudentProfileGroupByPayload<T extends StudentProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentProfileGroupByOutputType[P]>
            : GetScalarType<T[P], StudentProfileGroupByOutputType[P]>
        }
      >
    >


  export type StudentProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    enrollmentNumber?: boolean
    branch?: boolean
    batchYear?: boolean
    cgpa?: boolean
    tenthMarks?: boolean
    twelfthMarks?: boolean
    resumeUrl?: boolean
    skills?: boolean
    linkedinUrl?: boolean
    githubUrl?: boolean
    portfolioUrl?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    applications?: boolean | StudentProfile$applicationsArgs<ExtArgs>
    _count?: boolean | StudentProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProfile"]>

  export type StudentProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    enrollmentNumber?: boolean
    branch?: boolean
    batchYear?: boolean
    cgpa?: boolean
    tenthMarks?: boolean
    twelfthMarks?: boolean
    resumeUrl?: boolean
    skills?: boolean
    linkedinUrl?: boolean
    githubUrl?: boolean
    portfolioUrl?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProfile"]>

  export type StudentProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    enrollmentNumber?: boolean
    branch?: boolean
    batchYear?: boolean
    cgpa?: boolean
    tenthMarks?: boolean
    twelfthMarks?: boolean
    resumeUrl?: boolean
    skills?: boolean
    linkedinUrl?: boolean
    githubUrl?: boolean
    portfolioUrl?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProfile"]>

  export type StudentProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    enrollmentNumber?: boolean
    branch?: boolean
    batchYear?: boolean
    cgpa?: boolean
    tenthMarks?: boolean
    twelfthMarks?: boolean
    resumeUrl?: boolean
    skills?: boolean
    linkedinUrl?: boolean
    githubUrl?: boolean
    portfolioUrl?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "enrollmentNumber" | "branch" | "batchYear" | "cgpa" | "tenthMarks" | "twelfthMarks" | "resumeUrl" | "skills" | "linkedinUrl" | "githubUrl" | "portfolioUrl" | "isVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["studentProfile"]>
  export type StudentProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    applications?: boolean | StudentProfile$applicationsArgs<ExtArgs>
    _count?: boolean | StudentProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StudentProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StudentProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      enrollmentNumber: string
      branch: string
      batchYear: number
      cgpa: number
      tenthMarks: number | null
      twelfthMarks: number | null
      resumeUrl: string | null
      skills: string[]
      linkedinUrl: string | null
      githubUrl: string | null
      portfolioUrl: string | null
      isVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["studentProfile"]>
    composites: {}
  }

  type StudentProfileGetPayload<S extends boolean | null | undefined | StudentProfileDefaultArgs> = $Result.GetResult<Prisma.$StudentProfilePayload, S>

  type StudentProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentProfileCountAggregateInputType | true
    }

  export interface StudentProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentProfile'], meta: { name: 'StudentProfile' } }
    /**
     * Find zero or one StudentProfile that matches the filter.
     * @param {StudentProfileFindUniqueArgs} args - Arguments to find a StudentProfile
     * @example
     * // Get one StudentProfile
     * const studentProfile = await prisma.studentProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentProfileFindUniqueArgs>(args: SelectSubset<T, StudentProfileFindUniqueArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentProfileFindUniqueOrThrowArgs} args - Arguments to find a StudentProfile
     * @example
     * // Get one StudentProfile
     * const studentProfile = await prisma.studentProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileFindFirstArgs} args - Arguments to find a StudentProfile
     * @example
     * // Get one StudentProfile
     * const studentProfile = await prisma.studentProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentProfileFindFirstArgs>(args?: SelectSubset<T, StudentProfileFindFirstArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileFindFirstOrThrowArgs} args - Arguments to find a StudentProfile
     * @example
     * // Get one StudentProfile
     * const studentProfile = await prisma.studentProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentProfiles
     * const studentProfiles = await prisma.studentProfile.findMany()
     * 
     * // Get first 10 StudentProfiles
     * const studentProfiles = await prisma.studentProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentProfileWithIdOnly = await prisma.studentProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentProfileFindManyArgs>(args?: SelectSubset<T, StudentProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentProfile.
     * @param {StudentProfileCreateArgs} args - Arguments to create a StudentProfile.
     * @example
     * // Create one StudentProfile
     * const StudentProfile = await prisma.studentProfile.create({
     *   data: {
     *     // ... data to create a StudentProfile
     *   }
     * })
     * 
     */
    create<T extends StudentProfileCreateArgs>(args: SelectSubset<T, StudentProfileCreateArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentProfiles.
     * @param {StudentProfileCreateManyArgs} args - Arguments to create many StudentProfiles.
     * @example
     * // Create many StudentProfiles
     * const studentProfile = await prisma.studentProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentProfileCreateManyArgs>(args?: SelectSubset<T, StudentProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentProfiles and returns the data saved in the database.
     * @param {StudentProfileCreateManyAndReturnArgs} args - Arguments to create many StudentProfiles.
     * @example
     * // Create many StudentProfiles
     * const studentProfile = await prisma.studentProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentProfiles and only return the `id`
     * const studentProfileWithIdOnly = await prisma.studentProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentProfile.
     * @param {StudentProfileDeleteArgs} args - Arguments to delete one StudentProfile.
     * @example
     * // Delete one StudentProfile
     * const StudentProfile = await prisma.studentProfile.delete({
     *   where: {
     *     // ... filter to delete one StudentProfile
     *   }
     * })
     * 
     */
    delete<T extends StudentProfileDeleteArgs>(args: SelectSubset<T, StudentProfileDeleteArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentProfile.
     * @param {StudentProfileUpdateArgs} args - Arguments to update one StudentProfile.
     * @example
     * // Update one StudentProfile
     * const studentProfile = await prisma.studentProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentProfileUpdateArgs>(args: SelectSubset<T, StudentProfileUpdateArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentProfiles.
     * @param {StudentProfileDeleteManyArgs} args - Arguments to filter StudentProfiles to delete.
     * @example
     * // Delete a few StudentProfiles
     * const { count } = await prisma.studentProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentProfileDeleteManyArgs>(args?: SelectSubset<T, StudentProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentProfiles
     * const studentProfile = await prisma.studentProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentProfileUpdateManyArgs>(args: SelectSubset<T, StudentProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentProfiles and returns the data updated in the database.
     * @param {StudentProfileUpdateManyAndReturnArgs} args - Arguments to update many StudentProfiles.
     * @example
     * // Update many StudentProfiles
     * const studentProfile = await prisma.studentProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentProfiles and only return the `id`
     * const studentProfileWithIdOnly = await prisma.studentProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentProfile.
     * @param {StudentProfileUpsertArgs} args - Arguments to update or create a StudentProfile.
     * @example
     * // Update or create a StudentProfile
     * const studentProfile = await prisma.studentProfile.upsert({
     *   create: {
     *     // ... data to create a StudentProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentProfile we want to update
     *   }
     * })
     */
    upsert<T extends StudentProfileUpsertArgs>(args: SelectSubset<T, StudentProfileUpsertArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileCountArgs} args - Arguments to filter StudentProfiles to count.
     * @example
     * // Count the number of StudentProfiles
     * const count = await prisma.studentProfile.count({
     *   where: {
     *     // ... the filter for the StudentProfiles we want to count
     *   }
     * })
    **/
    count<T extends StudentProfileCountArgs>(
      args?: Subset<T, StudentProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentProfileAggregateArgs>(args: Subset<T, StudentProfileAggregateArgs>): Prisma.PrismaPromise<GetStudentProfileAggregateType<T>>

    /**
     * Group by StudentProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentProfileGroupByArgs} args - Group by arguments.
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
      T extends StudentProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentProfileGroupByArgs['orderBy'] }
        : { orderBy?: StudentProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentProfile model
   */
  readonly fields: StudentProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends StudentProfile$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfile$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentProfile model
   */
  interface StudentProfileFieldRefs {
    readonly id: FieldRef<"StudentProfile", 'String'>
    readonly userId: FieldRef<"StudentProfile", 'String'>
    readonly enrollmentNumber: FieldRef<"StudentProfile", 'String'>
    readonly branch: FieldRef<"StudentProfile", 'String'>
    readonly batchYear: FieldRef<"StudentProfile", 'Int'>
    readonly cgpa: FieldRef<"StudentProfile", 'Float'>
    readonly tenthMarks: FieldRef<"StudentProfile", 'Float'>
    readonly twelfthMarks: FieldRef<"StudentProfile", 'Float'>
    readonly resumeUrl: FieldRef<"StudentProfile", 'String'>
    readonly skills: FieldRef<"StudentProfile", 'String[]'>
    readonly linkedinUrl: FieldRef<"StudentProfile", 'String'>
    readonly githubUrl: FieldRef<"StudentProfile", 'String'>
    readonly portfolioUrl: FieldRef<"StudentProfile", 'String'>
    readonly isVerified: FieldRef<"StudentProfile", 'Boolean'>
    readonly createdAt: FieldRef<"StudentProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"StudentProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudentProfile findUnique
   */
  export type StudentProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter, which StudentProfile to fetch.
     */
    where: StudentProfileWhereUniqueInput
  }

  /**
   * StudentProfile findUniqueOrThrow
   */
  export type StudentProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter, which StudentProfile to fetch.
     */
    where: StudentProfileWhereUniqueInput
  }

  /**
   * StudentProfile findFirst
   */
  export type StudentProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter, which StudentProfile to fetch.
     */
    where?: StudentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProfiles to fetch.
     */
    orderBy?: StudentProfileOrderByWithRelationInput | StudentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentProfiles.
     */
    cursor?: StudentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentProfiles.
     */
    distinct?: StudentProfileScalarFieldEnum | StudentProfileScalarFieldEnum[]
  }

  /**
   * StudentProfile findFirstOrThrow
   */
  export type StudentProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter, which StudentProfile to fetch.
     */
    where?: StudentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProfiles to fetch.
     */
    orderBy?: StudentProfileOrderByWithRelationInput | StudentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentProfiles.
     */
    cursor?: StudentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentProfiles.
     */
    distinct?: StudentProfileScalarFieldEnum | StudentProfileScalarFieldEnum[]
  }

  /**
   * StudentProfile findMany
   */
  export type StudentProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter, which StudentProfiles to fetch.
     */
    where?: StudentProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentProfiles to fetch.
     */
    orderBy?: StudentProfileOrderByWithRelationInput | StudentProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentProfiles.
     */
    cursor?: StudentProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentProfiles.
     */
    distinct?: StudentProfileScalarFieldEnum | StudentProfileScalarFieldEnum[]
  }

  /**
   * StudentProfile create
   */
  export type StudentProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentProfile.
     */
    data: XOR<StudentProfileCreateInput, StudentProfileUncheckedCreateInput>
  }

  /**
   * StudentProfile createMany
   */
  export type StudentProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentProfiles.
     */
    data: StudentProfileCreateManyInput | StudentProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentProfile createManyAndReturn
   */
  export type StudentProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * The data used to create many StudentProfiles.
     */
    data: StudentProfileCreateManyInput | StudentProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentProfile update
   */
  export type StudentProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentProfile.
     */
    data: XOR<StudentProfileUpdateInput, StudentProfileUncheckedUpdateInput>
    /**
     * Choose, which StudentProfile to update.
     */
    where: StudentProfileWhereUniqueInput
  }

  /**
   * StudentProfile updateMany
   */
  export type StudentProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentProfiles.
     */
    data: XOR<StudentProfileUpdateManyMutationInput, StudentProfileUncheckedUpdateManyInput>
    /**
     * Filter which StudentProfiles to update
     */
    where?: StudentProfileWhereInput
    /**
     * Limit how many StudentProfiles to update.
     */
    limit?: number
  }

  /**
   * StudentProfile updateManyAndReturn
   */
  export type StudentProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * The data used to update StudentProfiles.
     */
    data: XOR<StudentProfileUpdateManyMutationInput, StudentProfileUncheckedUpdateManyInput>
    /**
     * Filter which StudentProfiles to update
     */
    where?: StudentProfileWhereInput
    /**
     * Limit how many StudentProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentProfile upsert
   */
  export type StudentProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentProfile to update in case it exists.
     */
    where: StudentProfileWhereUniqueInput
    /**
     * In case the StudentProfile found by the `where` argument doesn't exist, create a new StudentProfile with this data.
     */
    create: XOR<StudentProfileCreateInput, StudentProfileUncheckedCreateInput>
    /**
     * In case the StudentProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentProfileUpdateInput, StudentProfileUncheckedUpdateInput>
  }

  /**
   * StudentProfile delete
   */
  export type StudentProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
    /**
     * Filter which StudentProfile to delete.
     */
    where: StudentProfileWhereUniqueInput
  }

  /**
   * StudentProfile deleteMany
   */
  export type StudentProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentProfiles to delete
     */
    where?: StudentProfileWhereInput
    /**
     * Limit how many StudentProfiles to delete.
     */
    limit?: number
  }

  /**
   * StudentProfile.applications
   */
  export type StudentProfile$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * StudentProfile without action
   */
  export type StudentProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentProfile
     */
    select?: StudentProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentProfile
     */
    omit?: StudentProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentProfileInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    name: string | null
    website: string | null
    logoUrl: string | null
    industry: string | null
    location: string | null
    description: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    website: string | null
    logoUrl: string | null
    industry: string | null
    location: string | null
    description: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    website: number
    logoUrl: number
    industry: number
    location: number
    description: number
    isVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    website?: true
    logoUrl?: true
    industry?: true
    location?: true
    description?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    website?: true
    logoUrl?: true
    industry?: true
    location?: true
    description?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    website?: true
    logoUrl?: true
    industry?: true
    location?: true
    description?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    name: string
    website: string | null
    logoUrl: string | null
    industry: string | null
    location: string | null
    description: string | null
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    website?: boolean
    logoUrl?: boolean
    industry?: boolean
    location?: boolean
    description?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recruiters?: boolean | Company$recruitersArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    website?: boolean
    logoUrl?: boolean
    industry?: boolean
    location?: boolean
    description?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    website?: boolean
    logoUrl?: boolean
    industry?: boolean
    location?: boolean
    description?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    website?: boolean
    logoUrl?: boolean
    industry?: boolean
    location?: boolean
    description?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "website" | "logoUrl" | "industry" | "location" | "description" | "isVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiters?: boolean | Company$recruitersArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      recruiters: Prisma.$RecruiterProfilePayload<ExtArgs>[]
      jobs: Prisma.$JobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      website: string | null
      logoUrl: string | null
      industry: string | null
      location: string | null
      description: string | null
      isVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
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
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recruiters<T extends Company$recruitersArgs<ExtArgs> = {}>(args?: Subset<T, Company$recruitersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobs<T extends Company$jobsArgs<ExtArgs> = {}>(args?: Subset<T, Company$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly website: FieldRef<"Company", 'String'>
    readonly logoUrl: FieldRef<"Company", 'String'>
    readonly industry: FieldRef<"Company", 'String'>
    readonly location: FieldRef<"Company", 'String'>
    readonly description: FieldRef<"Company", 'String'>
    readonly isVerified: FieldRef<"Company", 'Boolean'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.recruiters
   */
  export type Company$recruitersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    where?: RecruiterProfileWhereInput
    orderBy?: RecruiterProfileOrderByWithRelationInput | RecruiterProfileOrderByWithRelationInput[]
    cursor?: RecruiterProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecruiterProfileScalarFieldEnum | RecruiterProfileScalarFieldEnum[]
  }

  /**
   * Company.jobs
   */
  export type Company$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model RecruiterProfile
   */

  export type AggregateRecruiterProfile = {
    _count: RecruiterProfileCountAggregateOutputType | null
    _min: RecruiterProfileMinAggregateOutputType | null
    _max: RecruiterProfileMaxAggregateOutputType | null
  }

  export type RecruiterProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    companyId: string | null
    designation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecruiterProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    companyId: string | null
    designation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecruiterProfileCountAggregateOutputType = {
    id: number
    userId: number
    companyId: number
    designation: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RecruiterProfileMinAggregateInputType = {
    id?: true
    userId?: true
    companyId?: true
    designation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecruiterProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    companyId?: true
    designation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecruiterProfileCountAggregateInputType = {
    id?: true
    userId?: true
    companyId?: true
    designation?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RecruiterProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecruiterProfile to aggregate.
     */
    where?: RecruiterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: RecruiterProfileOrderByWithRelationInput | RecruiterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecruiterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecruiterProfiles
    **/
    _count?: true | RecruiterProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecruiterProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecruiterProfileMaxAggregateInputType
  }

  export type GetRecruiterProfileAggregateType<T extends RecruiterProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateRecruiterProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecruiterProfile[P]>
      : GetScalarType<T[P], AggregateRecruiterProfile[P]>
  }




  export type RecruiterProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecruiterProfileWhereInput
    orderBy?: RecruiterProfileOrderByWithAggregationInput | RecruiterProfileOrderByWithAggregationInput[]
    by: RecruiterProfileScalarFieldEnum[] | RecruiterProfileScalarFieldEnum
    having?: RecruiterProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecruiterProfileCountAggregateInputType | true
    _min?: RecruiterProfileMinAggregateInputType
    _max?: RecruiterProfileMaxAggregateInputType
  }

  export type RecruiterProfileGroupByOutputType = {
    id: string
    userId: string
    companyId: string
    designation: string | null
    createdAt: Date
    updatedAt: Date
    _count: RecruiterProfileCountAggregateOutputType | null
    _min: RecruiterProfileMinAggregateOutputType | null
    _max: RecruiterProfileMaxAggregateOutputType | null
  }

  type GetRecruiterProfileGroupByPayload<T extends RecruiterProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecruiterProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecruiterProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecruiterProfileGroupByOutputType[P]>
            : GetScalarType<T[P], RecruiterProfileGroupByOutputType[P]>
        }
      >
    >


  export type RecruiterProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyId?: boolean
    designation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recruiterProfile"]>

  export type RecruiterProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyId?: boolean
    designation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recruiterProfile"]>

  export type RecruiterProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyId?: boolean
    designation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recruiterProfile"]>

  export type RecruiterProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    companyId?: boolean
    designation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RecruiterProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "companyId" | "designation" | "createdAt" | "updatedAt", ExtArgs["result"]["recruiterProfile"]>
  export type RecruiterProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type RecruiterProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type RecruiterProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $RecruiterProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecruiterProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      companyId: string
      designation: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["recruiterProfile"]>
    composites: {}
  }

  type RecruiterProfileGetPayload<S extends boolean | null | undefined | RecruiterProfileDefaultArgs> = $Result.GetResult<Prisma.$RecruiterProfilePayload, S>

  type RecruiterProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecruiterProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecruiterProfileCountAggregateInputType | true
    }

  export interface RecruiterProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecruiterProfile'], meta: { name: 'RecruiterProfile' } }
    /**
     * Find zero or one RecruiterProfile that matches the filter.
     * @param {RecruiterProfileFindUniqueArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecruiterProfileFindUniqueArgs>(args: SelectSubset<T, RecruiterProfileFindUniqueArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecruiterProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecruiterProfileFindUniqueOrThrowArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecruiterProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, RecruiterProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecruiterProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileFindFirstArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecruiterProfileFindFirstArgs>(args?: SelectSubset<T, RecruiterProfileFindFirstArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecruiterProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileFindFirstOrThrowArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecruiterProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, RecruiterProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecruiterProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecruiterProfiles
     * const recruiterProfiles = await prisma.recruiterProfile.findMany()
     * 
     * // Get first 10 RecruiterProfiles
     * const recruiterProfiles = await prisma.recruiterProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recruiterProfileWithIdOnly = await prisma.recruiterProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecruiterProfileFindManyArgs>(args?: SelectSubset<T, RecruiterProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecruiterProfile.
     * @param {RecruiterProfileCreateArgs} args - Arguments to create a RecruiterProfile.
     * @example
     * // Create one RecruiterProfile
     * const RecruiterProfile = await prisma.recruiterProfile.create({
     *   data: {
     *     // ... data to create a RecruiterProfile
     *   }
     * })
     * 
     */
    create<T extends RecruiterProfileCreateArgs>(args: SelectSubset<T, RecruiterProfileCreateArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecruiterProfiles.
     * @param {RecruiterProfileCreateManyArgs} args - Arguments to create many RecruiterProfiles.
     * @example
     * // Create many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecruiterProfileCreateManyArgs>(args?: SelectSubset<T, RecruiterProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecruiterProfiles and returns the data saved in the database.
     * @param {RecruiterProfileCreateManyAndReturnArgs} args - Arguments to create many RecruiterProfiles.
     * @example
     * // Create many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecruiterProfiles and only return the `id`
     * const recruiterProfileWithIdOnly = await prisma.recruiterProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecruiterProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, RecruiterProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecruiterProfile.
     * @param {RecruiterProfileDeleteArgs} args - Arguments to delete one RecruiterProfile.
     * @example
     * // Delete one RecruiterProfile
     * const RecruiterProfile = await prisma.recruiterProfile.delete({
     *   where: {
     *     // ... filter to delete one RecruiterProfile
     *   }
     * })
     * 
     */
    delete<T extends RecruiterProfileDeleteArgs>(args: SelectSubset<T, RecruiterProfileDeleteArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecruiterProfile.
     * @param {RecruiterProfileUpdateArgs} args - Arguments to update one RecruiterProfile.
     * @example
     * // Update one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecruiterProfileUpdateArgs>(args: SelectSubset<T, RecruiterProfileUpdateArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecruiterProfiles.
     * @param {RecruiterProfileDeleteManyArgs} args - Arguments to filter RecruiterProfiles to delete.
     * @example
     * // Delete a few RecruiterProfiles
     * const { count } = await prisma.recruiterProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecruiterProfileDeleteManyArgs>(args?: SelectSubset<T, RecruiterProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecruiterProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecruiterProfileUpdateManyArgs>(args: SelectSubset<T, RecruiterProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecruiterProfiles and returns the data updated in the database.
     * @param {RecruiterProfileUpdateManyAndReturnArgs} args - Arguments to update many RecruiterProfiles.
     * @example
     * // Update many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecruiterProfiles and only return the `id`
     * const recruiterProfileWithIdOnly = await prisma.recruiterProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecruiterProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, RecruiterProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecruiterProfile.
     * @param {RecruiterProfileUpsertArgs} args - Arguments to update or create a RecruiterProfile.
     * @example
     * // Update or create a RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.upsert({
     *   create: {
     *     // ... data to create a RecruiterProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecruiterProfile we want to update
     *   }
     * })
     */
    upsert<T extends RecruiterProfileUpsertArgs>(args: SelectSubset<T, RecruiterProfileUpsertArgs<ExtArgs>>): Prisma__RecruiterProfileClient<$Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecruiterProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileCountArgs} args - Arguments to filter RecruiterProfiles to count.
     * @example
     * // Count the number of RecruiterProfiles
     * const count = await prisma.recruiterProfile.count({
     *   where: {
     *     // ... the filter for the RecruiterProfiles we want to count
     *   }
     * })
    **/
    count<T extends RecruiterProfileCountArgs>(
      args?: Subset<T, RecruiterProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecruiterProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecruiterProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RecruiterProfileAggregateArgs>(args: Subset<T, RecruiterProfileAggregateArgs>): Prisma.PrismaPromise<GetRecruiterProfileAggregateType<T>>

    /**
     * Group by RecruiterProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileGroupByArgs} args - Group by arguments.
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
      T extends RecruiterProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecruiterProfileGroupByArgs['orderBy'] }
        : { orderBy?: RecruiterProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RecruiterProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecruiterProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecruiterProfile model
   */
  readonly fields: RecruiterProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecruiterProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecruiterProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecruiterProfile model
   */
  interface RecruiterProfileFieldRefs {
    readonly id: FieldRef<"RecruiterProfile", 'String'>
    readonly userId: FieldRef<"RecruiterProfile", 'String'>
    readonly companyId: FieldRef<"RecruiterProfile", 'String'>
    readonly designation: FieldRef<"RecruiterProfile", 'String'>
    readonly createdAt: FieldRef<"RecruiterProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"RecruiterProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecruiterProfile findUnique
   */
  export type RecruiterProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where: RecruiterProfileWhereUniqueInput
  }

  /**
   * RecruiterProfile findUniqueOrThrow
   */
  export type RecruiterProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where: RecruiterProfileWhereUniqueInput
  }

  /**
   * RecruiterProfile findFirst
   */
  export type RecruiterProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where?: RecruiterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: RecruiterProfileOrderByWithRelationInput | RecruiterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecruiterProfiles.
     */
    cursor?: RecruiterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecruiterProfiles.
     */
    distinct?: RecruiterProfileScalarFieldEnum | RecruiterProfileScalarFieldEnum[]
  }

  /**
   * RecruiterProfile findFirstOrThrow
   */
  export type RecruiterProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where?: RecruiterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: RecruiterProfileOrderByWithRelationInput | RecruiterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecruiterProfiles.
     */
    cursor?: RecruiterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecruiterProfiles.
     */
    distinct?: RecruiterProfileScalarFieldEnum | RecruiterProfileScalarFieldEnum[]
  }

  /**
   * RecruiterProfile findMany
   */
  export type RecruiterProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter, which RecruiterProfiles to fetch.
     */
    where?: RecruiterProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: RecruiterProfileOrderByWithRelationInput | RecruiterProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecruiterProfiles.
     */
    cursor?: RecruiterProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecruiterProfiles.
     */
    distinct?: RecruiterProfileScalarFieldEnum | RecruiterProfileScalarFieldEnum[]
  }

  /**
   * RecruiterProfile create
   */
  export type RecruiterProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a RecruiterProfile.
     */
    data: XOR<RecruiterProfileCreateInput, RecruiterProfileUncheckedCreateInput>
  }

  /**
   * RecruiterProfile createMany
   */
  export type RecruiterProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecruiterProfiles.
     */
    data: RecruiterProfileCreateManyInput | RecruiterProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecruiterProfile createManyAndReturn
   */
  export type RecruiterProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * The data used to create many RecruiterProfiles.
     */
    data: RecruiterProfileCreateManyInput | RecruiterProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecruiterProfile update
   */
  export type RecruiterProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a RecruiterProfile.
     */
    data: XOR<RecruiterProfileUpdateInput, RecruiterProfileUncheckedUpdateInput>
    /**
     * Choose, which RecruiterProfile to update.
     */
    where: RecruiterProfileWhereUniqueInput
  }

  /**
   * RecruiterProfile updateMany
   */
  export type RecruiterProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecruiterProfiles.
     */
    data: XOR<RecruiterProfileUpdateManyMutationInput, RecruiterProfileUncheckedUpdateManyInput>
    /**
     * Filter which RecruiterProfiles to update
     */
    where?: RecruiterProfileWhereInput
    /**
     * Limit how many RecruiterProfiles to update.
     */
    limit?: number
  }

  /**
   * RecruiterProfile updateManyAndReturn
   */
  export type RecruiterProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * The data used to update RecruiterProfiles.
     */
    data: XOR<RecruiterProfileUpdateManyMutationInput, RecruiterProfileUncheckedUpdateManyInput>
    /**
     * Filter which RecruiterProfiles to update
     */
    where?: RecruiterProfileWhereInput
    /**
     * Limit how many RecruiterProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecruiterProfile upsert
   */
  export type RecruiterProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the RecruiterProfile to update in case it exists.
     */
    where: RecruiterProfileWhereUniqueInput
    /**
     * In case the RecruiterProfile found by the `where` argument doesn't exist, create a new RecruiterProfile with this data.
     */
    create: XOR<RecruiterProfileCreateInput, RecruiterProfileUncheckedCreateInput>
    /**
     * In case the RecruiterProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecruiterProfileUpdateInput, RecruiterProfileUncheckedUpdateInput>
  }

  /**
   * RecruiterProfile delete
   */
  export type RecruiterProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
    /**
     * Filter which RecruiterProfile to delete.
     */
    where: RecruiterProfileWhereUniqueInput
  }

  /**
   * RecruiterProfile deleteMany
   */
  export type RecruiterProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecruiterProfiles to delete
     */
    where?: RecruiterProfileWhereInput
    /**
     * Limit how many RecruiterProfiles to delete.
     */
    limit?: number
  }

  /**
   * RecruiterProfile without action
   */
  export type RecruiterProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: RecruiterProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: RecruiterProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterProfileInclude<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    minCgpa: number | null
    eligibleBatches: number | null
  }

  export type JobSumAggregateOutputType = {
    minCgpa: number | null
    eligibleBatches: number[]
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    title: string | null
    description: string | null
    type: $Enums.JobType | null
    status: $Enums.JobStatus | null
    location: string | null
    salaryPackage: string | null
    minCgpa: number | null
    deadline: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    title: string | null
    description: string | null
    type: $Enums.JobType | null
    status: $Enums.JobStatus | null
    location: string | null
    salaryPackage: string | null
    minCgpa: number | null
    deadline: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    companyId: number
    title: number
    description: number
    type: number
    status: number
    location: number
    salaryPackage: number
    minCgpa: number
    allowedBranches: number
    eligibleBatches: number
    deadline: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    minCgpa?: true
    eligibleBatches?: true
  }

  export type JobSumAggregateInputType = {
    minCgpa?: true
    eligibleBatches?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    description?: true
    type?: true
    status?: true
    location?: true
    salaryPackage?: true
    minCgpa?: true
    deadline?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    description?: true
    type?: true
    status?: true
    location?: true
    salaryPackage?: true
    minCgpa?: true
    deadline?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    description?: true
    type?: true
    status?: true
    location?: true
    salaryPackage?: true
    minCgpa?: true
    allowedBranches?: true
    eligibleBatches?: true
    deadline?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    companyId: string
    title: string
    description: string
    type: $Enums.JobType
    status: $Enums.JobStatus
    location: string
    salaryPackage: string
    minCgpa: number
    allowedBranches: string[]
    eligibleBatches: number[]
    deadline: Date
    createdAt: Date
    updatedAt: Date
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    status?: boolean
    location?: boolean
    salaryPackage?: boolean
    minCgpa?: boolean
    allowedBranches?: boolean
    eligibleBatches?: boolean
    deadline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    applications?: boolean | Job$applicationsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    status?: boolean
    location?: boolean
    salaryPackage?: boolean
    minCgpa?: boolean
    allowedBranches?: boolean
    eligibleBatches?: boolean
    deadline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    status?: boolean
    location?: boolean
    salaryPackage?: boolean
    minCgpa?: boolean
    allowedBranches?: boolean
    eligibleBatches?: boolean
    deadline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    companyId?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    status?: boolean
    location?: boolean
    salaryPackage?: boolean
    minCgpa?: boolean
    allowedBranches?: boolean
    eligibleBatches?: boolean
    deadline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "title" | "description" | "type" | "status" | "location" | "salaryPackage" | "minCgpa" | "allowedBranches" | "eligibleBatches" | "deadline" | "createdAt" | "updatedAt", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    applications?: boolean | Job$applicationsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type JobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      title: string
      description: string
      type: $Enums.JobType
      status: $Enums.JobStatus
      location: string
      salaryPackage: string
      minCgpa: number
      allowedBranches: string[]
      eligibleBatches: number[]
      deadline: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jobs and returns the data saved in the database.
     * @param {JobCreateManyAndReturnArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs and returns the data updated in the database.
     * @param {JobUpdateManyAndReturnArgs} args - Arguments to update many Jobs.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobUpdateManyAndReturnArgs>(args: SelectSubset<T, JobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
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
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends Job$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Job$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Job model
   */
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly companyId: FieldRef<"Job", 'String'>
    readonly title: FieldRef<"Job", 'String'>
    readonly description: FieldRef<"Job", 'String'>
    readonly type: FieldRef<"Job", 'JobType'>
    readonly status: FieldRef<"Job", 'JobStatus'>
    readonly location: FieldRef<"Job", 'String'>
    readonly salaryPackage: FieldRef<"Job", 'String'>
    readonly minCgpa: FieldRef<"Job", 'Float'>
    readonly allowedBranches: FieldRef<"Job", 'String[]'>
    readonly eligibleBatches: FieldRef<"Job", 'Int[]'>
    readonly deadline: FieldRef<"Job", 'DateTime'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job createManyAndReturn
   */
  export type JobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job updateManyAndReturn
   */
  export type JobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to delete.
     */
    limit?: number
  }

  /**
   * Job.applications
   */
  export type Job$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model Application
   */

  export type AggregateApplication = {
    _count: ApplicationCountAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  export type ApplicationMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    studentId: string | null
    status: $Enums.ApplicationStatus | null
    resumeUrl: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApplicationMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    studentId: string | null
    status: $Enums.ApplicationStatus | null
    resumeUrl: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApplicationCountAggregateOutputType = {
    id: number
    jobId: number
    studentId: number
    status: number
    resumeUrl: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApplicationMinAggregateInputType = {
    id?: true
    jobId?: true
    studentId?: true
    status?: true
    resumeUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApplicationMaxAggregateInputType = {
    id?: true
    jobId?: true
    studentId?: true
    status?: true
    resumeUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApplicationCountAggregateInputType = {
    id?: true
    jobId?: true
    studentId?: true
    status?: true
    resumeUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Application to aggregate.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Applications
    **/
    _count?: true | ApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationMaxAggregateInputType
  }

  export type GetApplicationAggregateType<T extends ApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplication[P]>
      : GetScalarType<T[P], AggregateApplication[P]>
  }




  export type ApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithAggregationInput | ApplicationOrderByWithAggregationInput[]
    by: ApplicationScalarFieldEnum[] | ApplicationScalarFieldEnum
    having?: ApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationCountAggregateInputType | true
    _min?: ApplicationMinAggregateInputType
    _max?: ApplicationMaxAggregateInputType
  }

  export type ApplicationGroupByOutputType = {
    id: string
    jobId: string
    studentId: string
    status: $Enums.ApplicationStatus
    resumeUrl: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: ApplicationCountAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  type GetApplicationGroupByPayload<T extends ApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    studentId?: boolean
    status?: boolean
    resumeUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    studentId?: boolean
    status?: boolean
    resumeUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    studentId?: boolean
    status?: boolean
    resumeUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectScalar = {
    id?: boolean
    jobId?: boolean
    studentId?: boolean
    status?: boolean
    resumeUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jobId" | "studentId" | "status" | "resumeUrl" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["application"]>
  export type ApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type ApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type ApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }

  export type $ApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Application"
    objects: {
      job: Prisma.$JobPayload<ExtArgs>
      student: Prisma.$StudentProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      studentId: string
      status: $Enums.ApplicationStatus
      resumeUrl: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["application"]>
    composites: {}
  }

  type ApplicationGetPayload<S extends boolean | null | undefined | ApplicationDefaultArgs> = $Result.GetResult<Prisma.$ApplicationPayload, S>

  type ApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicationCountAggregateInputType | true
    }

  export interface ApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Application'], meta: { name: 'Application' } }
    /**
     * Find zero or one Application that matches the filter.
     * @param {ApplicationFindUniqueArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationFindUniqueArgs>(args: SelectSubset<T, ApplicationFindUniqueArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Application that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicationFindUniqueOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Application that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationFindFirstArgs>(args?: SelectSubset<T, ApplicationFindFirstArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Application that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Applications
     * const applications = await prisma.application.findMany()
     * 
     * // Get first 10 Applications
     * const applications = await prisma.application.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicationWithIdOnly = await prisma.application.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicationFindManyArgs>(args?: SelectSubset<T, ApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Application.
     * @param {ApplicationCreateArgs} args - Arguments to create a Application.
     * @example
     * // Create one Application
     * const Application = await prisma.application.create({
     *   data: {
     *     // ... data to create a Application
     *   }
     * })
     * 
     */
    create<T extends ApplicationCreateArgs>(args: SelectSubset<T, ApplicationCreateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Applications.
     * @param {ApplicationCreateManyArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicationCreateManyArgs>(args?: SelectSubset<T, ApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Applications and returns the data saved in the database.
     * @param {ApplicationCreateManyAndReturnArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, ApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Application.
     * @param {ApplicationDeleteArgs} args - Arguments to delete one Application.
     * @example
     * // Delete one Application
     * const Application = await prisma.application.delete({
     *   where: {
     *     // ... filter to delete one Application
     *   }
     * })
     * 
     */
    delete<T extends ApplicationDeleteArgs>(args: SelectSubset<T, ApplicationDeleteArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Application.
     * @param {ApplicationUpdateArgs} args - Arguments to update one Application.
     * @example
     * // Update one Application
     * const application = await prisma.application.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicationUpdateArgs>(args: SelectSubset<T, ApplicationUpdateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Applications.
     * @param {ApplicationDeleteManyArgs} args - Arguments to filter Applications to delete.
     * @example
     * // Delete a few Applications
     * const { count } = await prisma.application.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicationDeleteManyArgs>(args?: SelectSubset<T, ApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicationUpdateManyArgs>(args: SelectSubset<T, ApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications and returns the data updated in the database.
     * @param {ApplicationUpdateManyAndReturnArgs} args - Arguments to update many Applications.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, ApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Application.
     * @param {ApplicationUpsertArgs} args - Arguments to update or create a Application.
     * @example
     * // Update or create a Application
     * const application = await prisma.application.upsert({
     *   create: {
     *     // ... data to create a Application
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Application we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationUpsertArgs>(args: SelectSubset<T, ApplicationUpsertArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationCountArgs} args - Arguments to filter Applications to count.
     * @example
     * // Count the number of Applications
     * const count = await prisma.application.count({
     *   where: {
     *     // ... the filter for the Applications we want to count
     *   }
     * })
    **/
    count<T extends ApplicationCountArgs>(
      args?: Subset<T, ApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApplicationAggregateArgs>(args: Subset<T, ApplicationAggregateArgs>): Prisma.PrismaPromise<GetApplicationAggregateType<T>>

    /**
     * Group by Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationGroupByArgs} args - Group by arguments.
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
      T extends ApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Application model
   */
  readonly fields: ApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Application.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends StudentProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfileDefaultArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Application model
   */
  interface ApplicationFieldRefs {
    readonly id: FieldRef<"Application", 'String'>
    readonly jobId: FieldRef<"Application", 'String'>
    readonly studentId: FieldRef<"Application", 'String'>
    readonly status: FieldRef<"Application", 'ApplicationStatus'>
    readonly resumeUrl: FieldRef<"Application", 'String'>
    readonly notes: FieldRef<"Application", 'String'>
    readonly createdAt: FieldRef<"Application", 'DateTime'>
    readonly updatedAt: FieldRef<"Application", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Application findUnique
   */
  export type ApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findUniqueOrThrow
   */
  export type ApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findFirst
   */
  export type ApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findFirstOrThrow
   */
  export type ApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findMany
   */
  export type ApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application create
   */
  export type ApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a Application.
     */
    data: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
  }

  /**
   * Application createMany
   */
  export type ApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Application createManyAndReturn
   */
  export type ApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Application update
   */
  export type ApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a Application.
     */
    data: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
    /**
     * Choose, which Application to update.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application updateMany
   */
  export type ApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
  }

  /**
   * Application updateManyAndReturn
   */
  export type ApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Application upsert
   */
  export type ApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the Application to update in case it exists.
     */
    where: ApplicationWhereUniqueInput
    /**
     * In case the Application found by the `where` argument doesn't exist, create a new Application with this data.
     */
    create: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
    /**
     * In case the Application was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
  }

  /**
   * Application delete
   */
  export type ApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter which Application to delete.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application deleteMany
   */
  export type ApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Applications to delete
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to delete.
     */
    limit?: number
  }

  /**
   * Application without action
   */
  export type ApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
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
    passwordHash: 'passwordHash',
    name: 'name',
    role: 'role',
    avatarUrl: 'avatarUrl',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StudentProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    enrollmentNumber: 'enrollmentNumber',
    branch: 'branch',
    batchYear: 'batchYear',
    cgpa: 'cgpa',
    tenthMarks: 'tenthMarks',
    twelfthMarks: 'twelfthMarks',
    resumeUrl: 'resumeUrl',
    skills: 'skills',
    linkedinUrl: 'linkedinUrl',
    githubUrl: 'githubUrl',
    portfolioUrl: 'portfolioUrl',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentProfileScalarFieldEnum = (typeof StudentProfileScalarFieldEnum)[keyof typeof StudentProfileScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    website: 'website',
    logoUrl: 'logoUrl',
    industry: 'industry',
    location: 'location',
    description: 'description',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const RecruiterProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    companyId: 'companyId',
    designation: 'designation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RecruiterProfileScalarFieldEnum = (typeof RecruiterProfileScalarFieldEnum)[keyof typeof RecruiterProfileScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    title: 'title',
    description: 'description',
    type: 'type',
    status: 'status',
    location: 'location',
    salaryPackage: 'salaryPackage',
    minCgpa: 'minCgpa',
    allowedBranches: 'allowedBranches',
    eligibleBatches: 'eligibleBatches',
    deadline: 'deadline',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const ApplicationScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    studentId: 'studentId',
    status: 'status',
    resumeUrl: 'resumeUrl',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'JobType'
   */
  export type EnumJobTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobType'>
    


  /**
   * Reference to a field of type 'JobType[]'
   */
  export type ListEnumJobTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobType[]'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    


  /**
   * Reference to a field of type 'ApplicationStatus'
   */
  export type EnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus'>
    


  /**
   * Reference to a field of type 'ApplicationStatus[]'
   */
  export type ListEnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    avatarUrl?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    student?: XOR<StudentProfileNullableScalarRelationFilter, StudentProfileWhereInput> | null
    recruiter?: XOR<RecruiterProfileNullableScalarRelationFilter, RecruiterProfileWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: StudentProfileOrderByWithRelationInput
    recruiter?: RecruiterProfileOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    avatarUrl?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    student?: XOR<StudentProfileNullableScalarRelationFilter, StudentProfileWhereInput> | null
    recruiter?: XOR<RecruiterProfileNullableScalarRelationFilter, RecruiterProfileWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StudentProfileWhereInput = {
    AND?: StudentProfileWhereInput | StudentProfileWhereInput[]
    OR?: StudentProfileWhereInput[]
    NOT?: StudentProfileWhereInput | StudentProfileWhereInput[]
    id?: StringFilter<"StudentProfile"> | string
    userId?: StringFilter<"StudentProfile"> | string
    enrollmentNumber?: StringFilter<"StudentProfile"> | string
    branch?: StringFilter<"StudentProfile"> | string
    batchYear?: IntFilter<"StudentProfile"> | number
    cgpa?: FloatFilter<"StudentProfile"> | number
    tenthMarks?: FloatNullableFilter<"StudentProfile"> | number | null
    twelfthMarks?: FloatNullableFilter<"StudentProfile"> | number | null
    resumeUrl?: StringNullableFilter<"StudentProfile"> | string | null
    skills?: StringNullableListFilter<"StudentProfile">
    linkedinUrl?: StringNullableFilter<"StudentProfile"> | string | null
    githubUrl?: StringNullableFilter<"StudentProfile"> | string | null
    portfolioUrl?: StringNullableFilter<"StudentProfile"> | string | null
    isVerified?: BoolFilter<"StudentProfile"> | boolean
    createdAt?: DateTimeFilter<"StudentProfile"> | Date | string
    updatedAt?: DateTimeFilter<"StudentProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    applications?: ApplicationListRelationFilter
  }

  export type StudentProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    enrollmentNumber?: SortOrder
    branch?: SortOrder
    batchYear?: SortOrder
    cgpa?: SortOrder
    tenthMarks?: SortOrderInput | SortOrder
    twelfthMarks?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    skills?: SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    githubUrl?: SortOrderInput | SortOrder
    portfolioUrl?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    applications?: ApplicationOrderByRelationAggregateInput
  }

  export type StudentProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    enrollmentNumber?: string
    AND?: StudentProfileWhereInput | StudentProfileWhereInput[]
    OR?: StudentProfileWhereInput[]
    NOT?: StudentProfileWhereInput | StudentProfileWhereInput[]
    branch?: StringFilter<"StudentProfile"> | string
    batchYear?: IntFilter<"StudentProfile"> | number
    cgpa?: FloatFilter<"StudentProfile"> | number
    tenthMarks?: FloatNullableFilter<"StudentProfile"> | number | null
    twelfthMarks?: FloatNullableFilter<"StudentProfile"> | number | null
    resumeUrl?: StringNullableFilter<"StudentProfile"> | string | null
    skills?: StringNullableListFilter<"StudentProfile">
    linkedinUrl?: StringNullableFilter<"StudentProfile"> | string | null
    githubUrl?: StringNullableFilter<"StudentProfile"> | string | null
    portfolioUrl?: StringNullableFilter<"StudentProfile"> | string | null
    isVerified?: BoolFilter<"StudentProfile"> | boolean
    createdAt?: DateTimeFilter<"StudentProfile"> | Date | string
    updatedAt?: DateTimeFilter<"StudentProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    applications?: ApplicationListRelationFilter
  }, "id" | "userId" | "enrollmentNumber">

  export type StudentProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    enrollmentNumber?: SortOrder
    branch?: SortOrder
    batchYear?: SortOrder
    cgpa?: SortOrder
    tenthMarks?: SortOrderInput | SortOrder
    twelfthMarks?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    skills?: SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    githubUrl?: SortOrderInput | SortOrder
    portfolioUrl?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentProfileCountOrderByAggregateInput
    _avg?: StudentProfileAvgOrderByAggregateInput
    _max?: StudentProfileMaxOrderByAggregateInput
    _min?: StudentProfileMinOrderByAggregateInput
    _sum?: StudentProfileSumOrderByAggregateInput
  }

  export type StudentProfileScalarWhereWithAggregatesInput = {
    AND?: StudentProfileScalarWhereWithAggregatesInput | StudentProfileScalarWhereWithAggregatesInput[]
    OR?: StudentProfileScalarWhereWithAggregatesInput[]
    NOT?: StudentProfileScalarWhereWithAggregatesInput | StudentProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentProfile"> | string
    userId?: StringWithAggregatesFilter<"StudentProfile"> | string
    enrollmentNumber?: StringWithAggregatesFilter<"StudentProfile"> | string
    branch?: StringWithAggregatesFilter<"StudentProfile"> | string
    batchYear?: IntWithAggregatesFilter<"StudentProfile"> | number
    cgpa?: FloatWithAggregatesFilter<"StudentProfile"> | number
    tenthMarks?: FloatNullableWithAggregatesFilter<"StudentProfile"> | number | null
    twelfthMarks?: FloatNullableWithAggregatesFilter<"StudentProfile"> | number | null
    resumeUrl?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    skills?: StringNullableListFilter<"StudentProfile">
    linkedinUrl?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    githubUrl?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    portfolioUrl?: StringNullableWithAggregatesFilter<"StudentProfile"> | string | null
    isVerified?: BoolWithAggregatesFilter<"StudentProfile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"StudentProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StudentProfile"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    website?: StringNullableFilter<"Company"> | string | null
    logoUrl?: StringNullableFilter<"Company"> | string | null
    industry?: StringNullableFilter<"Company"> | string | null
    location?: StringNullableFilter<"Company"> | string | null
    description?: StringNullableFilter<"Company"> | string | null
    isVerified?: BoolFilter<"Company"> | boolean
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    recruiters?: RecruiterProfileListRelationFilter
    jobs?: JobListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recruiters?: RecruiterProfileOrderByRelationAggregateInput
    jobs?: JobOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    website?: StringNullableFilter<"Company"> | string | null
    logoUrl?: StringNullableFilter<"Company"> | string | null
    industry?: StringNullableFilter<"Company"> | string | null
    location?: StringNullableFilter<"Company"> | string | null
    description?: StringNullableFilter<"Company"> | string | null
    isVerified?: BoolFilter<"Company"> | boolean
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    recruiters?: RecruiterProfileListRelationFilter
    jobs?: JobListRelationFilter
  }, "id" | "name">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    website?: StringNullableWithAggregatesFilter<"Company"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Company"> | string | null
    industry?: StringNullableWithAggregatesFilter<"Company"> | string | null
    location?: StringNullableWithAggregatesFilter<"Company"> | string | null
    description?: StringNullableWithAggregatesFilter<"Company"> | string | null
    isVerified?: BoolWithAggregatesFilter<"Company"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type RecruiterProfileWhereInput = {
    AND?: RecruiterProfileWhereInput | RecruiterProfileWhereInput[]
    OR?: RecruiterProfileWhereInput[]
    NOT?: RecruiterProfileWhereInput | RecruiterProfileWhereInput[]
    id?: StringFilter<"RecruiterProfile"> | string
    userId?: StringFilter<"RecruiterProfile"> | string
    companyId?: StringFilter<"RecruiterProfile"> | string
    designation?: StringNullableFilter<"RecruiterProfile"> | string | null
    createdAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
    updatedAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type RecruiterProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    designation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
  }

  export type RecruiterProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: RecruiterProfileWhereInput | RecruiterProfileWhereInput[]
    OR?: RecruiterProfileWhereInput[]
    NOT?: RecruiterProfileWhereInput | RecruiterProfileWhereInput[]
    companyId?: StringFilter<"RecruiterProfile"> | string
    designation?: StringNullableFilter<"RecruiterProfile"> | string | null
    createdAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
    updatedAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id" | "userId">

  export type RecruiterProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    designation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RecruiterProfileCountOrderByAggregateInput
    _max?: RecruiterProfileMaxOrderByAggregateInput
    _min?: RecruiterProfileMinOrderByAggregateInput
  }

  export type RecruiterProfileScalarWhereWithAggregatesInput = {
    AND?: RecruiterProfileScalarWhereWithAggregatesInput | RecruiterProfileScalarWhereWithAggregatesInput[]
    OR?: RecruiterProfileScalarWhereWithAggregatesInput[]
    NOT?: RecruiterProfileScalarWhereWithAggregatesInput | RecruiterProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecruiterProfile"> | string
    userId?: StringWithAggregatesFilter<"RecruiterProfile"> | string
    companyId?: StringWithAggregatesFilter<"RecruiterProfile"> | string
    designation?: StringNullableWithAggregatesFilter<"RecruiterProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RecruiterProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RecruiterProfile"> | Date | string
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    type?: EnumJobTypeFilter<"Job"> | $Enums.JobType
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    location?: StringFilter<"Job"> | string
    salaryPackage?: StringFilter<"Job"> | string
    minCgpa?: FloatFilter<"Job"> | number
    allowedBranches?: StringNullableListFilter<"Job">
    eligibleBatches?: IntNullableListFilter<"Job">
    deadline?: DateTimeFilter<"Job"> | Date | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    applications?: ApplicationListRelationFilter
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    location?: SortOrder
    salaryPackage?: SortOrder
    minCgpa?: SortOrder
    allowedBranches?: SortOrder
    eligibleBatches?: SortOrder
    deadline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    applications?: ApplicationOrderByRelationAggregateInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    companyId?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    type?: EnumJobTypeFilter<"Job"> | $Enums.JobType
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    location?: StringFilter<"Job"> | string
    salaryPackage?: StringFilter<"Job"> | string
    minCgpa?: FloatFilter<"Job"> | number
    allowedBranches?: StringNullableListFilter<"Job">
    eligibleBatches?: IntNullableListFilter<"Job">
    deadline?: DateTimeFilter<"Job"> | Date | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    applications?: ApplicationListRelationFilter
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    location?: SortOrder
    salaryPackage?: SortOrder
    minCgpa?: SortOrder
    allowedBranches?: SortOrder
    eligibleBatches?: SortOrder
    deadline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _avg?: JobAvgOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
    _sum?: JobSumOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    companyId?: StringWithAggregatesFilter<"Job"> | string
    title?: StringWithAggregatesFilter<"Job"> | string
    description?: StringWithAggregatesFilter<"Job"> | string
    type?: EnumJobTypeWithAggregatesFilter<"Job"> | $Enums.JobType
    status?: EnumJobStatusWithAggregatesFilter<"Job"> | $Enums.JobStatus
    location?: StringWithAggregatesFilter<"Job"> | string
    salaryPackage?: StringWithAggregatesFilter<"Job"> | string
    minCgpa?: FloatWithAggregatesFilter<"Job"> | number
    allowedBranches?: StringNullableListFilter<"Job">
    eligibleBatches?: IntNullableListFilter<"Job">
    deadline?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
  }

  export type ApplicationWhereInput = {
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    id?: StringFilter<"Application"> | string
    jobId?: StringFilter<"Application"> | string
    studentId?: StringFilter<"Application"> | string
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    resumeUrl?: StringNullableFilter<"Application"> | string | null
    notes?: StringNullableFilter<"Application"> | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
    updatedAt?: DateTimeFilter<"Application"> | Date | string
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    student?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
  }

  export type ApplicationOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    job?: JobOrderByWithRelationInput
    student?: StudentProfileOrderByWithRelationInput
  }

  export type ApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jobId_studentId?: ApplicationJobIdStudentIdCompoundUniqueInput
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    jobId?: StringFilter<"Application"> | string
    studentId?: StringFilter<"Application"> | string
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    resumeUrl?: StringNullableFilter<"Application"> | string | null
    notes?: StringNullableFilter<"Application"> | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
    updatedAt?: DateTimeFilter<"Application"> | Date | string
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    student?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
  }, "id" | "jobId_studentId">

  export type ApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApplicationCountOrderByAggregateInput
    _max?: ApplicationMaxOrderByAggregateInput
    _min?: ApplicationMinOrderByAggregateInput
  }

  export type ApplicationScalarWhereWithAggregatesInput = {
    AND?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    OR?: ApplicationScalarWhereWithAggregatesInput[]
    NOT?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Application"> | string
    jobId?: StringWithAggregatesFilter<"Application"> | string
    studentId?: StringWithAggregatesFilter<"Application"> | string
    status?: EnumApplicationStatusWithAggregatesFilter<"Application"> | $Enums.ApplicationStatus
    resumeUrl?: StringNullableWithAggregatesFilter<"Application"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Application"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Application"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Application"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash?: string | null
    name: string
    role?: $Enums.Role
    avatarUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    student?: StudentProfileCreateNestedOneWithoutUserInput
    recruiter?: RecruiterProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash?: string | null
    name: string
    role?: $Enums.Role
    avatarUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    student?: StudentProfileUncheckedCreateNestedOneWithoutUserInput
    recruiter?: RecruiterProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentProfileUpdateOneWithoutUserNestedInput
    recruiter?: RecruiterProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentProfileUncheckedUpdateOneWithoutUserNestedInput
    recruiter?: RecruiterProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash?: string | null
    name: string
    role?: $Enums.Role
    avatarUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentProfileCreateInput = {
    id?: string
    enrollmentNumber: string
    branch: string
    batchYear: number
    cgpa: number
    tenthMarks?: number | null
    twelfthMarks?: number | null
    resumeUrl?: string | null
    skills?: StudentProfileCreateskillsInput | string[]
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStudentInput
    applications?: ApplicationCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileUncheckedCreateInput = {
    id?: string
    userId: string
    enrollmentNumber: string
    branch: string
    batchYear: number
    cgpa: number
    tenthMarks?: number | null
    twelfthMarks?: number | null
    resumeUrl?: string | null
    skills?: StudentProfileCreateskillsInput | string[]
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrollmentNumber?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    batchYear?: IntFieldUpdateOperationsInput | number
    cgpa?: FloatFieldUpdateOperationsInput | number
    tenthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    twelfthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StudentProfileUpdateskillsInput | string[]
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    applications?: ApplicationUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    enrollmentNumber?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    batchYear?: IntFieldUpdateOperationsInput | number
    cgpa?: FloatFieldUpdateOperationsInput | number
    tenthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    twelfthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StudentProfileUpdateskillsInput | string[]
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileCreateManyInput = {
    id?: string
    userId: string
    enrollmentNumber: string
    branch: string
    batchYear: number
    cgpa: number
    tenthMarks?: number | null
    twelfthMarks?: number | null
    resumeUrl?: string | null
    skills?: StudentProfileCreateskillsInput | string[]
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrollmentNumber?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    batchYear?: IntFieldUpdateOperationsInput | number
    cgpa?: FloatFieldUpdateOperationsInput | number
    tenthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    twelfthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StudentProfileUpdateskillsInput | string[]
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    enrollmentNumber?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    batchYear?: IntFieldUpdateOperationsInput | number
    cgpa?: FloatFieldUpdateOperationsInput | number
    tenthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    twelfthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StudentProfileUpdateskillsInput | string[]
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiters?: RecruiterProfileCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiters?: RecruiterProfileUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiters?: RecruiterProfileUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiters?: RecruiterProfileUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileCreateInput = {
    id?: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRecruiterInput
    company: CompanyCreateNestedOneWithoutRecruitersInput
  }

  export type RecruiterProfileUncheckedCreateInput = {
    id?: string
    userId: string
    companyId: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecruiterProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRecruiterNestedInput
    company?: CompanyUpdateOneRequiredWithoutRecruitersNestedInput
  }

  export type RecruiterProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileCreateManyInput = {
    id?: string
    userId: string
    companyId: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecruiterProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateInput = {
    id?: string
    title: string
    description: string
    type?: $Enums.JobType
    status?: $Enums.JobStatus
    location: string
    salaryPackage: string
    minCgpa?: number
    allowedBranches?: JobCreateallowedBranchesInput | string[]
    eligibleBatches?: JobCreateeligibleBatchesInput | number[]
    deadline: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    applications?: ApplicationCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    companyId: string
    title: string
    description: string
    type?: $Enums.JobType
    status?: $Enums.JobStatus
    location: string
    salaryPackage: string
    minCgpa?: number
    allowedBranches?: JobCreateallowedBranchesInput | string[]
    eligibleBatches?: JobCreateeligibleBatchesInput | number[]
    deadline: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    location?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    minCgpa?: FloatFieldUpdateOperationsInput | number
    allowedBranches?: JobUpdateallowedBranchesInput | string[]
    eligibleBatches?: JobUpdateeligibleBatchesInput | number[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    applications?: ApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    location?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    minCgpa?: FloatFieldUpdateOperationsInput | number
    allowedBranches?: JobUpdateallowedBranchesInput | string[]
    eligibleBatches?: JobUpdateeligibleBatchesInput | number[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateManyInput = {
    id?: string
    companyId: string
    title: string
    description: string
    type?: $Enums.JobType
    status?: $Enums.JobStatus
    location: string
    salaryPackage: string
    minCgpa?: number
    allowedBranches?: JobCreateallowedBranchesInput | string[]
    eligibleBatches?: JobCreateeligibleBatchesInput | number[]
    deadline: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    location?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    minCgpa?: FloatFieldUpdateOperationsInput | number
    allowedBranches?: JobUpdateallowedBranchesInput | string[]
    eligibleBatches?: JobUpdateeligibleBatchesInput | number[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    location?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    minCgpa?: FloatFieldUpdateOperationsInput | number
    allowedBranches?: JobUpdateallowedBranchesInput | string[]
    eligibleBatches?: JobUpdateeligibleBatchesInput | number[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutApplicationsInput
    student: StudentProfileCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateInput = {
    id?: string
    jobId: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    student?: StudentProfileUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyInput = {
    id?: string
    jobId: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type StudentProfileNullableScalarRelationFilter = {
    is?: StudentProfileWhereInput | null
    isNot?: StudentProfileWhereInput | null
  }

  export type RecruiterProfileNullableScalarRelationFilter = {
    is?: RecruiterProfileWhereInput | null
    isNot?: RecruiterProfileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ApplicationListRelationFilter = {
    every?: ApplicationWhereInput
    some?: ApplicationWhereInput
    none?: ApplicationWhereInput
  }

  export type ApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    enrollmentNumber?: SortOrder
    branch?: SortOrder
    batchYear?: SortOrder
    cgpa?: SortOrder
    tenthMarks?: SortOrder
    twelfthMarks?: SortOrder
    resumeUrl?: SortOrder
    skills?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    portfolioUrl?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentProfileAvgOrderByAggregateInput = {
    batchYear?: SortOrder
    cgpa?: SortOrder
    tenthMarks?: SortOrder
    twelfthMarks?: SortOrder
  }

  export type StudentProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    enrollmentNumber?: SortOrder
    branch?: SortOrder
    batchYear?: SortOrder
    cgpa?: SortOrder
    tenthMarks?: SortOrder
    twelfthMarks?: SortOrder
    resumeUrl?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    portfolioUrl?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    enrollmentNumber?: SortOrder
    branch?: SortOrder
    batchYear?: SortOrder
    cgpa?: SortOrder
    tenthMarks?: SortOrder
    twelfthMarks?: SortOrder
    resumeUrl?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    portfolioUrl?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentProfileSumOrderByAggregateInput = {
    batchYear?: SortOrder
    cgpa?: SortOrder
    tenthMarks?: SortOrder
    twelfthMarks?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type RecruiterProfileListRelationFilter = {
    every?: RecruiterProfileWhereInput
    some?: RecruiterProfileWhereInput
    none?: RecruiterProfileWhereInput
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type RecruiterProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrder
    logoUrl?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    description?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrder
    logoUrl?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    description?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrder
    logoUrl?: SortOrder
    industry?: SortOrder
    location?: SortOrder
    description?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type RecruiterProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    designation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecruiterProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    designation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecruiterProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    designation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumJobTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeFilter<$PrismaModel> | $Enums.JobType
  }

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    location?: SortOrder
    salaryPackage?: SortOrder
    minCgpa?: SortOrder
    allowedBranches?: SortOrder
    eligibleBatches?: SortOrder
    deadline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobAvgOrderByAggregateInput = {
    minCgpa?: SortOrder
    eligibleBatches?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    location?: SortOrder
    salaryPackage?: SortOrder
    minCgpa?: SortOrder
    deadline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    location?: SortOrder
    salaryPackage?: SortOrder
    minCgpa?: SortOrder
    deadline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSumOrderByAggregateInput = {
    minCgpa?: SortOrder
    eligibleBatches?: SortOrder
  }

  export type EnumJobTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeWithAggregatesFilter<$PrismaModel> | $Enums.JobType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobTypeFilter<$PrismaModel>
    _max?: NestedEnumJobTypeFilter<$PrismaModel>
  }

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type EnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type JobScalarRelationFilter = {
    is?: JobWhereInput
    isNot?: JobWhereInput
  }

  export type StudentProfileScalarRelationFilter = {
    is?: StudentProfileWhereInput
    isNot?: StudentProfileWhereInput
  }

  export type ApplicationJobIdStudentIdCompoundUniqueInput = {
    jobId: string
    studentId: string
  }

  export type ApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    resumeUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    resumeUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    resumeUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type StudentProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutUserInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type RecruiterProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<RecruiterProfileCreateWithoutUserInput, RecruiterProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutUserInput
    connect?: RecruiterProfileWhereUniqueInput
  }

  export type StudentProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutUserInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type RecruiterProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<RecruiterProfileCreateWithoutUserInput, RecruiterProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutUserInput
    connect?: RecruiterProfileWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StudentProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutUserInput
    upsert?: StudentProfileUpsertWithoutUserInput
    disconnect?: StudentProfileWhereInput | boolean
    delete?: StudentProfileWhereInput | boolean
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutUserInput, StudentProfileUpdateWithoutUserInput>, StudentProfileUncheckedUpdateWithoutUserInput>
  }

  export type RecruiterProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<RecruiterProfileCreateWithoutUserInput, RecruiterProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutUserInput
    upsert?: RecruiterProfileUpsertWithoutUserInput
    disconnect?: RecruiterProfileWhereInput | boolean
    delete?: RecruiterProfileWhereInput | boolean
    connect?: RecruiterProfileWhereUniqueInput
    update?: XOR<XOR<RecruiterProfileUpdateToOneWithWhereWithoutUserInput, RecruiterProfileUpdateWithoutUserInput>, RecruiterProfileUncheckedUpdateWithoutUserInput>
  }

  export type StudentProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutUserInput
    upsert?: StudentProfileUpsertWithoutUserInput
    disconnect?: StudentProfileWhereInput | boolean
    delete?: StudentProfileWhereInput | boolean
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutUserInput, StudentProfileUpdateWithoutUserInput>, StudentProfileUncheckedUpdateWithoutUserInput>
  }

  export type RecruiterProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<RecruiterProfileCreateWithoutUserInput, RecruiterProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutUserInput
    upsert?: RecruiterProfileUpsertWithoutUserInput
    disconnect?: RecruiterProfileWhereInput | boolean
    delete?: RecruiterProfileWhereInput | boolean
    connect?: RecruiterProfileWhereUniqueInput
    update?: XOR<XOR<RecruiterProfileUpdateToOneWithWhereWithoutUserInput, RecruiterProfileUpdateWithoutUserInput>, RecruiterProfileUncheckedUpdateWithoutUserInput>
  }

  export type StudentProfileCreateskillsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutStudentInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    connect?: UserWhereUniqueInput
  }

  export type ApplicationCreateNestedManyWithoutStudentInput = {
    create?: XOR<ApplicationCreateWithoutStudentInput, ApplicationUncheckedCreateWithoutStudentInput> | ApplicationCreateWithoutStudentInput[] | ApplicationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutStudentInput | ApplicationCreateOrConnectWithoutStudentInput[]
    createMany?: ApplicationCreateManyStudentInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ApplicationCreateWithoutStudentInput, ApplicationUncheckedCreateWithoutStudentInput> | ApplicationCreateWithoutStudentInput[] | ApplicationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutStudentInput | ApplicationCreateOrConnectWithoutStudentInput[]
    createMany?: ApplicationCreateManyStudentInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StudentProfileUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutStudentNestedInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    upsert?: UserUpsertWithoutStudentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentInput, UserUpdateWithoutStudentInput>, UserUncheckedUpdateWithoutStudentInput>
  }

  export type ApplicationUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ApplicationCreateWithoutStudentInput, ApplicationUncheckedCreateWithoutStudentInput> | ApplicationCreateWithoutStudentInput[] | ApplicationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutStudentInput | ApplicationCreateOrConnectWithoutStudentInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutStudentInput | ApplicationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ApplicationCreateManyStudentInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutStudentInput | ApplicationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutStudentInput | ApplicationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ApplicationCreateWithoutStudentInput, ApplicationUncheckedCreateWithoutStudentInput> | ApplicationCreateWithoutStudentInput[] | ApplicationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutStudentInput | ApplicationCreateOrConnectWithoutStudentInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutStudentInput | ApplicationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ApplicationCreateManyStudentInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutStudentInput | ApplicationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutStudentInput | ApplicationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type RecruiterProfileCreateNestedManyWithoutCompanyInput = {
    create?: XOR<RecruiterProfileCreateWithoutCompanyInput, RecruiterProfileUncheckedCreateWithoutCompanyInput> | RecruiterProfileCreateWithoutCompanyInput[] | RecruiterProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutCompanyInput | RecruiterProfileCreateOrConnectWithoutCompanyInput[]
    createMany?: RecruiterProfileCreateManyCompanyInputEnvelope
    connect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
  }

  export type JobCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type RecruiterProfileUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<RecruiterProfileCreateWithoutCompanyInput, RecruiterProfileUncheckedCreateWithoutCompanyInput> | RecruiterProfileCreateWithoutCompanyInput[] | RecruiterProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutCompanyInput | RecruiterProfileCreateOrConnectWithoutCompanyInput[]
    createMany?: RecruiterProfileCreateManyCompanyInputEnvelope
    connect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type RecruiterProfileUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<RecruiterProfileCreateWithoutCompanyInput, RecruiterProfileUncheckedCreateWithoutCompanyInput> | RecruiterProfileCreateWithoutCompanyInput[] | RecruiterProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutCompanyInput | RecruiterProfileCreateOrConnectWithoutCompanyInput[]
    upsert?: RecruiterProfileUpsertWithWhereUniqueWithoutCompanyInput | RecruiterProfileUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: RecruiterProfileCreateManyCompanyInputEnvelope
    set?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    disconnect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    delete?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    connect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    update?: RecruiterProfileUpdateWithWhereUniqueWithoutCompanyInput | RecruiterProfileUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: RecruiterProfileUpdateManyWithWhereWithoutCompanyInput | RecruiterProfileUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: RecruiterProfileScalarWhereInput | RecruiterProfileScalarWhereInput[]
  }

  export type JobUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCompanyInput | JobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCompanyInput | JobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCompanyInput | JobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type RecruiterProfileUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<RecruiterProfileCreateWithoutCompanyInput, RecruiterProfileUncheckedCreateWithoutCompanyInput> | RecruiterProfileCreateWithoutCompanyInput[] | RecruiterProfileUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RecruiterProfileCreateOrConnectWithoutCompanyInput | RecruiterProfileCreateOrConnectWithoutCompanyInput[]
    upsert?: RecruiterProfileUpsertWithWhereUniqueWithoutCompanyInput | RecruiterProfileUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: RecruiterProfileCreateManyCompanyInputEnvelope
    set?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    disconnect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    delete?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    connect?: RecruiterProfileWhereUniqueInput | RecruiterProfileWhereUniqueInput[]
    update?: RecruiterProfileUpdateWithWhereUniqueWithoutCompanyInput | RecruiterProfileUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: RecruiterProfileUpdateManyWithWhereWithoutCompanyInput | RecruiterProfileUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: RecruiterProfileScalarWhereInput | RecruiterProfileScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCompanyInput | JobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCompanyInput | JobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCompanyInput | JobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRecruiterInput = {
    create?: XOR<UserCreateWithoutRecruiterInput, UserUncheckedCreateWithoutRecruiterInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecruiterInput
    connect?: UserWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutRecruitersInput = {
    create?: XOR<CompanyCreateWithoutRecruitersInput, CompanyUncheckedCreateWithoutRecruitersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutRecruitersInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRecruiterNestedInput = {
    create?: XOR<UserCreateWithoutRecruiterInput, UserUncheckedCreateWithoutRecruiterInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecruiterInput
    upsert?: UserUpsertWithoutRecruiterInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecruiterInput, UserUpdateWithoutRecruiterInput>, UserUncheckedUpdateWithoutRecruiterInput>
  }

  export type CompanyUpdateOneRequiredWithoutRecruitersNestedInput = {
    create?: XOR<CompanyCreateWithoutRecruitersInput, CompanyUncheckedCreateWithoutRecruitersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutRecruitersInput
    upsert?: CompanyUpsertWithoutRecruitersInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutRecruitersInput, CompanyUpdateWithoutRecruitersInput>, CompanyUncheckedUpdateWithoutRecruitersInput>
  }

  export type JobCreateallowedBranchesInput = {
    set: string[]
  }

  export type JobCreateeligibleBatchesInput = {
    set: number[]
  }

  export type CompanyCreateNestedOneWithoutJobsInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    connect?: CompanyWhereUniqueInput
  }

  export type ApplicationCreateNestedManyWithoutJobInput = {
    create?: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput> | ApplicationCreateWithoutJobInput[] | ApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutJobInput | ApplicationCreateOrConnectWithoutJobInput[]
    createMany?: ApplicationCreateManyJobInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput> | ApplicationCreateWithoutJobInput[] | ApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutJobInput | ApplicationCreateOrConnectWithoutJobInput[]
    createMany?: ApplicationCreateManyJobInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type EnumJobTypeFieldUpdateOperationsInput = {
    set?: $Enums.JobType
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type JobUpdateallowedBranchesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobUpdateeligibleBatchesInput = {
    set?: number[]
    push?: number | number[]
  }

  export type CompanyUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    upsert?: CompanyUpsertWithoutJobsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutJobsInput, CompanyUpdateWithoutJobsInput>, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type ApplicationUpdateManyWithoutJobNestedInput = {
    create?: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput> | ApplicationCreateWithoutJobInput[] | ApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutJobInput | ApplicationCreateOrConnectWithoutJobInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutJobInput | ApplicationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ApplicationCreateManyJobInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutJobInput | ApplicationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutJobInput | ApplicationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput> | ApplicationCreateWithoutJobInput[] | ApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutJobInput | ApplicationCreateOrConnectWithoutJobInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutJobInput | ApplicationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: ApplicationCreateManyJobInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutJobInput | ApplicationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutJobInput | ApplicationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type JobCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput
    connect?: JobWhereUniqueInput
  }

  export type StudentProfileCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<StudentProfileCreateWithoutApplicationsInput, StudentProfileUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutApplicationsInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type EnumApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApplicationStatus
  }

  export type JobUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput
    upsert?: JobUpsertWithoutApplicationsInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutApplicationsInput, JobUpdateWithoutApplicationsInput>, JobUncheckedUpdateWithoutApplicationsInput>
  }

  export type StudentProfileUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<StudentProfileCreateWithoutApplicationsInput, StudentProfileUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutApplicationsInput
    upsert?: StudentProfileUpsertWithoutApplicationsInput
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutApplicationsInput, StudentProfileUpdateWithoutApplicationsInput>, StudentProfileUncheckedUpdateWithoutApplicationsInput>
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

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumJobTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeFilter<$PrismaModel> | $Enums.JobType
  }

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type NestedEnumJobTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeWithAggregatesFilter<$PrismaModel> | $Enums.JobType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobTypeFilter<$PrismaModel>
    _max?: NestedEnumJobTypeFilter<$PrismaModel>
  }

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type NestedEnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type StudentProfileCreateWithoutUserInput = {
    id?: string
    enrollmentNumber: string
    branch: string
    batchYear: number
    cgpa: number
    tenthMarks?: number | null
    twelfthMarks?: number | null
    resumeUrl?: string | null
    skills?: StudentProfileCreateskillsInput | string[]
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileUncheckedCreateWithoutUserInput = {
    id?: string
    enrollmentNumber: string
    branch: string
    batchYear: number
    cgpa: number
    tenthMarks?: number | null
    twelfthMarks?: number | null
    resumeUrl?: string | null
    skills?: StudentProfileCreateskillsInput | string[]
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileCreateOrConnectWithoutUserInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
  }

  export type RecruiterProfileCreateWithoutUserInput = {
    id?: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutRecruitersInput
  }

  export type RecruiterProfileUncheckedCreateWithoutUserInput = {
    id?: string
    companyId: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecruiterProfileCreateOrConnectWithoutUserInput = {
    where: RecruiterProfileWhereUniqueInput
    create: XOR<RecruiterProfileCreateWithoutUserInput, RecruiterProfileUncheckedCreateWithoutUserInput>
  }

  export type StudentProfileUpsertWithoutUserInput = {
    update: XOR<StudentProfileUpdateWithoutUserInput, StudentProfileUncheckedUpdateWithoutUserInput>
    create: XOR<StudentProfileCreateWithoutUserInput, StudentProfileUncheckedCreateWithoutUserInput>
    where?: StudentProfileWhereInput
  }

  export type StudentProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: StudentProfileWhereInput
    data: XOR<StudentProfileUpdateWithoutUserInput, StudentProfileUncheckedUpdateWithoutUserInput>
  }

  export type StudentProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrollmentNumber?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    batchYear?: IntFieldUpdateOperationsInput | number
    cgpa?: FloatFieldUpdateOperationsInput | number
    tenthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    twelfthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StudentProfileUpdateskillsInput | string[]
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrollmentNumber?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    batchYear?: IntFieldUpdateOperationsInput | number
    cgpa?: FloatFieldUpdateOperationsInput | number
    tenthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    twelfthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StudentProfileUpdateskillsInput | string[]
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type RecruiterProfileUpsertWithoutUserInput = {
    update: XOR<RecruiterProfileUpdateWithoutUserInput, RecruiterProfileUncheckedUpdateWithoutUserInput>
    create: XOR<RecruiterProfileCreateWithoutUserInput, RecruiterProfileUncheckedCreateWithoutUserInput>
    where?: RecruiterProfileWhereInput
  }

  export type RecruiterProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: RecruiterProfileWhereInput
    data: XOR<RecruiterProfileUpdateWithoutUserInput, RecruiterProfileUncheckedUpdateWithoutUserInput>
  }

  export type RecruiterProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutRecruitersNestedInput
  }

  export type RecruiterProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutStudentInput = {
    id?: string
    email: string
    passwordHash?: string | null
    name: string
    role?: $Enums.Role
    avatarUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiter?: RecruiterProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStudentInput = {
    id?: string
    email: string
    passwordHash?: string | null
    name: string
    role?: $Enums.Role
    avatarUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiter?: RecruiterProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStudentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
  }

  export type ApplicationCreateWithoutStudentInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutStudentInput = {
    id?: string
    jobId: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutStudentInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutStudentInput, ApplicationUncheckedCreateWithoutStudentInput>
  }

  export type ApplicationCreateManyStudentInputEnvelope = {
    data: ApplicationCreateManyStudentInput | ApplicationCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStudentInput = {
    update: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
  }

  export type UserUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiter?: RecruiterProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiter?: RecruiterProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ApplicationUpsertWithWhereUniqueWithoutStudentInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutStudentInput, ApplicationUncheckedUpdateWithoutStudentInput>
    create: XOR<ApplicationCreateWithoutStudentInput, ApplicationUncheckedCreateWithoutStudentInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutStudentInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutStudentInput, ApplicationUncheckedUpdateWithoutStudentInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutStudentInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutStudentInput>
  }

  export type ApplicationScalarWhereInput = {
    AND?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    OR?: ApplicationScalarWhereInput[]
    NOT?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    id?: StringFilter<"Application"> | string
    jobId?: StringFilter<"Application"> | string
    studentId?: StringFilter<"Application"> | string
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    resumeUrl?: StringNullableFilter<"Application"> | string | null
    notes?: StringNullableFilter<"Application"> | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
    updatedAt?: DateTimeFilter<"Application"> | Date | string
  }

  export type RecruiterProfileCreateWithoutCompanyInput = {
    id?: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRecruiterInput
  }

  export type RecruiterProfileUncheckedCreateWithoutCompanyInput = {
    id?: string
    userId: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecruiterProfileCreateOrConnectWithoutCompanyInput = {
    where: RecruiterProfileWhereUniqueInput
    create: XOR<RecruiterProfileCreateWithoutCompanyInput, RecruiterProfileUncheckedCreateWithoutCompanyInput>
  }

  export type RecruiterProfileCreateManyCompanyInputEnvelope = {
    data: RecruiterProfileCreateManyCompanyInput | RecruiterProfileCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type JobCreateWithoutCompanyInput = {
    id?: string
    title: string
    description: string
    type?: $Enums.JobType
    status?: $Enums.JobStatus
    location: string
    salaryPackage: string
    minCgpa?: number
    allowedBranches?: JobCreateallowedBranchesInput | string[]
    eligibleBatches?: JobCreateeligibleBatchesInput | number[]
    deadline: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutCompanyInput = {
    id?: string
    title: string
    description: string
    type?: $Enums.JobType
    status?: $Enums.JobStatus
    location: string
    salaryPackage: string
    minCgpa?: number
    allowedBranches?: JobCreateallowedBranchesInput | string[]
    eligibleBatches?: JobCreateeligibleBatchesInput | number[]
    deadline: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutCompanyInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobCreateManyCompanyInputEnvelope = {
    data: JobCreateManyCompanyInput | JobCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type RecruiterProfileUpsertWithWhereUniqueWithoutCompanyInput = {
    where: RecruiterProfileWhereUniqueInput
    update: XOR<RecruiterProfileUpdateWithoutCompanyInput, RecruiterProfileUncheckedUpdateWithoutCompanyInput>
    create: XOR<RecruiterProfileCreateWithoutCompanyInput, RecruiterProfileUncheckedCreateWithoutCompanyInput>
  }

  export type RecruiterProfileUpdateWithWhereUniqueWithoutCompanyInput = {
    where: RecruiterProfileWhereUniqueInput
    data: XOR<RecruiterProfileUpdateWithoutCompanyInput, RecruiterProfileUncheckedUpdateWithoutCompanyInput>
  }

  export type RecruiterProfileUpdateManyWithWhereWithoutCompanyInput = {
    where: RecruiterProfileScalarWhereInput
    data: XOR<RecruiterProfileUpdateManyMutationInput, RecruiterProfileUncheckedUpdateManyWithoutCompanyInput>
  }

  export type RecruiterProfileScalarWhereInput = {
    AND?: RecruiterProfileScalarWhereInput | RecruiterProfileScalarWhereInput[]
    OR?: RecruiterProfileScalarWhereInput[]
    NOT?: RecruiterProfileScalarWhereInput | RecruiterProfileScalarWhereInput[]
    id?: StringFilter<"RecruiterProfile"> | string
    userId?: StringFilter<"RecruiterProfile"> | string
    companyId?: StringFilter<"RecruiterProfile"> | string
    designation?: StringNullableFilter<"RecruiterProfile"> | string | null
    createdAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
    updatedAt?: DateTimeFilter<"RecruiterProfile"> | Date | string
  }

  export type JobUpsertWithWhereUniqueWithoutCompanyInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutCompanyInput, JobUncheckedUpdateWithoutCompanyInput>
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobUpdateWithWhereUniqueWithoutCompanyInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutCompanyInput, JobUncheckedUpdateWithoutCompanyInput>
  }

  export type JobUpdateManyWithWhereWithoutCompanyInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutCompanyInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    type?: EnumJobTypeFilter<"Job"> | $Enums.JobType
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    location?: StringFilter<"Job"> | string
    salaryPackage?: StringFilter<"Job"> | string
    minCgpa?: FloatFilter<"Job"> | number
    allowedBranches?: StringNullableListFilter<"Job">
    eligibleBatches?: IntNullableListFilter<"Job">
    deadline?: DateTimeFilter<"Job"> | Date | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
  }

  export type UserCreateWithoutRecruiterInput = {
    id?: string
    email: string
    passwordHash?: string | null
    name: string
    role?: $Enums.Role
    avatarUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    student?: StudentProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecruiterInput = {
    id?: string
    email: string
    passwordHash?: string | null
    name: string
    role?: $Enums.Role
    avatarUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    student?: StudentProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecruiterInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecruiterInput, UserUncheckedCreateWithoutRecruiterInput>
  }

  export type CompanyCreateWithoutRecruitersInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutRecruitersInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutRecruitersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutRecruitersInput, CompanyUncheckedCreateWithoutRecruitersInput>
  }

  export type UserUpsertWithoutRecruiterInput = {
    update: XOR<UserUpdateWithoutRecruiterInput, UserUncheckedUpdateWithoutRecruiterInput>
    create: XOR<UserCreateWithoutRecruiterInput, UserUncheckedCreateWithoutRecruiterInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecruiterInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecruiterInput, UserUncheckedUpdateWithoutRecruiterInput>
  }

  export type UserUpdateWithoutRecruiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecruiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CompanyUpsertWithoutRecruitersInput = {
    update: XOR<CompanyUpdateWithoutRecruitersInput, CompanyUncheckedUpdateWithoutRecruitersInput>
    create: XOR<CompanyCreateWithoutRecruitersInput, CompanyUncheckedCreateWithoutRecruitersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutRecruitersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutRecruitersInput, CompanyUncheckedUpdateWithoutRecruitersInput>
  }

  export type CompanyUpdateWithoutRecruitersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutRecruitersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutJobsInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiters?: RecruiterProfileCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutJobsInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiters?: RecruiterProfileUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutJobsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
  }

  export type ApplicationCreateWithoutJobInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentProfileCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutJobInput = {
    id?: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutJobInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput>
  }

  export type ApplicationCreateManyJobInputEnvelope = {
    data: ApplicationCreateManyJobInput | ApplicationCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutJobsInput = {
    update: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutJobsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type CompanyUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiters?: RecruiterProfileUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiters?: RecruiterProfileUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type ApplicationUpsertWithWhereUniqueWithoutJobInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutJobInput, ApplicationUncheckedUpdateWithoutJobInput>
    create: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutJobInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutJobInput, ApplicationUncheckedUpdateWithoutJobInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutJobInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutJobInput>
  }

  export type JobCreateWithoutApplicationsInput = {
    id?: string
    title: string
    description: string
    type?: $Enums.JobType
    status?: $Enums.JobStatus
    location: string
    salaryPackage: string
    minCgpa?: number
    allowedBranches?: JobCreateallowedBranchesInput | string[]
    eligibleBatches?: JobCreateeligibleBatchesInput | number[]
    deadline: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
  }

  export type JobUncheckedCreateWithoutApplicationsInput = {
    id?: string
    companyId: string
    title: string
    description: string
    type?: $Enums.JobType
    status?: $Enums.JobStatus
    location: string
    salaryPackage: string
    minCgpa?: number
    allowedBranches?: JobCreateallowedBranchesInput | string[]
    eligibleBatches?: JobCreateeligibleBatchesInput | number[]
    deadline: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobCreateOrConnectWithoutApplicationsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
  }

  export type StudentProfileCreateWithoutApplicationsInput = {
    id?: string
    enrollmentNumber: string
    branch: string
    batchYear: number
    cgpa: number
    tenthMarks?: number | null
    twelfthMarks?: number | null
    resumeUrl?: string | null
    skills?: StudentProfileCreateskillsInput | string[]
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentProfileUncheckedCreateWithoutApplicationsInput = {
    id?: string
    userId: string
    enrollmentNumber: string
    branch: string
    batchYear: number
    cgpa: number
    tenthMarks?: number | null
    twelfthMarks?: number | null
    resumeUrl?: string | null
    skills?: StudentProfileCreateskillsInput | string[]
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentProfileCreateOrConnectWithoutApplicationsInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutApplicationsInput, StudentProfileUncheckedCreateWithoutApplicationsInput>
  }

  export type JobUpsertWithoutApplicationsInput = {
    update: XOR<JobUpdateWithoutApplicationsInput, JobUncheckedUpdateWithoutApplicationsInput>
    create: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutApplicationsInput, JobUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    location?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    minCgpa?: FloatFieldUpdateOperationsInput | number
    allowedBranches?: JobUpdateallowedBranchesInput | string[]
    eligibleBatches?: JobUpdateeligibleBatchesInput | number[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
  }

  export type JobUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    location?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    minCgpa?: FloatFieldUpdateOperationsInput | number
    allowedBranches?: JobUpdateallowedBranchesInput | string[]
    eligibleBatches?: JobUpdateeligibleBatchesInput | number[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentProfileUpsertWithoutApplicationsInput = {
    update: XOR<StudentProfileUpdateWithoutApplicationsInput, StudentProfileUncheckedUpdateWithoutApplicationsInput>
    create: XOR<StudentProfileCreateWithoutApplicationsInput, StudentProfileUncheckedCreateWithoutApplicationsInput>
    where?: StudentProfileWhereInput
  }

  export type StudentProfileUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: StudentProfileWhereInput
    data: XOR<StudentProfileUpdateWithoutApplicationsInput, StudentProfileUncheckedUpdateWithoutApplicationsInput>
  }

  export type StudentProfileUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    enrollmentNumber?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    batchYear?: IntFieldUpdateOperationsInput | number
    cgpa?: FloatFieldUpdateOperationsInput | number
    tenthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    twelfthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StudentProfileUpdateskillsInput | string[]
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    enrollmentNumber?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    batchYear?: IntFieldUpdateOperationsInput | number
    cgpa?: FloatFieldUpdateOperationsInput | number
    tenthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    twelfthMarks?: NullableFloatFieldUpdateOperationsInput | number | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StudentProfileUpdateskillsInput | string[]
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyStudentInput = {
    id?: string
    jobId: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileCreateManyCompanyInput = {
    id?: string
    userId: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobCreateManyCompanyInput = {
    id?: string
    title: string
    description: string
    type?: $Enums.JobType
    status?: $Enums.JobStatus
    location: string
    salaryPackage: string
    minCgpa?: number
    allowedBranches?: JobCreateallowedBranchesInput | string[]
    eligibleBatches?: JobCreateeligibleBatchesInput | number[]
    deadline: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecruiterProfileUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRecruiterNestedInput
  }

  export type RecruiterProfileUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecruiterProfileUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    location?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    minCgpa?: FloatFieldUpdateOperationsInput | number
    allowedBranches?: JobUpdateallowedBranchesInput | string[]
    eligibleBatches?: JobUpdateeligibleBatchesInput | number[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    location?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    minCgpa?: FloatFieldUpdateOperationsInput | number
    allowedBranches?: JobUpdateallowedBranchesInput | string[]
    eligibleBatches?: JobUpdateeligibleBatchesInput | number[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    location?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    minCgpa?: FloatFieldUpdateOperationsInput | number
    allowedBranches?: JobUpdateallowedBranchesInput | string[]
    eligibleBatches?: JobUpdateeligibleBatchesInput | number[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyJobInput = {
    id?: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentProfileUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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