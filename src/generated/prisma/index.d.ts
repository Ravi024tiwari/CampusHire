
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
 * Model College
 * 
 */
export type College = $Result.DefaultSelection<Prisma.$CollegePayload>
/**
 * Model TpoProfile
 * 
 */
export type TpoProfile = $Result.DefaultSelection<Prisma.$TpoProfilePayload>
/**
 * Model StudentProfile
 * 
 */
export type StudentProfile = $Result.DefaultSelection<Prisma.$StudentProfilePayload>
/**
 * Model StudentResume
 * 
 */
export type StudentResume = $Result.DefaultSelection<Prisma.$StudentResumePayload>
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
 * Model Offer
 * 
 */
export type Offer = $Result.DefaultSelection<Prisma.$OfferPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  TPO_ADMIN: 'TPO_ADMIN',
  RECRUITER: 'RECRUITER',
  STUDENT: 'STUDENT'
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


export const OfferStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED'
};

export type OfferStatus = (typeof OfferStatus)[keyof typeof OfferStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type JobType = $Enums.JobType

export const JobType: typeof $Enums.JobType

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

export type OfferStatus = $Enums.OfferStatus

export const OfferStatus: typeof $Enums.OfferStatus

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
   * `prisma.college`: Exposes CRUD operations for the **College** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Colleges
    * const colleges = await prisma.college.findMany()
    * ```
    */
  get college(): Prisma.CollegeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tpoProfile`: Exposes CRUD operations for the **TpoProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TpoProfiles
    * const tpoProfiles = await prisma.tpoProfile.findMany()
    * ```
    */
  get tpoProfile(): Prisma.TpoProfileDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.studentResume`: Exposes CRUD operations for the **StudentResume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentResumes
    * const studentResumes = await prisma.studentResume.findMany()
    * ```
    */
  get studentResume(): Prisma.StudentResumeDelegate<ExtArgs, ClientOptions>;

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

  /**
   * `prisma.offer`: Exposes CRUD operations for the **Offer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Offers
    * const offers = await prisma.offer.findMany()
    * ```
    */
  get offer(): Prisma.OfferDelegate<ExtArgs, ClientOptions>;
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
    College: 'College',
    TpoProfile: 'TpoProfile',
    StudentProfile: 'StudentProfile',
    StudentResume: 'StudentResume',
    Company: 'Company',
    RecruiterProfile: 'RecruiterProfile',
    Job: 'Job',
    Application: 'Application',
    Offer: 'Offer'
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
      modelProps: "user" | "college" | "tpoProfile" | "studentProfile" | "studentResume" | "company" | "recruiterProfile" | "job" | "application" | "offer"
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
      College: {
        payload: Prisma.$CollegePayload<ExtArgs>
        fields: Prisma.CollegeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CollegeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CollegeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          findFirst: {
            args: Prisma.CollegeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CollegeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          findMany: {
            args: Prisma.CollegeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>[]
          }
          create: {
            args: Prisma.CollegeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          createMany: {
            args: Prisma.CollegeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CollegeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>[]
          }
          delete: {
            args: Prisma.CollegeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          update: {
            args: Prisma.CollegeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          deleteMany: {
            args: Prisma.CollegeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CollegeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CollegeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>[]
          }
          upsert: {
            args: Prisma.CollegeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollegePayload>
          }
          aggregate: {
            args: Prisma.CollegeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollege>
          }
          groupBy: {
            args: Prisma.CollegeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollegeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CollegeCountArgs<ExtArgs>
            result: $Utils.Optional<CollegeCountAggregateOutputType> | number
          }
        }
      }
      TpoProfile: {
        payload: Prisma.$TpoProfilePayload<ExtArgs>
        fields: Prisma.TpoProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TpoProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TpoProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload>
          }
          findFirst: {
            args: Prisma.TpoProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TpoProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload>
          }
          findMany: {
            args: Prisma.TpoProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload>[]
          }
          create: {
            args: Prisma.TpoProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload>
          }
          createMany: {
            args: Prisma.TpoProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TpoProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload>[]
          }
          delete: {
            args: Prisma.TpoProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload>
          }
          update: {
            args: Prisma.TpoProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload>
          }
          deleteMany: {
            args: Prisma.TpoProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TpoProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TpoProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload>[]
          }
          upsert: {
            args: Prisma.TpoProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TpoProfilePayload>
          }
          aggregate: {
            args: Prisma.TpoProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTpoProfile>
          }
          groupBy: {
            args: Prisma.TpoProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<TpoProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.TpoProfileCountArgs<ExtArgs>
            result: $Utils.Optional<TpoProfileCountAggregateOutputType> | number
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
      StudentResume: {
        payload: Prisma.$StudentResumePayload<ExtArgs>
        fields: Prisma.StudentResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload>
          }
          findFirst: {
            args: Prisma.StudentResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload>
          }
          findMany: {
            args: Prisma.StudentResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload>[]
          }
          create: {
            args: Prisma.StudentResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload>
          }
          createMany: {
            args: Prisma.StudentResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload>[]
          }
          delete: {
            args: Prisma.StudentResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload>
          }
          update: {
            args: Prisma.StudentResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload>
          }
          deleteMany: {
            args: Prisma.StudentResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentResumeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload>[]
          }
          upsert: {
            args: Prisma.StudentResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentResumePayload>
          }
          aggregate: {
            args: Prisma.StudentResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentResume>
          }
          groupBy: {
            args: Prisma.StudentResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentResumeCountArgs<ExtArgs>
            result: $Utils.Optional<StudentResumeCountAggregateOutputType> | number
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
      Offer: {
        payload: Prisma.$OfferPayload<ExtArgs>
        fields: Prisma.OfferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          findFirst: {
            args: Prisma.OfferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          findMany: {
            args: Prisma.OfferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>[]
          }
          create: {
            args: Prisma.OfferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          createMany: {
            args: Prisma.OfferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfferCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>[]
          }
          delete: {
            args: Prisma.OfferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          update: {
            args: Prisma.OfferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          deleteMany: {
            args: Prisma.OfferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OfferUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>[]
          }
          upsert: {
            args: Prisma.OfferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          aggregate: {
            args: Prisma.OfferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOffer>
          }
          groupBy: {
            args: Prisma.OfferGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfferGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfferCountArgs<ExtArgs>
            result: $Utils.Optional<OfferCountAggregateOutputType> | number
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
    college?: CollegeOmit
    tpoProfile?: TpoProfileOmit
    studentProfile?: StudentProfileOmit
    studentResume?: StudentResumeOmit
    company?: CompanyOmit
    recruiterProfile?: RecruiterProfileOmit
    job?: JobOmit
    application?: ApplicationOmit
    offer?: OfferOmit
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
   * Count Type CollegeCountOutputType
   */

  export type CollegeCountOutputType = {
    tpos: number
    students: number
    jobs: number
    offers: number
  }

  export type CollegeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tpos?: boolean | CollegeCountOutputTypeCountTposArgs
    students?: boolean | CollegeCountOutputTypeCountStudentsArgs
    jobs?: boolean | CollegeCountOutputTypeCountJobsArgs
    offers?: boolean | CollegeCountOutputTypeCountOffersArgs
  }

  // Custom InputTypes
  /**
   * CollegeCountOutputType without action
   */
  export type CollegeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollegeCountOutputType
     */
    select?: CollegeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CollegeCountOutputType without action
   */
  export type CollegeCountOutputTypeCountTposArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TpoProfileWhereInput
  }

  /**
   * CollegeCountOutputType without action
   */
  export type CollegeCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentProfileWhereInput
  }

  /**
   * CollegeCountOutputType without action
   */
  export type CollegeCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * CollegeCountOutputType without action
   */
  export type CollegeCountOutputTypeCountOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
  }


  /**
   * Count Type StudentProfileCountOutputType
   */

  export type StudentProfileCountOutputType = {
    resumes: number
    applications: number
    offers: number
  }

  export type StudentProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resumes?: boolean | StudentProfileCountOutputTypeCountResumesArgs
    applications?: boolean | StudentProfileCountOutputTypeCountApplicationsArgs
    offers?: boolean | StudentProfileCountOutputTypeCountOffersArgs
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
  export type StudentProfileCountOutputTypeCountResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentResumeWhereInput
  }

  /**
   * StudentProfileCountOutputType without action
   */
  export type StudentProfileCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }

  /**
   * StudentProfileCountOutputType without action
   */
  export type StudentProfileCountOutputTypeCountOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
  }


  /**
   * Count Type StudentResumeCountOutputType
   */

  export type StudentResumeCountOutputType = {
    applications: number
  }

  export type StudentResumeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | StudentResumeCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * StudentResumeCountOutputType without action
   */
  export type StudentResumeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResumeCountOutputType
     */
    select?: StudentResumeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentResumeCountOutputType without action
   */
  export type StudentResumeCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    recruiters: number
    jobs: number
    offers: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiters?: boolean | CompanyCountOutputTypeCountRecruitersArgs
    jobs?: boolean | CompanyCountOutputTypeCountJobsArgs
    offers?: boolean | CompanyCountOutputTypeCountOffersArgs
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
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
  }


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    applications: number
    offers: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobCountOutputTypeCountApplicationsArgs
    offers?: boolean | JobCountOutputTypeCountOffersArgs
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
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
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
    tpo?: boolean | User$tpoArgs<ExtArgs>
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
    tpo?: boolean | User$tpoArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      student: Prisma.$StudentProfilePayload<ExtArgs> | null
      recruiter: Prisma.$RecruiterProfilePayload<ExtArgs> | null
      tpo: Prisma.$TpoProfilePayload<ExtArgs> | null
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
    tpo<T extends User$tpoArgs<ExtArgs> = {}>(args?: Subset<T, User$tpoArgs<ExtArgs>>): Prisma__TpoProfileClient<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * User.tpo
   */
  export type User$tpoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    where?: TpoProfileWhereInput
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
   * Model College
   */

  export type AggregateCollege = {
    _count: CollegeCountAggregateOutputType | null
    _min: CollegeMinAggregateOutputType | null
    _max: CollegeMaxAggregateOutputType | null
  }

  export type CollegeMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    domain: string | null
    city: string | null
    state: string | null
    logoUrl: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CollegeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    domain: string | null
    city: string | null
    state: string | null
    logoUrl: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CollegeCountAggregateOutputType = {
    id: number
    name: number
    code: number
    domain: number
    city: number
    state: number
    logoUrl: number
    images: number
    isVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CollegeMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    domain?: true
    city?: true
    state?: true
    logoUrl?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CollegeMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    domain?: true
    city?: true
    state?: true
    logoUrl?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CollegeCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    domain?: true
    city?: true
    state?: true
    logoUrl?: true
    images?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CollegeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which College to aggregate.
     */
    where?: CollegeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colleges to fetch.
     */
    orderBy?: CollegeOrderByWithRelationInput | CollegeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CollegeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colleges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colleges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Colleges
    **/
    _count?: true | CollegeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollegeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollegeMaxAggregateInputType
  }

  export type GetCollegeAggregateType<T extends CollegeAggregateArgs> = {
        [P in keyof T & keyof AggregateCollege]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollege[P]>
      : GetScalarType<T[P], AggregateCollege[P]>
  }




  export type CollegeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollegeWhereInput
    orderBy?: CollegeOrderByWithAggregationInput | CollegeOrderByWithAggregationInput[]
    by: CollegeScalarFieldEnum[] | CollegeScalarFieldEnum
    having?: CollegeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollegeCountAggregateInputType | true
    _min?: CollegeMinAggregateInputType
    _max?: CollegeMaxAggregateInputType
  }

  export type CollegeGroupByOutputType = {
    id: string
    name: string
    code: string | null
    domain: string | null
    city: string | null
    state: string | null
    logoUrl: string | null
    images: string[]
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: CollegeCountAggregateOutputType | null
    _min: CollegeMinAggregateOutputType | null
    _max: CollegeMaxAggregateOutputType | null
  }

  type GetCollegeGroupByPayload<T extends CollegeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollegeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollegeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollegeGroupByOutputType[P]>
            : GetScalarType<T[P], CollegeGroupByOutputType[P]>
        }
      >
    >


  export type CollegeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    domain?: boolean
    city?: boolean
    state?: boolean
    logoUrl?: boolean
    images?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tpos?: boolean | College$tposArgs<ExtArgs>
    students?: boolean | College$studentsArgs<ExtArgs>
    jobs?: boolean | College$jobsArgs<ExtArgs>
    offers?: boolean | College$offersArgs<ExtArgs>
    _count?: boolean | CollegeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["college"]>

  export type CollegeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    domain?: boolean
    city?: boolean
    state?: boolean
    logoUrl?: boolean
    images?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["college"]>

  export type CollegeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    domain?: boolean
    city?: boolean
    state?: boolean
    logoUrl?: boolean
    images?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["college"]>

  export type CollegeSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    domain?: boolean
    city?: boolean
    state?: boolean
    logoUrl?: boolean
    images?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CollegeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "domain" | "city" | "state" | "logoUrl" | "images" | "isVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["college"]>
  export type CollegeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tpos?: boolean | College$tposArgs<ExtArgs>
    students?: boolean | College$studentsArgs<ExtArgs>
    jobs?: boolean | College$jobsArgs<ExtArgs>
    offers?: boolean | College$offersArgs<ExtArgs>
    _count?: boolean | CollegeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CollegeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CollegeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CollegePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "College"
    objects: {
      tpos: Prisma.$TpoProfilePayload<ExtArgs>[]
      students: Prisma.$StudentProfilePayload<ExtArgs>[]
      jobs: Prisma.$JobPayload<ExtArgs>[]
      offers: Prisma.$OfferPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string | null
      domain: string | null
      city: string | null
      state: string | null
      logoUrl: string | null
      images: string[]
      isVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["college"]>
    composites: {}
  }

  type CollegeGetPayload<S extends boolean | null | undefined | CollegeDefaultArgs> = $Result.GetResult<Prisma.$CollegePayload, S>

  type CollegeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CollegeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollegeCountAggregateInputType | true
    }

  export interface CollegeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['College'], meta: { name: 'College' } }
    /**
     * Find zero or one College that matches the filter.
     * @param {CollegeFindUniqueArgs} args - Arguments to find a College
     * @example
     * // Get one College
     * const college = await prisma.college.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CollegeFindUniqueArgs>(args: SelectSubset<T, CollegeFindUniqueArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one College that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CollegeFindUniqueOrThrowArgs} args - Arguments to find a College
     * @example
     * // Get one College
     * const college = await prisma.college.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CollegeFindUniqueOrThrowArgs>(args: SelectSubset<T, CollegeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first College that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeFindFirstArgs} args - Arguments to find a College
     * @example
     * // Get one College
     * const college = await prisma.college.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CollegeFindFirstArgs>(args?: SelectSubset<T, CollegeFindFirstArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first College that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeFindFirstOrThrowArgs} args - Arguments to find a College
     * @example
     * // Get one College
     * const college = await prisma.college.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CollegeFindFirstOrThrowArgs>(args?: SelectSubset<T, CollegeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Colleges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Colleges
     * const colleges = await prisma.college.findMany()
     * 
     * // Get first 10 Colleges
     * const colleges = await prisma.college.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const collegeWithIdOnly = await prisma.college.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CollegeFindManyArgs>(args?: SelectSubset<T, CollegeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a College.
     * @param {CollegeCreateArgs} args - Arguments to create a College.
     * @example
     * // Create one College
     * const College = await prisma.college.create({
     *   data: {
     *     // ... data to create a College
     *   }
     * })
     * 
     */
    create<T extends CollegeCreateArgs>(args: SelectSubset<T, CollegeCreateArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Colleges.
     * @param {CollegeCreateManyArgs} args - Arguments to create many Colleges.
     * @example
     * // Create many Colleges
     * const college = await prisma.college.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CollegeCreateManyArgs>(args?: SelectSubset<T, CollegeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Colleges and returns the data saved in the database.
     * @param {CollegeCreateManyAndReturnArgs} args - Arguments to create many Colleges.
     * @example
     * // Create many Colleges
     * const college = await prisma.college.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Colleges and only return the `id`
     * const collegeWithIdOnly = await prisma.college.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CollegeCreateManyAndReturnArgs>(args?: SelectSubset<T, CollegeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a College.
     * @param {CollegeDeleteArgs} args - Arguments to delete one College.
     * @example
     * // Delete one College
     * const College = await prisma.college.delete({
     *   where: {
     *     // ... filter to delete one College
     *   }
     * })
     * 
     */
    delete<T extends CollegeDeleteArgs>(args: SelectSubset<T, CollegeDeleteArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one College.
     * @param {CollegeUpdateArgs} args - Arguments to update one College.
     * @example
     * // Update one College
     * const college = await prisma.college.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CollegeUpdateArgs>(args: SelectSubset<T, CollegeUpdateArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Colleges.
     * @param {CollegeDeleteManyArgs} args - Arguments to filter Colleges to delete.
     * @example
     * // Delete a few Colleges
     * const { count } = await prisma.college.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CollegeDeleteManyArgs>(args?: SelectSubset<T, CollegeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colleges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Colleges
     * const college = await prisma.college.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CollegeUpdateManyArgs>(args: SelectSubset<T, CollegeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colleges and returns the data updated in the database.
     * @param {CollegeUpdateManyAndReturnArgs} args - Arguments to update many Colleges.
     * @example
     * // Update many Colleges
     * const college = await prisma.college.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Colleges and only return the `id`
     * const collegeWithIdOnly = await prisma.college.updateManyAndReturn({
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
    updateManyAndReturn<T extends CollegeUpdateManyAndReturnArgs>(args: SelectSubset<T, CollegeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one College.
     * @param {CollegeUpsertArgs} args - Arguments to update or create a College.
     * @example
     * // Update or create a College
     * const college = await prisma.college.upsert({
     *   create: {
     *     // ... data to create a College
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the College we want to update
     *   }
     * })
     */
    upsert<T extends CollegeUpsertArgs>(args: SelectSubset<T, CollegeUpsertArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Colleges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeCountArgs} args - Arguments to filter Colleges to count.
     * @example
     * // Count the number of Colleges
     * const count = await prisma.college.count({
     *   where: {
     *     // ... the filter for the Colleges we want to count
     *   }
     * })
    **/
    count<T extends CollegeCountArgs>(
      args?: Subset<T, CollegeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollegeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a College.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CollegeAggregateArgs>(args: Subset<T, CollegeAggregateArgs>): Prisma.PrismaPromise<GetCollegeAggregateType<T>>

    /**
     * Group by College.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollegeGroupByArgs} args - Group by arguments.
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
      T extends CollegeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CollegeGroupByArgs['orderBy'] }
        : { orderBy?: CollegeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CollegeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollegeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the College model
   */
  readonly fields: CollegeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for College.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CollegeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tpos<T extends College$tposArgs<ExtArgs> = {}>(args?: Subset<T, College$tposArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    students<T extends College$studentsArgs<ExtArgs> = {}>(args?: Subset<T, College$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobs<T extends College$jobsArgs<ExtArgs> = {}>(args?: Subset<T, College$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    offers<T extends College$offersArgs<ExtArgs> = {}>(args?: Subset<T, College$offersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the College model
   */
  interface CollegeFieldRefs {
    readonly id: FieldRef<"College", 'String'>
    readonly name: FieldRef<"College", 'String'>
    readonly code: FieldRef<"College", 'String'>
    readonly domain: FieldRef<"College", 'String'>
    readonly city: FieldRef<"College", 'String'>
    readonly state: FieldRef<"College", 'String'>
    readonly logoUrl: FieldRef<"College", 'String'>
    readonly images: FieldRef<"College", 'String[]'>
    readonly isVerified: FieldRef<"College", 'Boolean'>
    readonly createdAt: FieldRef<"College", 'DateTime'>
    readonly updatedAt: FieldRef<"College", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * College findUnique
   */
  export type CollegeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter, which College to fetch.
     */
    where: CollegeWhereUniqueInput
  }

  /**
   * College findUniqueOrThrow
   */
  export type CollegeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter, which College to fetch.
     */
    where: CollegeWhereUniqueInput
  }

  /**
   * College findFirst
   */
  export type CollegeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter, which College to fetch.
     */
    where?: CollegeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colleges to fetch.
     */
    orderBy?: CollegeOrderByWithRelationInput | CollegeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colleges.
     */
    cursor?: CollegeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colleges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colleges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colleges.
     */
    distinct?: CollegeScalarFieldEnum | CollegeScalarFieldEnum[]
  }

  /**
   * College findFirstOrThrow
   */
  export type CollegeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter, which College to fetch.
     */
    where?: CollegeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colleges to fetch.
     */
    orderBy?: CollegeOrderByWithRelationInput | CollegeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colleges.
     */
    cursor?: CollegeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colleges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colleges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colleges.
     */
    distinct?: CollegeScalarFieldEnum | CollegeScalarFieldEnum[]
  }

  /**
   * College findMany
   */
  export type CollegeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter, which Colleges to fetch.
     */
    where?: CollegeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colleges to fetch.
     */
    orderBy?: CollegeOrderByWithRelationInput | CollegeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Colleges.
     */
    cursor?: CollegeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colleges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colleges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colleges.
     */
    distinct?: CollegeScalarFieldEnum | CollegeScalarFieldEnum[]
  }

  /**
   * College create
   */
  export type CollegeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * The data needed to create a College.
     */
    data: XOR<CollegeCreateInput, CollegeUncheckedCreateInput>
  }

  /**
   * College createMany
   */
  export type CollegeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Colleges.
     */
    data: CollegeCreateManyInput | CollegeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * College createManyAndReturn
   */
  export type CollegeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * The data used to create many Colleges.
     */
    data: CollegeCreateManyInput | CollegeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * College update
   */
  export type CollegeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * The data needed to update a College.
     */
    data: XOR<CollegeUpdateInput, CollegeUncheckedUpdateInput>
    /**
     * Choose, which College to update.
     */
    where: CollegeWhereUniqueInput
  }

  /**
   * College updateMany
   */
  export type CollegeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Colleges.
     */
    data: XOR<CollegeUpdateManyMutationInput, CollegeUncheckedUpdateManyInput>
    /**
     * Filter which Colleges to update
     */
    where?: CollegeWhereInput
    /**
     * Limit how many Colleges to update.
     */
    limit?: number
  }

  /**
   * College updateManyAndReturn
   */
  export type CollegeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * The data used to update Colleges.
     */
    data: XOR<CollegeUpdateManyMutationInput, CollegeUncheckedUpdateManyInput>
    /**
     * Filter which Colleges to update
     */
    where?: CollegeWhereInput
    /**
     * Limit how many Colleges to update.
     */
    limit?: number
  }

  /**
   * College upsert
   */
  export type CollegeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * The filter to search for the College to update in case it exists.
     */
    where: CollegeWhereUniqueInput
    /**
     * In case the College found by the `where` argument doesn't exist, create a new College with this data.
     */
    create: XOR<CollegeCreateInput, CollegeUncheckedCreateInput>
    /**
     * In case the College was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CollegeUpdateInput, CollegeUncheckedUpdateInput>
  }

  /**
   * College delete
   */
  export type CollegeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
    /**
     * Filter which College to delete.
     */
    where: CollegeWhereUniqueInput
  }

  /**
   * College deleteMany
   */
  export type CollegeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colleges to delete
     */
    where?: CollegeWhereInput
    /**
     * Limit how many Colleges to delete.
     */
    limit?: number
  }

  /**
   * College.tpos
   */
  export type College$tposArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    where?: TpoProfileWhereInput
    orderBy?: TpoProfileOrderByWithRelationInput | TpoProfileOrderByWithRelationInput[]
    cursor?: TpoProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TpoProfileScalarFieldEnum | TpoProfileScalarFieldEnum[]
  }

  /**
   * College.students
   */
  export type College$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    orderBy?: StudentProfileOrderByWithRelationInput | StudentProfileOrderByWithRelationInput[]
    cursor?: StudentProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentProfileScalarFieldEnum | StudentProfileScalarFieldEnum[]
  }

  /**
   * College.jobs
   */
  export type College$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * College.offers
   */
  export type College$offersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    cursor?: OfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * College without action
   */
  export type CollegeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the College
     */
    select?: CollegeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the College
     */
    omit?: CollegeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollegeInclude<ExtArgs> | null
  }


  /**
   * Model TpoProfile
   */

  export type AggregateTpoProfile = {
    _count: TpoProfileCountAggregateOutputType | null
    _min: TpoProfileMinAggregateOutputType | null
    _max: TpoProfileMaxAggregateOutputType | null
  }

  export type TpoProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    collegeId: string | null
    designation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TpoProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    collegeId: string | null
    designation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TpoProfileCountAggregateOutputType = {
    id: number
    userId: number
    collegeId: number
    designation: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TpoProfileMinAggregateInputType = {
    id?: true
    userId?: true
    collegeId?: true
    designation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TpoProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    collegeId?: true
    designation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TpoProfileCountAggregateInputType = {
    id?: true
    userId?: true
    collegeId?: true
    designation?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TpoProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TpoProfile to aggregate.
     */
    where?: TpoProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TpoProfiles to fetch.
     */
    orderBy?: TpoProfileOrderByWithRelationInput | TpoProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TpoProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TpoProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TpoProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TpoProfiles
    **/
    _count?: true | TpoProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TpoProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TpoProfileMaxAggregateInputType
  }

  export type GetTpoProfileAggregateType<T extends TpoProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateTpoProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTpoProfile[P]>
      : GetScalarType<T[P], AggregateTpoProfile[P]>
  }




  export type TpoProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TpoProfileWhereInput
    orderBy?: TpoProfileOrderByWithAggregationInput | TpoProfileOrderByWithAggregationInput[]
    by: TpoProfileScalarFieldEnum[] | TpoProfileScalarFieldEnum
    having?: TpoProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TpoProfileCountAggregateInputType | true
    _min?: TpoProfileMinAggregateInputType
    _max?: TpoProfileMaxAggregateInputType
  }

  export type TpoProfileGroupByOutputType = {
    id: string
    userId: string
    collegeId: string
    designation: string | null
    createdAt: Date
    updatedAt: Date
    _count: TpoProfileCountAggregateOutputType | null
    _min: TpoProfileMinAggregateOutputType | null
    _max: TpoProfileMaxAggregateOutputType | null
  }

  type GetTpoProfileGroupByPayload<T extends TpoProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TpoProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TpoProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TpoProfileGroupByOutputType[P]>
            : GetScalarType<T[P], TpoProfileGroupByOutputType[P]>
        }
      >
    >


  export type TpoProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    collegeId?: boolean
    designation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tpoProfile"]>

  export type TpoProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    collegeId?: boolean
    designation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tpoProfile"]>

  export type TpoProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    collegeId?: boolean
    designation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tpoProfile"]>

  export type TpoProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    collegeId?: boolean
    designation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TpoProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "collegeId" | "designation" | "createdAt" | "updatedAt", ExtArgs["result"]["tpoProfile"]>
  export type TpoProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }
  export type TpoProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }
  export type TpoProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }

  export type $TpoProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TpoProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      college: Prisma.$CollegePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      collegeId: string
      designation: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tpoProfile"]>
    composites: {}
  }

  type TpoProfileGetPayload<S extends boolean | null | undefined | TpoProfileDefaultArgs> = $Result.GetResult<Prisma.$TpoProfilePayload, S>

  type TpoProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TpoProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TpoProfileCountAggregateInputType | true
    }

  export interface TpoProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TpoProfile'], meta: { name: 'TpoProfile' } }
    /**
     * Find zero or one TpoProfile that matches the filter.
     * @param {TpoProfileFindUniqueArgs} args - Arguments to find a TpoProfile
     * @example
     * // Get one TpoProfile
     * const tpoProfile = await prisma.tpoProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TpoProfileFindUniqueArgs>(args: SelectSubset<T, TpoProfileFindUniqueArgs<ExtArgs>>): Prisma__TpoProfileClient<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TpoProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TpoProfileFindUniqueOrThrowArgs} args - Arguments to find a TpoProfile
     * @example
     * // Get one TpoProfile
     * const tpoProfile = await prisma.tpoProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TpoProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, TpoProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TpoProfileClient<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TpoProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TpoProfileFindFirstArgs} args - Arguments to find a TpoProfile
     * @example
     * // Get one TpoProfile
     * const tpoProfile = await prisma.tpoProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TpoProfileFindFirstArgs>(args?: SelectSubset<T, TpoProfileFindFirstArgs<ExtArgs>>): Prisma__TpoProfileClient<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TpoProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TpoProfileFindFirstOrThrowArgs} args - Arguments to find a TpoProfile
     * @example
     * // Get one TpoProfile
     * const tpoProfile = await prisma.tpoProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TpoProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, TpoProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__TpoProfileClient<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TpoProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TpoProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TpoProfiles
     * const tpoProfiles = await prisma.tpoProfile.findMany()
     * 
     * // Get first 10 TpoProfiles
     * const tpoProfiles = await prisma.tpoProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tpoProfileWithIdOnly = await prisma.tpoProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TpoProfileFindManyArgs>(args?: SelectSubset<T, TpoProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TpoProfile.
     * @param {TpoProfileCreateArgs} args - Arguments to create a TpoProfile.
     * @example
     * // Create one TpoProfile
     * const TpoProfile = await prisma.tpoProfile.create({
     *   data: {
     *     // ... data to create a TpoProfile
     *   }
     * })
     * 
     */
    create<T extends TpoProfileCreateArgs>(args: SelectSubset<T, TpoProfileCreateArgs<ExtArgs>>): Prisma__TpoProfileClient<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TpoProfiles.
     * @param {TpoProfileCreateManyArgs} args - Arguments to create many TpoProfiles.
     * @example
     * // Create many TpoProfiles
     * const tpoProfile = await prisma.tpoProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TpoProfileCreateManyArgs>(args?: SelectSubset<T, TpoProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TpoProfiles and returns the data saved in the database.
     * @param {TpoProfileCreateManyAndReturnArgs} args - Arguments to create many TpoProfiles.
     * @example
     * // Create many TpoProfiles
     * const tpoProfile = await prisma.tpoProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TpoProfiles and only return the `id`
     * const tpoProfileWithIdOnly = await prisma.tpoProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TpoProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, TpoProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TpoProfile.
     * @param {TpoProfileDeleteArgs} args - Arguments to delete one TpoProfile.
     * @example
     * // Delete one TpoProfile
     * const TpoProfile = await prisma.tpoProfile.delete({
     *   where: {
     *     // ... filter to delete one TpoProfile
     *   }
     * })
     * 
     */
    delete<T extends TpoProfileDeleteArgs>(args: SelectSubset<T, TpoProfileDeleteArgs<ExtArgs>>): Prisma__TpoProfileClient<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TpoProfile.
     * @param {TpoProfileUpdateArgs} args - Arguments to update one TpoProfile.
     * @example
     * // Update one TpoProfile
     * const tpoProfile = await prisma.tpoProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TpoProfileUpdateArgs>(args: SelectSubset<T, TpoProfileUpdateArgs<ExtArgs>>): Prisma__TpoProfileClient<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TpoProfiles.
     * @param {TpoProfileDeleteManyArgs} args - Arguments to filter TpoProfiles to delete.
     * @example
     * // Delete a few TpoProfiles
     * const { count } = await prisma.tpoProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TpoProfileDeleteManyArgs>(args?: SelectSubset<T, TpoProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TpoProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TpoProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TpoProfiles
     * const tpoProfile = await prisma.tpoProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TpoProfileUpdateManyArgs>(args: SelectSubset<T, TpoProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TpoProfiles and returns the data updated in the database.
     * @param {TpoProfileUpdateManyAndReturnArgs} args - Arguments to update many TpoProfiles.
     * @example
     * // Update many TpoProfiles
     * const tpoProfile = await prisma.tpoProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TpoProfiles and only return the `id`
     * const tpoProfileWithIdOnly = await prisma.tpoProfile.updateManyAndReturn({
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
    updateManyAndReturn<T extends TpoProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, TpoProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TpoProfile.
     * @param {TpoProfileUpsertArgs} args - Arguments to update or create a TpoProfile.
     * @example
     * // Update or create a TpoProfile
     * const tpoProfile = await prisma.tpoProfile.upsert({
     *   create: {
     *     // ... data to create a TpoProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TpoProfile we want to update
     *   }
     * })
     */
    upsert<T extends TpoProfileUpsertArgs>(args: SelectSubset<T, TpoProfileUpsertArgs<ExtArgs>>): Prisma__TpoProfileClient<$Result.GetResult<Prisma.$TpoProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TpoProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TpoProfileCountArgs} args - Arguments to filter TpoProfiles to count.
     * @example
     * // Count the number of TpoProfiles
     * const count = await prisma.tpoProfile.count({
     *   where: {
     *     // ... the filter for the TpoProfiles we want to count
     *   }
     * })
    **/
    count<T extends TpoProfileCountArgs>(
      args?: Subset<T, TpoProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TpoProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TpoProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TpoProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TpoProfileAggregateArgs>(args: Subset<T, TpoProfileAggregateArgs>): Prisma.PrismaPromise<GetTpoProfileAggregateType<T>>

    /**
     * Group by TpoProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TpoProfileGroupByArgs} args - Group by arguments.
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
      T extends TpoProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TpoProfileGroupByArgs['orderBy'] }
        : { orderBy?: TpoProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TpoProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTpoProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TpoProfile model
   */
  readonly fields: TpoProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TpoProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TpoProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    college<T extends CollegeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollegeDefaultArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TpoProfile model
   */
  interface TpoProfileFieldRefs {
    readonly id: FieldRef<"TpoProfile", 'String'>
    readonly userId: FieldRef<"TpoProfile", 'String'>
    readonly collegeId: FieldRef<"TpoProfile", 'String'>
    readonly designation: FieldRef<"TpoProfile", 'String'>
    readonly createdAt: FieldRef<"TpoProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"TpoProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TpoProfile findUnique
   */
  export type TpoProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    /**
     * Filter, which TpoProfile to fetch.
     */
    where: TpoProfileWhereUniqueInput
  }

  /**
   * TpoProfile findUniqueOrThrow
   */
  export type TpoProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    /**
     * Filter, which TpoProfile to fetch.
     */
    where: TpoProfileWhereUniqueInput
  }

  /**
   * TpoProfile findFirst
   */
  export type TpoProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    /**
     * Filter, which TpoProfile to fetch.
     */
    where?: TpoProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TpoProfiles to fetch.
     */
    orderBy?: TpoProfileOrderByWithRelationInput | TpoProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TpoProfiles.
     */
    cursor?: TpoProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TpoProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TpoProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TpoProfiles.
     */
    distinct?: TpoProfileScalarFieldEnum | TpoProfileScalarFieldEnum[]
  }

  /**
   * TpoProfile findFirstOrThrow
   */
  export type TpoProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    /**
     * Filter, which TpoProfile to fetch.
     */
    where?: TpoProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TpoProfiles to fetch.
     */
    orderBy?: TpoProfileOrderByWithRelationInput | TpoProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TpoProfiles.
     */
    cursor?: TpoProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TpoProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TpoProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TpoProfiles.
     */
    distinct?: TpoProfileScalarFieldEnum | TpoProfileScalarFieldEnum[]
  }

  /**
   * TpoProfile findMany
   */
  export type TpoProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    /**
     * Filter, which TpoProfiles to fetch.
     */
    where?: TpoProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TpoProfiles to fetch.
     */
    orderBy?: TpoProfileOrderByWithRelationInput | TpoProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TpoProfiles.
     */
    cursor?: TpoProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TpoProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TpoProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TpoProfiles.
     */
    distinct?: TpoProfileScalarFieldEnum | TpoProfileScalarFieldEnum[]
  }

  /**
   * TpoProfile create
   */
  export type TpoProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a TpoProfile.
     */
    data: XOR<TpoProfileCreateInput, TpoProfileUncheckedCreateInput>
  }

  /**
   * TpoProfile createMany
   */
  export type TpoProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TpoProfiles.
     */
    data: TpoProfileCreateManyInput | TpoProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TpoProfile createManyAndReturn
   */
  export type TpoProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * The data used to create many TpoProfiles.
     */
    data: TpoProfileCreateManyInput | TpoProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TpoProfile update
   */
  export type TpoProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a TpoProfile.
     */
    data: XOR<TpoProfileUpdateInput, TpoProfileUncheckedUpdateInput>
    /**
     * Choose, which TpoProfile to update.
     */
    where: TpoProfileWhereUniqueInput
  }

  /**
   * TpoProfile updateMany
   */
  export type TpoProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TpoProfiles.
     */
    data: XOR<TpoProfileUpdateManyMutationInput, TpoProfileUncheckedUpdateManyInput>
    /**
     * Filter which TpoProfiles to update
     */
    where?: TpoProfileWhereInput
    /**
     * Limit how many TpoProfiles to update.
     */
    limit?: number
  }

  /**
   * TpoProfile updateManyAndReturn
   */
  export type TpoProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * The data used to update TpoProfiles.
     */
    data: XOR<TpoProfileUpdateManyMutationInput, TpoProfileUncheckedUpdateManyInput>
    /**
     * Filter which TpoProfiles to update
     */
    where?: TpoProfileWhereInput
    /**
     * Limit how many TpoProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TpoProfile upsert
   */
  export type TpoProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the TpoProfile to update in case it exists.
     */
    where: TpoProfileWhereUniqueInput
    /**
     * In case the TpoProfile found by the `where` argument doesn't exist, create a new TpoProfile with this data.
     */
    create: XOR<TpoProfileCreateInput, TpoProfileUncheckedCreateInput>
    /**
     * In case the TpoProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TpoProfileUpdateInput, TpoProfileUncheckedUpdateInput>
  }

  /**
   * TpoProfile delete
   */
  export type TpoProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
    /**
     * Filter which TpoProfile to delete.
     */
    where: TpoProfileWhereUniqueInput
  }

  /**
   * TpoProfile deleteMany
   */
  export type TpoProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TpoProfiles to delete
     */
    where?: TpoProfileWhereInput
    /**
     * Limit how many TpoProfiles to delete.
     */
    limit?: number
  }

  /**
   * TpoProfile without action
   */
  export type TpoProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TpoProfile
     */
    select?: TpoProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TpoProfile
     */
    omit?: TpoProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TpoProfileInclude<ExtArgs> | null
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
    collegeId: string | null
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
    collegeId: string | null
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
    collegeId: number
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
    collegeId?: true
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
    collegeId?: true
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
    collegeId?: true
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
    collegeId: string
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
    collegeId?: boolean
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
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    resumes?: boolean | StudentProfile$resumesArgs<ExtArgs>
    applications?: boolean | StudentProfile$applicationsArgs<ExtArgs>
    offers?: boolean | StudentProfile$offersArgs<ExtArgs>
    _count?: boolean | StudentProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProfile"]>

  export type StudentProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    collegeId?: boolean
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
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProfile"]>

  export type StudentProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    collegeId?: boolean
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
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentProfile"]>

  export type StudentProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    collegeId?: boolean
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

  export type StudentProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "collegeId" | "enrollmentNumber" | "branch" | "batchYear" | "cgpa" | "tenthMarks" | "twelfthMarks" | "resumeUrl" | "skills" | "linkedinUrl" | "githubUrl" | "portfolioUrl" | "isVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["studentProfile"]>
  export type StudentProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    resumes?: boolean | StudentProfile$resumesArgs<ExtArgs>
    applications?: boolean | StudentProfile$applicationsArgs<ExtArgs>
    offers?: boolean | StudentProfile$offersArgs<ExtArgs>
    _count?: boolean | StudentProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }
  export type StudentProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }

  export type $StudentProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      college: Prisma.$CollegePayload<ExtArgs>
      resumes: Prisma.$StudentResumePayload<ExtArgs>[]
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      offers: Prisma.$OfferPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      collegeId: string
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
    college<T extends CollegeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollegeDefaultArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    resumes<T extends StudentProfile$resumesArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfile$resumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    applications<T extends StudentProfile$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfile$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    offers<T extends StudentProfile$offersArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfile$offersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly collegeId: FieldRef<"StudentProfile", 'String'>
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
   * StudentProfile.resumes
   */
  export type StudentProfile$resumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    where?: StudentResumeWhereInput
    orderBy?: StudentResumeOrderByWithRelationInput | StudentResumeOrderByWithRelationInput[]
    cursor?: StudentResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentResumeScalarFieldEnum | StudentResumeScalarFieldEnum[]
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
   * StudentProfile.offers
   */
  export type StudentProfile$offersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    cursor?: OfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
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
   * Model StudentResume
   */

  export type AggregateStudentResume = {
    _count: StudentResumeCountAggregateOutputType | null
    _avg: StudentResumeAvgAggregateOutputType | null
    _sum: StudentResumeSumAggregateOutputType | null
    _min: StudentResumeMinAggregateOutputType | null
    _max: StudentResumeMaxAggregateOutputType | null
  }

  export type StudentResumeAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type StudentResumeSumAggregateOutputType = {
    fileSize: number | null
  }

  export type StudentResumeMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    title: string | null
    fileUrl: string | null
    publicId: string | null
    fileType: string | null
    fileSize: number | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentResumeMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    title: string | null
    fileUrl: string | null
    publicId: string | null
    fileType: string | null
    fileSize: number | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentResumeCountAggregateOutputType = {
    id: number
    studentId: number
    title: number
    fileUrl: number
    publicId: number
    fileType: number
    fileSize: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentResumeAvgAggregateInputType = {
    fileSize?: true
  }

  export type StudentResumeSumAggregateInputType = {
    fileSize?: true
  }

  export type StudentResumeMinAggregateInputType = {
    id?: true
    studentId?: true
    title?: true
    fileUrl?: true
    publicId?: true
    fileType?: true
    fileSize?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentResumeMaxAggregateInputType = {
    id?: true
    studentId?: true
    title?: true
    fileUrl?: true
    publicId?: true
    fileType?: true
    fileSize?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentResumeCountAggregateInputType = {
    id?: true
    studentId?: true
    title?: true
    fileUrl?: true
    publicId?: true
    fileType?: true
    fileSize?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentResume to aggregate.
     */
    where?: StudentResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentResumes to fetch.
     */
    orderBy?: StudentResumeOrderByWithRelationInput | StudentResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentResumes
    **/
    _count?: true | StudentResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentResumeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentResumeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentResumeMaxAggregateInputType
  }

  export type GetStudentResumeAggregateType<T extends StudentResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentResume[P]>
      : GetScalarType<T[P], AggregateStudentResume[P]>
  }




  export type StudentResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentResumeWhereInput
    orderBy?: StudentResumeOrderByWithAggregationInput | StudentResumeOrderByWithAggregationInput[]
    by: StudentResumeScalarFieldEnum[] | StudentResumeScalarFieldEnum
    having?: StudentResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentResumeCountAggregateInputType | true
    _avg?: StudentResumeAvgAggregateInputType
    _sum?: StudentResumeSumAggregateInputType
    _min?: StudentResumeMinAggregateInputType
    _max?: StudentResumeMaxAggregateInputType
  }

  export type StudentResumeGroupByOutputType = {
    id: string
    studentId: string
    title: string
    fileUrl: string
    publicId: string | null
    fileType: string | null
    fileSize: number | null
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    _count: StudentResumeCountAggregateOutputType | null
    _avg: StudentResumeAvgAggregateOutputType | null
    _sum: StudentResumeSumAggregateOutputType | null
    _min: StudentResumeMinAggregateOutputType | null
    _max: StudentResumeMaxAggregateOutputType | null
  }

  type GetStudentResumeGroupByPayload<T extends StudentResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentResumeGroupByOutputType[P]>
            : GetScalarType<T[P], StudentResumeGroupByOutputType[P]>
        }
      >
    >


  export type StudentResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    title?: boolean
    fileUrl?: boolean
    publicId?: boolean
    fileType?: boolean
    fileSize?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    applications?: boolean | StudentResume$applicationsArgs<ExtArgs>
    _count?: boolean | StudentResumeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentResume"]>

  export type StudentResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    title?: boolean
    fileUrl?: boolean
    publicId?: boolean
    fileType?: boolean
    fileSize?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentResume"]>

  export type StudentResumeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    title?: boolean
    fileUrl?: boolean
    publicId?: boolean
    fileType?: boolean
    fileSize?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentResume"]>

  export type StudentResumeSelectScalar = {
    id?: boolean
    studentId?: boolean
    title?: boolean
    fileUrl?: boolean
    publicId?: boolean
    fileType?: boolean
    fileSize?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "title" | "fileUrl" | "publicId" | "fileType" | "fileSize" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["studentResume"]>
  export type StudentResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    applications?: boolean | StudentResume$applicationsArgs<ExtArgs>
    _count?: boolean | StudentResumeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }
  export type StudentResumeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
  }

  export type $StudentResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentResume"
    objects: {
      student: Prisma.$StudentProfilePayload<ExtArgs>
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      title: string
      fileUrl: string
      publicId: string | null
      fileType: string | null
      fileSize: number | null
      isDefault: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["studentResume"]>
    composites: {}
  }

  type StudentResumeGetPayload<S extends boolean | null | undefined | StudentResumeDefaultArgs> = $Result.GetResult<Prisma.$StudentResumePayload, S>

  type StudentResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentResumeCountAggregateInputType | true
    }

  export interface StudentResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentResume'], meta: { name: 'StudentResume' } }
    /**
     * Find zero or one StudentResume that matches the filter.
     * @param {StudentResumeFindUniqueArgs} args - Arguments to find a StudentResume
     * @example
     * // Get one StudentResume
     * const studentResume = await prisma.studentResume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentResumeFindUniqueArgs>(args: SelectSubset<T, StudentResumeFindUniqueArgs<ExtArgs>>): Prisma__StudentResumeClient<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentResume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentResumeFindUniqueOrThrowArgs} args - Arguments to find a StudentResume
     * @example
     * // Get one StudentResume
     * const studentResume = await prisma.studentResume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentResumeClient<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentResume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentResumeFindFirstArgs} args - Arguments to find a StudentResume
     * @example
     * // Get one StudentResume
     * const studentResume = await prisma.studentResume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentResumeFindFirstArgs>(args?: SelectSubset<T, StudentResumeFindFirstArgs<ExtArgs>>): Prisma__StudentResumeClient<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentResume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentResumeFindFirstOrThrowArgs} args - Arguments to find a StudentResume
     * @example
     * // Get one StudentResume
     * const studentResume = await prisma.studentResume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentResumeClient<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentResumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentResumes
     * const studentResumes = await prisma.studentResume.findMany()
     * 
     * // Get first 10 StudentResumes
     * const studentResumes = await prisma.studentResume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentResumeWithIdOnly = await prisma.studentResume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentResumeFindManyArgs>(args?: SelectSubset<T, StudentResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentResume.
     * @param {StudentResumeCreateArgs} args - Arguments to create a StudentResume.
     * @example
     * // Create one StudentResume
     * const StudentResume = await prisma.studentResume.create({
     *   data: {
     *     // ... data to create a StudentResume
     *   }
     * })
     * 
     */
    create<T extends StudentResumeCreateArgs>(args: SelectSubset<T, StudentResumeCreateArgs<ExtArgs>>): Prisma__StudentResumeClient<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentResumes.
     * @param {StudentResumeCreateManyArgs} args - Arguments to create many StudentResumes.
     * @example
     * // Create many StudentResumes
     * const studentResume = await prisma.studentResume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentResumeCreateManyArgs>(args?: SelectSubset<T, StudentResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentResumes and returns the data saved in the database.
     * @param {StudentResumeCreateManyAndReturnArgs} args - Arguments to create many StudentResumes.
     * @example
     * // Create many StudentResumes
     * const studentResume = await prisma.studentResume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentResumes and only return the `id`
     * const studentResumeWithIdOnly = await prisma.studentResume.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentResume.
     * @param {StudentResumeDeleteArgs} args - Arguments to delete one StudentResume.
     * @example
     * // Delete one StudentResume
     * const StudentResume = await prisma.studentResume.delete({
     *   where: {
     *     // ... filter to delete one StudentResume
     *   }
     * })
     * 
     */
    delete<T extends StudentResumeDeleteArgs>(args: SelectSubset<T, StudentResumeDeleteArgs<ExtArgs>>): Prisma__StudentResumeClient<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentResume.
     * @param {StudentResumeUpdateArgs} args - Arguments to update one StudentResume.
     * @example
     * // Update one StudentResume
     * const studentResume = await prisma.studentResume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentResumeUpdateArgs>(args: SelectSubset<T, StudentResumeUpdateArgs<ExtArgs>>): Prisma__StudentResumeClient<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentResumes.
     * @param {StudentResumeDeleteManyArgs} args - Arguments to filter StudentResumes to delete.
     * @example
     * // Delete a few StudentResumes
     * const { count } = await prisma.studentResume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentResumeDeleteManyArgs>(args?: SelectSubset<T, StudentResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentResumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentResumes
     * const studentResume = await prisma.studentResume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentResumeUpdateManyArgs>(args: SelectSubset<T, StudentResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentResumes and returns the data updated in the database.
     * @param {StudentResumeUpdateManyAndReturnArgs} args - Arguments to update many StudentResumes.
     * @example
     * // Update many StudentResumes
     * const studentResume = await prisma.studentResume.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentResumes and only return the `id`
     * const studentResumeWithIdOnly = await prisma.studentResume.updateManyAndReturn({
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
    updateManyAndReturn<T extends StudentResumeUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentResumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentResume.
     * @param {StudentResumeUpsertArgs} args - Arguments to update or create a StudentResume.
     * @example
     * // Update or create a StudentResume
     * const studentResume = await prisma.studentResume.upsert({
     *   create: {
     *     // ... data to create a StudentResume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentResume we want to update
     *   }
     * })
     */
    upsert<T extends StudentResumeUpsertArgs>(args: SelectSubset<T, StudentResumeUpsertArgs<ExtArgs>>): Prisma__StudentResumeClient<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentResumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentResumeCountArgs} args - Arguments to filter StudentResumes to count.
     * @example
     * // Count the number of StudentResumes
     * const count = await prisma.studentResume.count({
     *   where: {
     *     // ... the filter for the StudentResumes we want to count
     *   }
     * })
    **/
    count<T extends StudentResumeCountArgs>(
      args?: Subset<T, StudentResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentResume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentResumeAggregateArgs>(args: Subset<T, StudentResumeAggregateArgs>): Prisma.PrismaPromise<GetStudentResumeAggregateType<T>>

    /**
     * Group by StudentResume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentResumeGroupByArgs} args - Group by arguments.
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
      T extends StudentResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentResumeGroupByArgs['orderBy'] }
        : { orderBy?: StudentResumeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentResume model
   */
  readonly fields: StudentResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentResume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfileDefaultArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends StudentResume$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, StudentResume$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the StudentResume model
   */
  interface StudentResumeFieldRefs {
    readonly id: FieldRef<"StudentResume", 'String'>
    readonly studentId: FieldRef<"StudentResume", 'String'>
    readonly title: FieldRef<"StudentResume", 'String'>
    readonly fileUrl: FieldRef<"StudentResume", 'String'>
    readonly publicId: FieldRef<"StudentResume", 'String'>
    readonly fileType: FieldRef<"StudentResume", 'String'>
    readonly fileSize: FieldRef<"StudentResume", 'Int'>
    readonly isDefault: FieldRef<"StudentResume", 'Boolean'>
    readonly createdAt: FieldRef<"StudentResume", 'DateTime'>
    readonly updatedAt: FieldRef<"StudentResume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudentResume findUnique
   */
  export type StudentResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    /**
     * Filter, which StudentResume to fetch.
     */
    where: StudentResumeWhereUniqueInput
  }

  /**
   * StudentResume findUniqueOrThrow
   */
  export type StudentResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    /**
     * Filter, which StudentResume to fetch.
     */
    where: StudentResumeWhereUniqueInput
  }

  /**
   * StudentResume findFirst
   */
  export type StudentResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    /**
     * Filter, which StudentResume to fetch.
     */
    where?: StudentResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentResumes to fetch.
     */
    orderBy?: StudentResumeOrderByWithRelationInput | StudentResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentResumes.
     */
    cursor?: StudentResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentResumes.
     */
    distinct?: StudentResumeScalarFieldEnum | StudentResumeScalarFieldEnum[]
  }

  /**
   * StudentResume findFirstOrThrow
   */
  export type StudentResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    /**
     * Filter, which StudentResume to fetch.
     */
    where?: StudentResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentResumes to fetch.
     */
    orderBy?: StudentResumeOrderByWithRelationInput | StudentResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentResumes.
     */
    cursor?: StudentResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentResumes.
     */
    distinct?: StudentResumeScalarFieldEnum | StudentResumeScalarFieldEnum[]
  }

  /**
   * StudentResume findMany
   */
  export type StudentResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    /**
     * Filter, which StudentResumes to fetch.
     */
    where?: StudentResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentResumes to fetch.
     */
    orderBy?: StudentResumeOrderByWithRelationInput | StudentResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentResumes.
     */
    cursor?: StudentResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentResumes.
     */
    distinct?: StudentResumeScalarFieldEnum | StudentResumeScalarFieldEnum[]
  }

  /**
   * StudentResume create
   */
  export type StudentResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentResume.
     */
    data: XOR<StudentResumeCreateInput, StudentResumeUncheckedCreateInput>
  }

  /**
   * StudentResume createMany
   */
  export type StudentResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentResumes.
     */
    data: StudentResumeCreateManyInput | StudentResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentResume createManyAndReturn
   */
  export type StudentResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * The data used to create many StudentResumes.
     */
    data: StudentResumeCreateManyInput | StudentResumeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentResume update
   */
  export type StudentResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentResume.
     */
    data: XOR<StudentResumeUpdateInput, StudentResumeUncheckedUpdateInput>
    /**
     * Choose, which StudentResume to update.
     */
    where: StudentResumeWhereUniqueInput
  }

  /**
   * StudentResume updateMany
   */
  export type StudentResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentResumes.
     */
    data: XOR<StudentResumeUpdateManyMutationInput, StudentResumeUncheckedUpdateManyInput>
    /**
     * Filter which StudentResumes to update
     */
    where?: StudentResumeWhereInput
    /**
     * Limit how many StudentResumes to update.
     */
    limit?: number
  }

  /**
   * StudentResume updateManyAndReturn
   */
  export type StudentResumeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * The data used to update StudentResumes.
     */
    data: XOR<StudentResumeUpdateManyMutationInput, StudentResumeUncheckedUpdateManyInput>
    /**
     * Filter which StudentResumes to update
     */
    where?: StudentResumeWhereInput
    /**
     * Limit how many StudentResumes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentResume upsert
   */
  export type StudentResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentResume to update in case it exists.
     */
    where: StudentResumeWhereUniqueInput
    /**
     * In case the StudentResume found by the `where` argument doesn't exist, create a new StudentResume with this data.
     */
    create: XOR<StudentResumeCreateInput, StudentResumeUncheckedCreateInput>
    /**
     * In case the StudentResume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentResumeUpdateInput, StudentResumeUncheckedUpdateInput>
  }

  /**
   * StudentResume delete
   */
  export type StudentResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    /**
     * Filter which StudentResume to delete.
     */
    where: StudentResumeWhereUniqueInput
  }

  /**
   * StudentResume deleteMany
   */
  export type StudentResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentResumes to delete
     */
    where?: StudentResumeWhereInput
    /**
     * Limit how many StudentResumes to delete.
     */
    limit?: number
  }

  /**
   * StudentResume.applications
   */
  export type StudentResume$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * StudentResume without action
   */
  export type StudentResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
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
    images: number
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
    images?: true
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
    images: string[]
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
    images?: boolean
    industry?: boolean
    location?: boolean
    description?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recruiters?: boolean | Company$recruitersArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    offers?: boolean | Company$offersArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    website?: boolean
    logoUrl?: boolean
    images?: boolean
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
    images?: boolean
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
    images?: boolean
    industry?: boolean
    location?: boolean
    description?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "website" | "logoUrl" | "images" | "industry" | "location" | "description" | "isVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiters?: boolean | Company$recruitersArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    offers?: boolean | Company$offersArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      recruiters: Prisma.$RecruiterProfilePayload<ExtArgs>[]
      jobs: Prisma.$JobPayload<ExtArgs>[]
      offers: Prisma.$OfferPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      website: string | null
      logoUrl: string | null
      images: string[]
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
    offers<T extends Company$offersArgs<ExtArgs> = {}>(args?: Subset<T, Company$offersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly images: FieldRef<"Company", 'String[]'>
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
   * Company.offers
   */
  export type Company$offersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    cursor?: OfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
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
    collegeId: string | null
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
    collegeId: string | null
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
    collegeId: number
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
    collegeId?: true
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
    collegeId?: true
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
    collegeId?: true
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
    collegeId: string
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
    collegeId?: boolean
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
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    applications?: boolean | Job$applicationsArgs<ExtArgs>
    offers?: boolean | Job$offersArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    collegeId?: boolean
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
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    collegeId?: boolean
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
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    companyId?: boolean
    collegeId?: boolean
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

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "collegeId" | "title" | "description" | "type" | "status" | "location" | "salaryPackage" | "minCgpa" | "allowedBranches" | "eligibleBatches" | "deadline" | "createdAt" | "updatedAt", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
    applications?: boolean | Job$applicationsArgs<ExtArgs>
    offers?: boolean | Job$offersArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }
  export type JobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      college: Prisma.$CollegePayload<ExtArgs>
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      offers: Prisma.$OfferPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      collegeId: string
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
    college<T extends CollegeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollegeDefaultArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends Job$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Job$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    offers<T extends Job$offersArgs<ExtArgs> = {}>(args?: Subset<T, Job$offersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly collegeId: FieldRef<"Job", 'String'>
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
   * Job.offers
   */
  export type Job$offersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    cursor?: OfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
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
    resumeId: string | null
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
    resumeId: string | null
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
    resumeId: number
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
    resumeId?: true
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
    resumeId?: true
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
    resumeId?: true
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
    resumeId: string | null
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
    resumeId?: boolean
    resumeUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    resume?: boolean | Application$resumeArgs<ExtArgs>
    offer?: boolean | Application$offerArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    studentId?: boolean
    status?: boolean
    resumeId?: boolean
    resumeUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    resume?: boolean | Application$resumeArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    studentId?: boolean
    status?: boolean
    resumeId?: boolean
    resumeUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    resume?: boolean | Application$resumeArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectScalar = {
    id?: boolean
    jobId?: boolean
    studentId?: boolean
    status?: boolean
    resumeId?: boolean
    resumeUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jobId" | "studentId" | "status" | "resumeId" | "resumeUrl" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["application"]>
  export type ApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    resume?: boolean | Application$resumeArgs<ExtArgs>
    offer?: boolean | Application$offerArgs<ExtArgs>
  }
  export type ApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    resume?: boolean | Application$resumeArgs<ExtArgs>
  }
  export type ApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    resume?: boolean | Application$resumeArgs<ExtArgs>
  }

  export type $ApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Application"
    objects: {
      job: Prisma.$JobPayload<ExtArgs>
      student: Prisma.$StudentProfilePayload<ExtArgs>
      resume: Prisma.$StudentResumePayload<ExtArgs> | null
      offer: Prisma.$OfferPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      studentId: string
      status: $Enums.ApplicationStatus
      resumeId: string | null
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
    resume<T extends Application$resumeArgs<ExtArgs> = {}>(args?: Subset<T, Application$resumeArgs<ExtArgs>>): Prisma__StudentResumeClient<$Result.GetResult<Prisma.$StudentResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    offer<T extends Application$offerArgs<ExtArgs> = {}>(args?: Subset<T, Application$offerArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
    readonly resumeId: FieldRef<"Application", 'String'>
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
   * Application.resume
   */
  export type Application$resumeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentResume
     */
    select?: StudentResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentResume
     */
    omit?: StudentResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentResumeInclude<ExtArgs> | null
    where?: StudentResumeWhereInput
  }

  /**
   * Application.offer
   */
  export type Application$offerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    where?: OfferWhereInput
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
   * Model Offer
   */

  export type AggregateOffer = {
    _count: OfferCountAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  export type OfferMinAggregateOutputType = {
    id: string | null
    applicationId: string | null
    studentId: string | null
    jobId: string | null
    companyId: string | null
    collegeId: string | null
    designation: string | null
    salaryPackage: string | null
    location: string | null
    joiningDate: Date | null
    letterUrl: string | null
    notes: string | null
    status: $Enums.OfferStatus | null
    expiresAt: Date | null
    acceptedAt: Date | null
    declinedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfferMaxAggregateOutputType = {
    id: string | null
    applicationId: string | null
    studentId: string | null
    jobId: string | null
    companyId: string | null
    collegeId: string | null
    designation: string | null
    salaryPackage: string | null
    location: string | null
    joiningDate: Date | null
    letterUrl: string | null
    notes: string | null
    status: $Enums.OfferStatus | null
    expiresAt: Date | null
    acceptedAt: Date | null
    declinedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfferCountAggregateOutputType = {
    id: number
    applicationId: number
    studentId: number
    jobId: number
    companyId: number
    collegeId: number
    designation: number
    salaryPackage: number
    location: number
    joiningDate: number
    letterUrl: number
    notes: number
    status: number
    expiresAt: number
    acceptedAt: number
    declinedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OfferMinAggregateInputType = {
    id?: true
    applicationId?: true
    studentId?: true
    jobId?: true
    companyId?: true
    collegeId?: true
    designation?: true
    salaryPackage?: true
    location?: true
    joiningDate?: true
    letterUrl?: true
    notes?: true
    status?: true
    expiresAt?: true
    acceptedAt?: true
    declinedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfferMaxAggregateInputType = {
    id?: true
    applicationId?: true
    studentId?: true
    jobId?: true
    companyId?: true
    collegeId?: true
    designation?: true
    salaryPackage?: true
    location?: true
    joiningDate?: true
    letterUrl?: true
    notes?: true
    status?: true
    expiresAt?: true
    acceptedAt?: true
    declinedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfferCountAggregateInputType = {
    id?: true
    applicationId?: true
    studentId?: true
    jobId?: true
    companyId?: true
    collegeId?: true
    designation?: true
    salaryPackage?: true
    location?: true
    joiningDate?: true
    letterUrl?: true
    notes?: true
    status?: true
    expiresAt?: true
    acceptedAt?: true
    declinedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OfferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Offer to aggregate.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Offers
    **/
    _count?: true | OfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfferMaxAggregateInputType
  }

  export type GetOfferAggregateType<T extends OfferAggregateArgs> = {
        [P in keyof T & keyof AggregateOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOffer[P]>
      : GetScalarType<T[P], AggregateOffer[P]>
  }




  export type OfferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithAggregationInput | OfferOrderByWithAggregationInput[]
    by: OfferScalarFieldEnum[] | OfferScalarFieldEnum
    having?: OfferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfferCountAggregateInputType | true
    _min?: OfferMinAggregateInputType
    _max?: OfferMaxAggregateInputType
  }

  export type OfferGroupByOutputType = {
    id: string
    applicationId: string
    studentId: string
    jobId: string
    companyId: string
    collegeId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate: Date | null
    letterUrl: string | null
    notes: string | null
    status: $Enums.OfferStatus
    expiresAt: Date | null
    acceptedAt: Date | null
    declinedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: OfferCountAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  type GetOfferGroupByPayload<T extends OfferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfferGroupByOutputType[P]>
            : GetScalarType<T[P], OfferGroupByOutputType[P]>
        }
      >
    >


  export type OfferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    studentId?: boolean
    jobId?: boolean
    companyId?: boolean
    collegeId?: boolean
    designation?: boolean
    salaryPackage?: boolean
    location?: boolean
    joiningDate?: boolean
    letterUrl?: boolean
    notes?: boolean
    status?: boolean
    expiresAt?: boolean
    acceptedAt?: boolean
    declinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offer"]>

  export type OfferSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    studentId?: boolean
    jobId?: boolean
    companyId?: boolean
    collegeId?: boolean
    designation?: boolean
    salaryPackage?: boolean
    location?: boolean
    joiningDate?: boolean
    letterUrl?: boolean
    notes?: boolean
    status?: boolean
    expiresAt?: boolean
    acceptedAt?: boolean
    declinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offer"]>

  export type OfferSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    studentId?: boolean
    jobId?: boolean
    companyId?: boolean
    collegeId?: boolean
    designation?: boolean
    salaryPackage?: boolean
    location?: boolean
    joiningDate?: boolean
    letterUrl?: boolean
    notes?: boolean
    status?: boolean
    expiresAt?: boolean
    acceptedAt?: boolean
    declinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offer"]>

  export type OfferSelectScalar = {
    id?: boolean
    applicationId?: boolean
    studentId?: boolean
    jobId?: boolean
    companyId?: boolean
    collegeId?: boolean
    designation?: boolean
    salaryPackage?: boolean
    location?: boolean
    joiningDate?: boolean
    letterUrl?: boolean
    notes?: boolean
    status?: boolean
    expiresAt?: boolean
    acceptedAt?: boolean
    declinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OfferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "applicationId" | "studentId" | "jobId" | "companyId" | "collegeId" | "designation" | "salaryPackage" | "location" | "joiningDate" | "letterUrl" | "notes" | "status" | "expiresAt" | "acceptedAt" | "declinedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["offer"]>
  export type OfferInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }
  export type OfferIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }
  export type OfferIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | ApplicationDefaultArgs<ExtArgs>
    student?: boolean | StudentProfileDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    college?: boolean | CollegeDefaultArgs<ExtArgs>
  }

  export type $OfferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Offer"
    objects: {
      application: Prisma.$ApplicationPayload<ExtArgs>
      student: Prisma.$StudentProfilePayload<ExtArgs>
      job: Prisma.$JobPayload<ExtArgs>
      company: Prisma.$CompanyPayload<ExtArgs>
      college: Prisma.$CollegePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      applicationId: string
      studentId: string
      jobId: string
      companyId: string
      collegeId: string
      designation: string
      salaryPackage: string
      location: string
      joiningDate: Date | null
      letterUrl: string | null
      notes: string | null
      status: $Enums.OfferStatus
      expiresAt: Date | null
      acceptedAt: Date | null
      declinedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["offer"]>
    composites: {}
  }

  type OfferGetPayload<S extends boolean | null | undefined | OfferDefaultArgs> = $Result.GetResult<Prisma.$OfferPayload, S>

  type OfferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfferCountAggregateInputType | true
    }

  export interface OfferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Offer'], meta: { name: 'Offer' } }
    /**
     * Find zero or one Offer that matches the filter.
     * @param {OfferFindUniqueArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfferFindUniqueArgs>(args: SelectSubset<T, OfferFindUniqueArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Offer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfferFindUniqueOrThrowArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfferFindUniqueOrThrowArgs>(args: SelectSubset<T, OfferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Offer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindFirstArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfferFindFirstArgs>(args?: SelectSubset<T, OfferFindFirstArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Offer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindFirstOrThrowArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfferFindFirstOrThrowArgs>(args?: SelectSubset<T, OfferFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Offers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Offers
     * const offers = await prisma.offer.findMany()
     * 
     * // Get first 10 Offers
     * const offers = await prisma.offer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offerWithIdOnly = await prisma.offer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfferFindManyArgs>(args?: SelectSubset<T, OfferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Offer.
     * @param {OfferCreateArgs} args - Arguments to create a Offer.
     * @example
     * // Create one Offer
     * const Offer = await prisma.offer.create({
     *   data: {
     *     // ... data to create a Offer
     *   }
     * })
     * 
     */
    create<T extends OfferCreateArgs>(args: SelectSubset<T, OfferCreateArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Offers.
     * @param {OfferCreateManyArgs} args - Arguments to create many Offers.
     * @example
     * // Create many Offers
     * const offer = await prisma.offer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfferCreateManyArgs>(args?: SelectSubset<T, OfferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Offers and returns the data saved in the database.
     * @param {OfferCreateManyAndReturnArgs} args - Arguments to create many Offers.
     * @example
     * // Create many Offers
     * const offer = await prisma.offer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Offers and only return the `id`
     * const offerWithIdOnly = await prisma.offer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfferCreateManyAndReturnArgs>(args?: SelectSubset<T, OfferCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Offer.
     * @param {OfferDeleteArgs} args - Arguments to delete one Offer.
     * @example
     * // Delete one Offer
     * const Offer = await prisma.offer.delete({
     *   where: {
     *     // ... filter to delete one Offer
     *   }
     * })
     * 
     */
    delete<T extends OfferDeleteArgs>(args: SelectSubset<T, OfferDeleteArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Offer.
     * @param {OfferUpdateArgs} args - Arguments to update one Offer.
     * @example
     * // Update one Offer
     * const offer = await prisma.offer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfferUpdateArgs>(args: SelectSubset<T, OfferUpdateArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Offers.
     * @param {OfferDeleteManyArgs} args - Arguments to filter Offers to delete.
     * @example
     * // Delete a few Offers
     * const { count } = await prisma.offer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfferDeleteManyArgs>(args?: SelectSubset<T, OfferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Offers
     * const offer = await prisma.offer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfferUpdateManyArgs>(args: SelectSubset<T, OfferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offers and returns the data updated in the database.
     * @param {OfferUpdateManyAndReturnArgs} args - Arguments to update many Offers.
     * @example
     * // Update many Offers
     * const offer = await prisma.offer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Offers and only return the `id`
     * const offerWithIdOnly = await prisma.offer.updateManyAndReturn({
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
    updateManyAndReturn<T extends OfferUpdateManyAndReturnArgs>(args: SelectSubset<T, OfferUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Offer.
     * @param {OfferUpsertArgs} args - Arguments to update or create a Offer.
     * @example
     * // Update or create a Offer
     * const offer = await prisma.offer.upsert({
     *   create: {
     *     // ... data to create a Offer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Offer we want to update
     *   }
     * })
     */
    upsert<T extends OfferUpsertArgs>(args: SelectSubset<T, OfferUpsertArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferCountArgs} args - Arguments to filter Offers to count.
     * @example
     * // Count the number of Offers
     * const count = await prisma.offer.count({
     *   where: {
     *     // ... the filter for the Offers we want to count
     *   }
     * })
    **/
    count<T extends OfferCountArgs>(
      args?: Subset<T, OfferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OfferAggregateArgs>(args: Subset<T, OfferAggregateArgs>): Prisma.PrismaPromise<GetOfferAggregateType<T>>

    /**
     * Group by Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferGroupByArgs} args - Group by arguments.
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
      T extends OfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfferGroupByArgs['orderBy'] }
        : { orderBy?: OfferGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Offer model
   */
  readonly fields: OfferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Offer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    application<T extends ApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApplicationDefaultArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends StudentProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentProfileDefaultArgs<ExtArgs>>): Prisma__StudentProfileClient<$Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    college<T extends CollegeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollegeDefaultArgs<ExtArgs>>): Prisma__CollegeClient<$Result.GetResult<Prisma.$CollegePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Offer model
   */
  interface OfferFieldRefs {
    readonly id: FieldRef<"Offer", 'String'>
    readonly applicationId: FieldRef<"Offer", 'String'>
    readonly studentId: FieldRef<"Offer", 'String'>
    readonly jobId: FieldRef<"Offer", 'String'>
    readonly companyId: FieldRef<"Offer", 'String'>
    readonly collegeId: FieldRef<"Offer", 'String'>
    readonly designation: FieldRef<"Offer", 'String'>
    readonly salaryPackage: FieldRef<"Offer", 'String'>
    readonly location: FieldRef<"Offer", 'String'>
    readonly joiningDate: FieldRef<"Offer", 'DateTime'>
    readonly letterUrl: FieldRef<"Offer", 'String'>
    readonly notes: FieldRef<"Offer", 'String'>
    readonly status: FieldRef<"Offer", 'OfferStatus'>
    readonly expiresAt: FieldRef<"Offer", 'DateTime'>
    readonly acceptedAt: FieldRef<"Offer", 'DateTime'>
    readonly declinedAt: FieldRef<"Offer", 'DateTime'>
    readonly createdAt: FieldRef<"Offer", 'DateTime'>
    readonly updatedAt: FieldRef<"Offer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Offer findUnique
   */
  export type OfferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer findUniqueOrThrow
   */
  export type OfferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer findFirst
   */
  export type OfferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     */
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer findFirstOrThrow
   */
  export type OfferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     */
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer findMany
   */
  export type OfferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offers to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     */
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer create
   */
  export type OfferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * The data needed to create a Offer.
     */
    data: XOR<OfferCreateInput, OfferUncheckedCreateInput>
  }

  /**
   * Offer createMany
   */
  export type OfferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Offers.
     */
    data: OfferCreateManyInput | OfferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Offer createManyAndReturn
   */
  export type OfferCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * The data used to create many Offers.
     */
    data: OfferCreateManyInput | OfferCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Offer update
   */
  export type OfferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * The data needed to update a Offer.
     */
    data: XOR<OfferUpdateInput, OfferUncheckedUpdateInput>
    /**
     * Choose, which Offer to update.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer updateMany
   */
  export type OfferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Offers.
     */
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyInput>
    /**
     * Filter which Offers to update
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to update.
     */
    limit?: number
  }

  /**
   * Offer updateManyAndReturn
   */
  export type OfferUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * The data used to update Offers.
     */
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyInput>
    /**
     * Filter which Offers to update
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Offer upsert
   */
  export type OfferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * The filter to search for the Offer to update in case it exists.
     */
    where: OfferWhereUniqueInput
    /**
     * In case the Offer found by the `where` argument doesn't exist, create a new Offer with this data.
     */
    create: XOR<OfferCreateInput, OfferUncheckedCreateInput>
    /**
     * In case the Offer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfferUpdateInput, OfferUncheckedUpdateInput>
  }

  /**
   * Offer delete
   */
  export type OfferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter which Offer to delete.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer deleteMany
   */
  export type OfferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Offers to delete
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to delete.
     */
    limit?: number
  }

  /**
   * Offer without action
   */
  export type OfferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
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


  export const CollegeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    domain: 'domain',
    city: 'city',
    state: 'state',
    logoUrl: 'logoUrl',
    images: 'images',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CollegeScalarFieldEnum = (typeof CollegeScalarFieldEnum)[keyof typeof CollegeScalarFieldEnum]


  export const TpoProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    collegeId: 'collegeId',
    designation: 'designation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TpoProfileScalarFieldEnum = (typeof TpoProfileScalarFieldEnum)[keyof typeof TpoProfileScalarFieldEnum]


  export const StudentProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    collegeId: 'collegeId',
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


  export const StudentResumeScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    title: 'title',
    fileUrl: 'fileUrl',
    publicId: 'publicId',
    fileType: 'fileType',
    fileSize: 'fileSize',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentResumeScalarFieldEnum = (typeof StudentResumeScalarFieldEnum)[keyof typeof StudentResumeScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    website: 'website',
    logoUrl: 'logoUrl',
    images: 'images',
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
    collegeId: 'collegeId',
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
    resumeId: 'resumeId',
    resumeUrl: 'resumeUrl',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum]


  export const OfferScalarFieldEnum: {
    id: 'id',
    applicationId: 'applicationId',
    studentId: 'studentId',
    jobId: 'jobId',
    companyId: 'companyId',
    collegeId: 'collegeId',
    designation: 'designation',
    salaryPackage: 'salaryPackage',
    location: 'location',
    joiningDate: 'joiningDate',
    letterUrl: 'letterUrl',
    notes: 'notes',
    status: 'status',
    expiresAt: 'expiresAt',
    acceptedAt: 'acceptedAt',
    declinedAt: 'declinedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OfferScalarFieldEnum = (typeof OfferScalarFieldEnum)[keyof typeof OfferScalarFieldEnum]


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
   * Reference to a field of type 'OfferStatus'
   */
  export type EnumOfferStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OfferStatus'>
    


  /**
   * Reference to a field of type 'OfferStatus[]'
   */
  export type ListEnumOfferStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OfferStatus[]'>
    
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
    tpo?: XOR<TpoProfileNullableScalarRelationFilter, TpoProfileWhereInput> | null
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
    tpo?: TpoProfileOrderByWithRelationInput
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
    tpo?: XOR<TpoProfileNullableScalarRelationFilter, TpoProfileWhereInput> | null
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

  export type CollegeWhereInput = {
    AND?: CollegeWhereInput | CollegeWhereInput[]
    OR?: CollegeWhereInput[]
    NOT?: CollegeWhereInput | CollegeWhereInput[]
    id?: StringFilter<"College"> | string
    name?: StringFilter<"College"> | string
    code?: StringNullableFilter<"College"> | string | null
    domain?: StringNullableFilter<"College"> | string | null
    city?: StringNullableFilter<"College"> | string | null
    state?: StringNullableFilter<"College"> | string | null
    logoUrl?: StringNullableFilter<"College"> | string | null
    images?: StringNullableListFilter<"College">
    isVerified?: BoolFilter<"College"> | boolean
    createdAt?: DateTimeFilter<"College"> | Date | string
    updatedAt?: DateTimeFilter<"College"> | Date | string
    tpos?: TpoProfileListRelationFilter
    students?: StudentProfileListRelationFilter
    jobs?: JobListRelationFilter
    offers?: OfferListRelationFilter
  }

  export type CollegeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    domain?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    images?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tpos?: TpoProfileOrderByRelationAggregateInput
    students?: StudentProfileOrderByRelationAggregateInput
    jobs?: JobOrderByRelationAggregateInput
    offers?: OfferOrderByRelationAggregateInput
  }

  export type CollegeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    code?: string
    AND?: CollegeWhereInput | CollegeWhereInput[]
    OR?: CollegeWhereInput[]
    NOT?: CollegeWhereInput | CollegeWhereInput[]
    domain?: StringNullableFilter<"College"> | string | null
    city?: StringNullableFilter<"College"> | string | null
    state?: StringNullableFilter<"College"> | string | null
    logoUrl?: StringNullableFilter<"College"> | string | null
    images?: StringNullableListFilter<"College">
    isVerified?: BoolFilter<"College"> | boolean
    createdAt?: DateTimeFilter<"College"> | Date | string
    updatedAt?: DateTimeFilter<"College"> | Date | string
    tpos?: TpoProfileListRelationFilter
    students?: StudentProfileListRelationFilter
    jobs?: JobListRelationFilter
    offers?: OfferListRelationFilter
  }, "id" | "name" | "code">

  export type CollegeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    domain?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    images?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CollegeCountOrderByAggregateInput
    _max?: CollegeMaxOrderByAggregateInput
    _min?: CollegeMinOrderByAggregateInput
  }

  export type CollegeScalarWhereWithAggregatesInput = {
    AND?: CollegeScalarWhereWithAggregatesInput | CollegeScalarWhereWithAggregatesInput[]
    OR?: CollegeScalarWhereWithAggregatesInput[]
    NOT?: CollegeScalarWhereWithAggregatesInput | CollegeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"College"> | string
    name?: StringWithAggregatesFilter<"College"> | string
    code?: StringNullableWithAggregatesFilter<"College"> | string | null
    domain?: StringNullableWithAggregatesFilter<"College"> | string | null
    city?: StringNullableWithAggregatesFilter<"College"> | string | null
    state?: StringNullableWithAggregatesFilter<"College"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"College"> | string | null
    images?: StringNullableListFilter<"College">
    isVerified?: BoolWithAggregatesFilter<"College"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"College"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"College"> | Date | string
  }

  export type TpoProfileWhereInput = {
    AND?: TpoProfileWhereInput | TpoProfileWhereInput[]
    OR?: TpoProfileWhereInput[]
    NOT?: TpoProfileWhereInput | TpoProfileWhereInput[]
    id?: StringFilter<"TpoProfile"> | string
    userId?: StringFilter<"TpoProfile"> | string
    collegeId?: StringFilter<"TpoProfile"> | string
    designation?: StringNullableFilter<"TpoProfile"> | string | null
    createdAt?: DateTimeFilter<"TpoProfile"> | Date | string
    updatedAt?: DateTimeFilter<"TpoProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
  }

  export type TpoProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    collegeId?: SortOrder
    designation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    college?: CollegeOrderByWithRelationInput
  }

  export type TpoProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: TpoProfileWhereInput | TpoProfileWhereInput[]
    OR?: TpoProfileWhereInput[]
    NOT?: TpoProfileWhereInput | TpoProfileWhereInput[]
    collegeId?: StringFilter<"TpoProfile"> | string
    designation?: StringNullableFilter<"TpoProfile"> | string | null
    createdAt?: DateTimeFilter<"TpoProfile"> | Date | string
    updatedAt?: DateTimeFilter<"TpoProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
  }, "id" | "userId">

  export type TpoProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    collegeId?: SortOrder
    designation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TpoProfileCountOrderByAggregateInput
    _max?: TpoProfileMaxOrderByAggregateInput
    _min?: TpoProfileMinOrderByAggregateInput
  }

  export type TpoProfileScalarWhereWithAggregatesInput = {
    AND?: TpoProfileScalarWhereWithAggregatesInput | TpoProfileScalarWhereWithAggregatesInput[]
    OR?: TpoProfileScalarWhereWithAggregatesInput[]
    NOT?: TpoProfileScalarWhereWithAggregatesInput | TpoProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TpoProfile"> | string
    userId?: StringWithAggregatesFilter<"TpoProfile"> | string
    collegeId?: StringWithAggregatesFilter<"TpoProfile"> | string
    designation?: StringNullableWithAggregatesFilter<"TpoProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TpoProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TpoProfile"> | Date | string
  }

  export type StudentProfileWhereInput = {
    AND?: StudentProfileWhereInput | StudentProfileWhereInput[]
    OR?: StudentProfileWhereInput[]
    NOT?: StudentProfileWhereInput | StudentProfileWhereInput[]
    id?: StringFilter<"StudentProfile"> | string
    userId?: StringFilter<"StudentProfile"> | string
    collegeId?: StringFilter<"StudentProfile"> | string
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
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
    resumes?: StudentResumeListRelationFilter
    applications?: ApplicationListRelationFilter
    offers?: OfferListRelationFilter
  }

  export type StudentProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    collegeId?: SortOrder
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
    college?: CollegeOrderByWithRelationInput
    resumes?: StudentResumeOrderByRelationAggregateInput
    applications?: ApplicationOrderByRelationAggregateInput
    offers?: OfferOrderByRelationAggregateInput
  }

  export type StudentProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    enrollmentNumber?: string
    AND?: StudentProfileWhereInput | StudentProfileWhereInput[]
    OR?: StudentProfileWhereInput[]
    NOT?: StudentProfileWhereInput | StudentProfileWhereInput[]
    collegeId?: StringFilter<"StudentProfile"> | string
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
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
    resumes?: StudentResumeListRelationFilter
    applications?: ApplicationListRelationFilter
    offers?: OfferListRelationFilter
  }, "id" | "userId" | "enrollmentNumber">

  export type StudentProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    collegeId?: SortOrder
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
    collegeId?: StringWithAggregatesFilter<"StudentProfile"> | string
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

  export type StudentResumeWhereInput = {
    AND?: StudentResumeWhereInput | StudentResumeWhereInput[]
    OR?: StudentResumeWhereInput[]
    NOT?: StudentResumeWhereInput | StudentResumeWhereInput[]
    id?: StringFilter<"StudentResume"> | string
    studentId?: StringFilter<"StudentResume"> | string
    title?: StringFilter<"StudentResume"> | string
    fileUrl?: StringFilter<"StudentResume"> | string
    publicId?: StringNullableFilter<"StudentResume"> | string | null
    fileType?: StringNullableFilter<"StudentResume"> | string | null
    fileSize?: IntNullableFilter<"StudentResume"> | number | null
    isDefault?: BoolFilter<"StudentResume"> | boolean
    createdAt?: DateTimeFilter<"StudentResume"> | Date | string
    updatedAt?: DateTimeFilter<"StudentResume"> | Date | string
    student?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
    applications?: ApplicationListRelationFilter
  }

  export type StudentResumeOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    title?: SortOrder
    fileUrl?: SortOrder
    publicId?: SortOrderInput | SortOrder
    fileType?: SortOrderInput | SortOrder
    fileSize?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: StudentProfileOrderByWithRelationInput
    applications?: ApplicationOrderByRelationAggregateInput
  }

  export type StudentResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StudentResumeWhereInput | StudentResumeWhereInput[]
    OR?: StudentResumeWhereInput[]
    NOT?: StudentResumeWhereInput | StudentResumeWhereInput[]
    studentId?: StringFilter<"StudentResume"> | string
    title?: StringFilter<"StudentResume"> | string
    fileUrl?: StringFilter<"StudentResume"> | string
    publicId?: StringNullableFilter<"StudentResume"> | string | null
    fileType?: StringNullableFilter<"StudentResume"> | string | null
    fileSize?: IntNullableFilter<"StudentResume"> | number | null
    isDefault?: BoolFilter<"StudentResume"> | boolean
    createdAt?: DateTimeFilter<"StudentResume"> | Date | string
    updatedAt?: DateTimeFilter<"StudentResume"> | Date | string
    student?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
    applications?: ApplicationListRelationFilter
  }, "id">

  export type StudentResumeOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    title?: SortOrder
    fileUrl?: SortOrder
    publicId?: SortOrderInput | SortOrder
    fileType?: SortOrderInput | SortOrder
    fileSize?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentResumeCountOrderByAggregateInput
    _avg?: StudentResumeAvgOrderByAggregateInput
    _max?: StudentResumeMaxOrderByAggregateInput
    _min?: StudentResumeMinOrderByAggregateInput
    _sum?: StudentResumeSumOrderByAggregateInput
  }

  export type StudentResumeScalarWhereWithAggregatesInput = {
    AND?: StudentResumeScalarWhereWithAggregatesInput | StudentResumeScalarWhereWithAggregatesInput[]
    OR?: StudentResumeScalarWhereWithAggregatesInput[]
    NOT?: StudentResumeScalarWhereWithAggregatesInput | StudentResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentResume"> | string
    studentId?: StringWithAggregatesFilter<"StudentResume"> | string
    title?: StringWithAggregatesFilter<"StudentResume"> | string
    fileUrl?: StringWithAggregatesFilter<"StudentResume"> | string
    publicId?: StringNullableWithAggregatesFilter<"StudentResume"> | string | null
    fileType?: StringNullableWithAggregatesFilter<"StudentResume"> | string | null
    fileSize?: IntNullableWithAggregatesFilter<"StudentResume"> | number | null
    isDefault?: BoolWithAggregatesFilter<"StudentResume"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"StudentResume"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StudentResume"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    website?: StringNullableFilter<"Company"> | string | null
    logoUrl?: StringNullableFilter<"Company"> | string | null
    images?: StringNullableListFilter<"Company">
    industry?: StringNullableFilter<"Company"> | string | null
    location?: StringNullableFilter<"Company"> | string | null
    description?: StringNullableFilter<"Company"> | string | null
    isVerified?: BoolFilter<"Company"> | boolean
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    recruiters?: RecruiterProfileListRelationFilter
    jobs?: JobListRelationFilter
    offers?: OfferListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    images?: SortOrder
    industry?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recruiters?: RecruiterProfileOrderByRelationAggregateInput
    jobs?: JobOrderByRelationAggregateInput
    offers?: OfferOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    website?: StringNullableFilter<"Company"> | string | null
    logoUrl?: StringNullableFilter<"Company"> | string | null
    images?: StringNullableListFilter<"Company">
    industry?: StringNullableFilter<"Company"> | string | null
    location?: StringNullableFilter<"Company"> | string | null
    description?: StringNullableFilter<"Company"> | string | null
    isVerified?: BoolFilter<"Company"> | boolean
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    recruiters?: RecruiterProfileListRelationFilter
    jobs?: JobListRelationFilter
    offers?: OfferListRelationFilter
  }, "id" | "name">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    images?: SortOrder
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
    images?: StringNullableListFilter<"Company">
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
    collegeId?: StringFilter<"Job"> | string
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
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
    applications?: ApplicationListRelationFilter
    offers?: OfferListRelationFilter
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    collegeId?: SortOrder
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
    college?: CollegeOrderByWithRelationInput
    applications?: ApplicationOrderByRelationAggregateInput
    offers?: OfferOrderByRelationAggregateInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    companyId?: StringFilter<"Job"> | string
    collegeId?: StringFilter<"Job"> | string
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
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
    applications?: ApplicationListRelationFilter
    offers?: OfferListRelationFilter
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    collegeId?: SortOrder
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
    collegeId?: StringWithAggregatesFilter<"Job"> | string
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
    resumeId?: StringNullableFilter<"Application"> | string | null
    resumeUrl?: StringNullableFilter<"Application"> | string | null
    notes?: StringNullableFilter<"Application"> | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
    updatedAt?: DateTimeFilter<"Application"> | Date | string
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    student?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
    resume?: XOR<StudentResumeNullableScalarRelationFilter, StudentResumeWhereInput> | null
    offer?: XOR<OfferNullableScalarRelationFilter, OfferWhereInput> | null
  }

  export type ApplicationOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    resumeId?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    job?: JobOrderByWithRelationInput
    student?: StudentProfileOrderByWithRelationInput
    resume?: StudentResumeOrderByWithRelationInput
    offer?: OfferOrderByWithRelationInput
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
    resumeId?: StringNullableFilter<"Application"> | string | null
    resumeUrl?: StringNullableFilter<"Application"> | string | null
    notes?: StringNullableFilter<"Application"> | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
    updatedAt?: DateTimeFilter<"Application"> | Date | string
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    student?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
    resume?: XOR<StudentResumeNullableScalarRelationFilter, StudentResumeWhereInput> | null
    offer?: XOR<OfferNullableScalarRelationFilter, OfferWhereInput> | null
  }, "id" | "jobId_studentId">

  export type ApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    resumeId?: SortOrderInput | SortOrder
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
    resumeId?: StringNullableWithAggregatesFilter<"Application"> | string | null
    resumeUrl?: StringNullableWithAggregatesFilter<"Application"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Application"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Application"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Application"> | Date | string
  }

  export type OfferWhereInput = {
    AND?: OfferWhereInput | OfferWhereInput[]
    OR?: OfferWhereInput[]
    NOT?: OfferWhereInput | OfferWhereInput[]
    id?: StringFilter<"Offer"> | string
    applicationId?: StringFilter<"Offer"> | string
    studentId?: StringFilter<"Offer"> | string
    jobId?: StringFilter<"Offer"> | string
    companyId?: StringFilter<"Offer"> | string
    collegeId?: StringFilter<"Offer"> | string
    designation?: StringFilter<"Offer"> | string
    salaryPackage?: StringFilter<"Offer"> | string
    location?: StringFilter<"Offer"> | string
    joiningDate?: DateTimeNullableFilter<"Offer"> | Date | string | null
    letterUrl?: StringNullableFilter<"Offer"> | string | null
    notes?: StringNullableFilter<"Offer"> | string | null
    status?: EnumOfferStatusFilter<"Offer"> | $Enums.OfferStatus
    expiresAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    acceptedAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    declinedAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
    application?: XOR<ApplicationScalarRelationFilter, ApplicationWhereInput>
    student?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
  }

  export type OfferOrderByWithRelationInput = {
    id?: SortOrder
    applicationId?: SortOrder
    studentId?: SortOrder
    jobId?: SortOrder
    companyId?: SortOrder
    collegeId?: SortOrder
    designation?: SortOrder
    salaryPackage?: SortOrder
    location?: SortOrder
    joiningDate?: SortOrderInput | SortOrder
    letterUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    declinedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    application?: ApplicationOrderByWithRelationInput
    student?: StudentProfileOrderByWithRelationInput
    job?: JobOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
    college?: CollegeOrderByWithRelationInput
  }

  export type OfferWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    applicationId?: string
    AND?: OfferWhereInput | OfferWhereInput[]
    OR?: OfferWhereInput[]
    NOT?: OfferWhereInput | OfferWhereInput[]
    studentId?: StringFilter<"Offer"> | string
    jobId?: StringFilter<"Offer"> | string
    companyId?: StringFilter<"Offer"> | string
    collegeId?: StringFilter<"Offer"> | string
    designation?: StringFilter<"Offer"> | string
    salaryPackage?: StringFilter<"Offer"> | string
    location?: StringFilter<"Offer"> | string
    joiningDate?: DateTimeNullableFilter<"Offer"> | Date | string | null
    letterUrl?: StringNullableFilter<"Offer"> | string | null
    notes?: StringNullableFilter<"Offer"> | string | null
    status?: EnumOfferStatusFilter<"Offer"> | $Enums.OfferStatus
    expiresAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    acceptedAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    declinedAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
    application?: XOR<ApplicationScalarRelationFilter, ApplicationWhereInput>
    student?: XOR<StudentProfileScalarRelationFilter, StudentProfileWhereInput>
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    college?: XOR<CollegeScalarRelationFilter, CollegeWhereInput>
  }, "id" | "applicationId">

  export type OfferOrderByWithAggregationInput = {
    id?: SortOrder
    applicationId?: SortOrder
    studentId?: SortOrder
    jobId?: SortOrder
    companyId?: SortOrder
    collegeId?: SortOrder
    designation?: SortOrder
    salaryPackage?: SortOrder
    location?: SortOrder
    joiningDate?: SortOrderInput | SortOrder
    letterUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    declinedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OfferCountOrderByAggregateInput
    _max?: OfferMaxOrderByAggregateInput
    _min?: OfferMinOrderByAggregateInput
  }

  export type OfferScalarWhereWithAggregatesInput = {
    AND?: OfferScalarWhereWithAggregatesInput | OfferScalarWhereWithAggregatesInput[]
    OR?: OfferScalarWhereWithAggregatesInput[]
    NOT?: OfferScalarWhereWithAggregatesInput | OfferScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Offer"> | string
    applicationId?: StringWithAggregatesFilter<"Offer"> | string
    studentId?: StringWithAggregatesFilter<"Offer"> | string
    jobId?: StringWithAggregatesFilter<"Offer"> | string
    companyId?: StringWithAggregatesFilter<"Offer"> | string
    collegeId?: StringWithAggregatesFilter<"Offer"> | string
    designation?: StringWithAggregatesFilter<"Offer"> | string
    salaryPackage?: StringWithAggregatesFilter<"Offer"> | string
    location?: StringWithAggregatesFilter<"Offer"> | string
    joiningDate?: DateTimeNullableWithAggregatesFilter<"Offer"> | Date | string | null
    letterUrl?: StringNullableWithAggregatesFilter<"Offer"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Offer"> | string | null
    status?: EnumOfferStatusWithAggregatesFilter<"Offer"> | $Enums.OfferStatus
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Offer"> | Date | string | null
    acceptedAt?: DateTimeNullableWithAggregatesFilter<"Offer"> | Date | string | null
    declinedAt?: DateTimeNullableWithAggregatesFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
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
    tpo?: TpoProfileCreateNestedOneWithoutUserInput
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
    tpo?: TpoProfileUncheckedCreateNestedOneWithoutUserInput
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
    tpo?: TpoProfileUpdateOneWithoutUserNestedInput
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
    tpo?: TpoProfileUncheckedUpdateOneWithoutUserNestedInput
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

  export type CollegeCreateInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tpos?: TpoProfileCreateNestedManyWithoutCollegeInput
    students?: StudentProfileCreateNestedManyWithoutCollegeInput
    jobs?: JobCreateNestedManyWithoutCollegeInput
    offers?: OfferCreateNestedManyWithoutCollegeInput
  }

  export type CollegeUncheckedCreateInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tpos?: TpoProfileUncheckedCreateNestedManyWithoutCollegeInput
    students?: StudentProfileUncheckedCreateNestedManyWithoutCollegeInput
    jobs?: JobUncheckedCreateNestedManyWithoutCollegeInput
    offers?: OfferUncheckedCreateNestedManyWithoutCollegeInput
  }

  export type CollegeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tpos?: TpoProfileUpdateManyWithoutCollegeNestedInput
    students?: StudentProfileUpdateManyWithoutCollegeNestedInput
    jobs?: JobUpdateManyWithoutCollegeNestedInput
    offers?: OfferUpdateManyWithoutCollegeNestedInput
  }

  export type CollegeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tpos?: TpoProfileUncheckedUpdateManyWithoutCollegeNestedInput
    students?: StudentProfileUncheckedUpdateManyWithoutCollegeNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCollegeNestedInput
    offers?: OfferUncheckedUpdateManyWithoutCollegeNestedInput
  }

  export type CollegeCreateManyInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CollegeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollegeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TpoProfileCreateInput = {
    id?: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTpoInput
    college: CollegeCreateNestedOneWithoutTposInput
  }

  export type TpoProfileUncheckedCreateInput = {
    id?: string
    userId: string
    collegeId: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TpoProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTpoNestedInput
    college?: CollegeUpdateOneRequiredWithoutTposNestedInput
  }

  export type TpoProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TpoProfileCreateManyInput = {
    id?: string
    userId: string
    collegeId: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TpoProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TpoProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
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
    college: CollegeCreateNestedOneWithoutStudentsInput
    resumes?: StudentResumeCreateNestedManyWithoutStudentInput
    applications?: ApplicationCreateNestedManyWithoutStudentInput
    offers?: OfferCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileUncheckedCreateInput = {
    id?: string
    userId: string
    collegeId: string
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
    resumes?: StudentResumeUncheckedCreateNestedManyWithoutStudentInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutStudentInput
    offers?: OfferUncheckedCreateNestedManyWithoutStudentInput
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
    college?: CollegeUpdateOneRequiredWithoutStudentsNestedInput
    resumes?: StudentResumeUpdateManyWithoutStudentNestedInput
    applications?: ApplicationUpdateManyWithoutStudentNestedInput
    offers?: OfferUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
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
    resumes?: StudentResumeUncheckedUpdateManyWithoutStudentNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutStudentNestedInput
    offers?: OfferUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileCreateManyInput = {
    id?: string
    userId: string
    collegeId: string
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
    collegeId?: StringFieldUpdateOperationsInput | string
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

  export type StudentResumeCreateInput = {
    id?: string
    title: string
    fileUrl: string
    publicId?: string | null
    fileType?: string | null
    fileSize?: number | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentProfileCreateNestedOneWithoutResumesInput
    applications?: ApplicationCreateNestedManyWithoutResumeInput
  }

  export type StudentResumeUncheckedCreateInput = {
    id?: string
    studentId: string
    title: string
    fileUrl: string
    publicId?: string | null
    fileType?: string | null
    fileSize?: number | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutResumeInput
  }

  export type StudentResumeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentProfileUpdateOneRequiredWithoutResumesNestedInput
    applications?: ApplicationUpdateManyWithoutResumeNestedInput
  }

  export type StudentResumeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type StudentResumeCreateManyInput = {
    id?: string
    studentId: string
    title: string
    fileUrl: string
    publicId?: string | null
    fileType?: string | null
    fileSize?: number | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentResumeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentResumeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    images?: CompanyCreateimagesInput | string[]
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiters?: RecruiterProfileCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
    offers?: OfferCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    images?: CompanyCreateimagesInput | string[]
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiters?: RecruiterProfileUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
    offers?: OfferUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CompanyUpdateimagesInput | string[]
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiters?: RecruiterProfileUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
    offers?: OfferUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CompanyUpdateimagesInput | string[]
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiters?: RecruiterProfileUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
    offers?: OfferUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    images?: CompanyCreateimagesInput | string[]
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
    images?: CompanyUpdateimagesInput | string[]
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
    images?: CompanyUpdateimagesInput | string[]
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
    college: CollegeCreateNestedOneWithoutJobsInput
    applications?: ApplicationCreateNestedManyWithoutJobInput
    offers?: OfferCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    companyId: string
    collegeId: string
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
    offers?: OfferUncheckedCreateNestedManyWithoutJobInput
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
    college?: CollegeUpdateOneRequiredWithoutJobsNestedInput
    applications?: ApplicationUpdateManyWithoutJobNestedInput
    offers?: OfferUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
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
    offers?: OfferUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateManyInput = {
    id?: string
    companyId: string
    collegeId: string
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
    collegeId?: StringFieldUpdateOperationsInput | string
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
    resume?: StudentResumeCreateNestedOneWithoutApplicationsInput
    offer?: OfferCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateInput = {
    id?: string
    jobId: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeId?: string | null
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offer?: OfferUncheckedCreateNestedOneWithoutApplicationInput
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
    resume?: StudentResumeUpdateOneWithoutApplicationsNestedInput
    offer?: OfferUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offer?: OfferUncheckedUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationCreateManyInput = {
    id?: string
    jobId: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeId?: string | null
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
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferCreateInput = {
    id?: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    application: ApplicationCreateNestedOneWithoutOfferInput
    student: StudentProfileCreateNestedOneWithoutOffersInput
    job: JobCreateNestedOneWithoutOffersInput
    company: CompanyCreateNestedOneWithoutOffersInput
    college: CollegeCreateNestedOneWithoutOffersInput
  }

  export type OfferUncheckedCreateInput = {
    id?: string
    applicationId: string
    studentId: string
    jobId: string
    companyId: string
    collegeId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: ApplicationUpdateOneRequiredWithoutOfferNestedInput
    student?: StudentProfileUpdateOneRequiredWithoutOffersNestedInput
    job?: JobUpdateOneRequiredWithoutOffersNestedInput
    company?: CompanyUpdateOneRequiredWithoutOffersNestedInput
    college?: CollegeUpdateOneRequiredWithoutOffersNestedInput
  }

  export type OfferUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferCreateManyInput = {
    id?: string
    applicationId: string
    studentId: string
    jobId: string
    companyId: string
    collegeId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type TpoProfileNullableScalarRelationFilter = {
    is?: TpoProfileWhereInput | null
    isNot?: TpoProfileWhereInput | null
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type TpoProfileListRelationFilter = {
    every?: TpoProfileWhereInput
    some?: TpoProfileWhereInput
    none?: TpoProfileWhereInput
  }

  export type StudentProfileListRelationFilter = {
    every?: StudentProfileWhereInput
    some?: StudentProfileWhereInput
    none?: StudentProfileWhereInput
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type OfferListRelationFilter = {
    every?: OfferWhereInput
    some?: OfferWhereInput
    none?: OfferWhereInput
  }

  export type TpoProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OfferOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CollegeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    domain?: SortOrder
    city?: SortOrder
    state?: SortOrder
    logoUrl?: SortOrder
    images?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollegeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    domain?: SortOrder
    city?: SortOrder
    state?: SortOrder
    logoUrl?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollegeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    domain?: SortOrder
    city?: SortOrder
    state?: SortOrder
    logoUrl?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CollegeScalarRelationFilter = {
    is?: CollegeWhereInput
    isNot?: CollegeWhereInput
  }

  export type TpoProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    collegeId?: SortOrder
    designation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TpoProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    collegeId?: SortOrder
    designation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TpoProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    collegeId?: SortOrder
    designation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type StudentResumeListRelationFilter = {
    every?: StudentResumeWhereInput
    some?: StudentResumeWhereInput
    none?: StudentResumeWhereInput
  }

  export type ApplicationListRelationFilter = {
    every?: ApplicationWhereInput
    some?: ApplicationWhereInput
    none?: ApplicationWhereInput
  }

  export type StudentResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    collegeId?: SortOrder
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
    collegeId?: SortOrder
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
    collegeId?: SortOrder
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StudentProfileScalarRelationFilter = {
    is?: StudentProfileWhereInput
    isNot?: StudentProfileWhereInput
  }

  export type StudentResumeCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    title?: SortOrder
    fileUrl?: SortOrder
    publicId?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentResumeAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type StudentResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    title?: SortOrder
    fileUrl?: SortOrder
    publicId?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentResumeMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    title?: SortOrder
    fileUrl?: SortOrder
    publicId?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentResumeSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type RecruiterProfileListRelationFilter = {
    every?: RecruiterProfileWhereInput
    some?: RecruiterProfileWhereInput
    none?: RecruiterProfileWhereInput
  }

  export type RecruiterProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    website?: SortOrder
    logoUrl?: SortOrder
    images?: SortOrder
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
    collegeId?: SortOrder
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
    collegeId?: SortOrder
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
    collegeId?: SortOrder
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

  export type StudentResumeNullableScalarRelationFilter = {
    is?: StudentResumeWhereInput | null
    isNot?: StudentResumeWhereInput | null
  }

  export type OfferNullableScalarRelationFilter = {
    is?: OfferWhereInput | null
    isNot?: OfferWhereInput | null
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
    resumeId?: SortOrder
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
    resumeId?: SortOrder
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
    resumeId?: SortOrder
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumOfferStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusFilter<$PrismaModel> | $Enums.OfferStatus
  }

  export type ApplicationScalarRelationFilter = {
    is?: ApplicationWhereInput
    isNot?: ApplicationWhereInput
  }

  export type OfferCountOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    studentId?: SortOrder
    jobId?: SortOrder
    companyId?: SortOrder
    collegeId?: SortOrder
    designation?: SortOrder
    salaryPackage?: SortOrder
    location?: SortOrder
    joiningDate?: SortOrder
    letterUrl?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    acceptedAt?: SortOrder
    declinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferMaxOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    studentId?: SortOrder
    jobId?: SortOrder
    companyId?: SortOrder
    collegeId?: SortOrder
    designation?: SortOrder
    salaryPackage?: SortOrder
    location?: SortOrder
    joiningDate?: SortOrder
    letterUrl?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    acceptedAt?: SortOrder
    declinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferMinOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    studentId?: SortOrder
    jobId?: SortOrder
    companyId?: SortOrder
    collegeId?: SortOrder
    designation?: SortOrder
    salaryPackage?: SortOrder
    location?: SortOrder
    joiningDate?: SortOrder
    letterUrl?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    acceptedAt?: SortOrder
    declinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumOfferStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel> | $Enums.OfferStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOfferStatusFilter<$PrismaModel>
    _max?: NestedEnumOfferStatusFilter<$PrismaModel>
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

  export type TpoProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<TpoProfileCreateWithoutUserInput, TpoProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: TpoProfileCreateOrConnectWithoutUserInput
    connect?: TpoProfileWhereUniqueInput
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

  export type TpoProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TpoProfileCreateWithoutUserInput, TpoProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: TpoProfileCreateOrConnectWithoutUserInput
    connect?: TpoProfileWhereUniqueInput
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

  export type TpoProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<TpoProfileCreateWithoutUserInput, TpoProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: TpoProfileCreateOrConnectWithoutUserInput
    upsert?: TpoProfileUpsertWithoutUserInput
    disconnect?: TpoProfileWhereInput | boolean
    delete?: TpoProfileWhereInput | boolean
    connect?: TpoProfileWhereUniqueInput
    update?: XOR<XOR<TpoProfileUpdateToOneWithWhereWithoutUserInput, TpoProfileUpdateWithoutUserInput>, TpoProfileUncheckedUpdateWithoutUserInput>
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

  export type TpoProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TpoProfileCreateWithoutUserInput, TpoProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: TpoProfileCreateOrConnectWithoutUserInput
    upsert?: TpoProfileUpsertWithoutUserInput
    disconnect?: TpoProfileWhereInput | boolean
    delete?: TpoProfileWhereInput | boolean
    connect?: TpoProfileWhereUniqueInput
    update?: XOR<XOR<TpoProfileUpdateToOneWithWhereWithoutUserInput, TpoProfileUpdateWithoutUserInput>, TpoProfileUncheckedUpdateWithoutUserInput>
  }

  export type CollegeCreateimagesInput = {
    set: string[]
  }

  export type TpoProfileCreateNestedManyWithoutCollegeInput = {
    create?: XOR<TpoProfileCreateWithoutCollegeInput, TpoProfileUncheckedCreateWithoutCollegeInput> | TpoProfileCreateWithoutCollegeInput[] | TpoProfileUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: TpoProfileCreateOrConnectWithoutCollegeInput | TpoProfileCreateOrConnectWithoutCollegeInput[]
    createMany?: TpoProfileCreateManyCollegeInputEnvelope
    connect?: TpoProfileWhereUniqueInput | TpoProfileWhereUniqueInput[]
  }

  export type StudentProfileCreateNestedManyWithoutCollegeInput = {
    create?: XOR<StudentProfileCreateWithoutCollegeInput, StudentProfileUncheckedCreateWithoutCollegeInput> | StudentProfileCreateWithoutCollegeInput[] | StudentProfileUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: StudentProfileCreateOrConnectWithoutCollegeInput | StudentProfileCreateOrConnectWithoutCollegeInput[]
    createMany?: StudentProfileCreateManyCollegeInputEnvelope
    connect?: StudentProfileWhereUniqueInput | StudentProfileWhereUniqueInput[]
  }

  export type JobCreateNestedManyWithoutCollegeInput = {
    create?: XOR<JobCreateWithoutCollegeInput, JobUncheckedCreateWithoutCollegeInput> | JobCreateWithoutCollegeInput[] | JobUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCollegeInput | JobCreateOrConnectWithoutCollegeInput[]
    createMany?: JobCreateManyCollegeInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type OfferCreateNestedManyWithoutCollegeInput = {
    create?: XOR<OfferCreateWithoutCollegeInput, OfferUncheckedCreateWithoutCollegeInput> | OfferCreateWithoutCollegeInput[] | OfferUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutCollegeInput | OfferCreateOrConnectWithoutCollegeInput[]
    createMany?: OfferCreateManyCollegeInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type TpoProfileUncheckedCreateNestedManyWithoutCollegeInput = {
    create?: XOR<TpoProfileCreateWithoutCollegeInput, TpoProfileUncheckedCreateWithoutCollegeInput> | TpoProfileCreateWithoutCollegeInput[] | TpoProfileUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: TpoProfileCreateOrConnectWithoutCollegeInput | TpoProfileCreateOrConnectWithoutCollegeInput[]
    createMany?: TpoProfileCreateManyCollegeInputEnvelope
    connect?: TpoProfileWhereUniqueInput | TpoProfileWhereUniqueInput[]
  }

  export type StudentProfileUncheckedCreateNestedManyWithoutCollegeInput = {
    create?: XOR<StudentProfileCreateWithoutCollegeInput, StudentProfileUncheckedCreateWithoutCollegeInput> | StudentProfileCreateWithoutCollegeInput[] | StudentProfileUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: StudentProfileCreateOrConnectWithoutCollegeInput | StudentProfileCreateOrConnectWithoutCollegeInput[]
    createMany?: StudentProfileCreateManyCollegeInputEnvelope
    connect?: StudentProfileWhereUniqueInput | StudentProfileWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutCollegeInput = {
    create?: XOR<JobCreateWithoutCollegeInput, JobUncheckedCreateWithoutCollegeInput> | JobCreateWithoutCollegeInput[] | JobUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCollegeInput | JobCreateOrConnectWithoutCollegeInput[]
    createMany?: JobCreateManyCollegeInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type OfferUncheckedCreateNestedManyWithoutCollegeInput = {
    create?: XOR<OfferCreateWithoutCollegeInput, OfferUncheckedCreateWithoutCollegeInput> | OfferCreateWithoutCollegeInput[] | OfferUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutCollegeInput | OfferCreateOrConnectWithoutCollegeInput[]
    createMany?: OfferCreateManyCollegeInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type CollegeUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TpoProfileUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<TpoProfileCreateWithoutCollegeInput, TpoProfileUncheckedCreateWithoutCollegeInput> | TpoProfileCreateWithoutCollegeInput[] | TpoProfileUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: TpoProfileCreateOrConnectWithoutCollegeInput | TpoProfileCreateOrConnectWithoutCollegeInput[]
    upsert?: TpoProfileUpsertWithWhereUniqueWithoutCollegeInput | TpoProfileUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: TpoProfileCreateManyCollegeInputEnvelope
    set?: TpoProfileWhereUniqueInput | TpoProfileWhereUniqueInput[]
    disconnect?: TpoProfileWhereUniqueInput | TpoProfileWhereUniqueInput[]
    delete?: TpoProfileWhereUniqueInput | TpoProfileWhereUniqueInput[]
    connect?: TpoProfileWhereUniqueInput | TpoProfileWhereUniqueInput[]
    update?: TpoProfileUpdateWithWhereUniqueWithoutCollegeInput | TpoProfileUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: TpoProfileUpdateManyWithWhereWithoutCollegeInput | TpoProfileUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: TpoProfileScalarWhereInput | TpoProfileScalarWhereInput[]
  }

  export type StudentProfileUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<StudentProfileCreateWithoutCollegeInput, StudentProfileUncheckedCreateWithoutCollegeInput> | StudentProfileCreateWithoutCollegeInput[] | StudentProfileUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: StudentProfileCreateOrConnectWithoutCollegeInput | StudentProfileCreateOrConnectWithoutCollegeInput[]
    upsert?: StudentProfileUpsertWithWhereUniqueWithoutCollegeInput | StudentProfileUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: StudentProfileCreateManyCollegeInputEnvelope
    set?: StudentProfileWhereUniqueInput | StudentProfileWhereUniqueInput[]
    disconnect?: StudentProfileWhereUniqueInput | StudentProfileWhereUniqueInput[]
    delete?: StudentProfileWhereUniqueInput | StudentProfileWhereUniqueInput[]
    connect?: StudentProfileWhereUniqueInput | StudentProfileWhereUniqueInput[]
    update?: StudentProfileUpdateWithWhereUniqueWithoutCollegeInput | StudentProfileUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: StudentProfileUpdateManyWithWhereWithoutCollegeInput | StudentProfileUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: StudentProfileScalarWhereInput | StudentProfileScalarWhereInput[]
  }

  export type JobUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<JobCreateWithoutCollegeInput, JobUncheckedCreateWithoutCollegeInput> | JobCreateWithoutCollegeInput[] | JobUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCollegeInput | JobCreateOrConnectWithoutCollegeInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCollegeInput | JobUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: JobCreateManyCollegeInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCollegeInput | JobUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCollegeInput | JobUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type OfferUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<OfferCreateWithoutCollegeInput, OfferUncheckedCreateWithoutCollegeInput> | OfferCreateWithoutCollegeInput[] | OfferUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutCollegeInput | OfferCreateOrConnectWithoutCollegeInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutCollegeInput | OfferUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: OfferCreateManyCollegeInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutCollegeInput | OfferUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutCollegeInput | OfferUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type TpoProfileUncheckedUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<TpoProfileCreateWithoutCollegeInput, TpoProfileUncheckedCreateWithoutCollegeInput> | TpoProfileCreateWithoutCollegeInput[] | TpoProfileUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: TpoProfileCreateOrConnectWithoutCollegeInput | TpoProfileCreateOrConnectWithoutCollegeInput[]
    upsert?: TpoProfileUpsertWithWhereUniqueWithoutCollegeInput | TpoProfileUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: TpoProfileCreateManyCollegeInputEnvelope
    set?: TpoProfileWhereUniqueInput | TpoProfileWhereUniqueInput[]
    disconnect?: TpoProfileWhereUniqueInput | TpoProfileWhereUniqueInput[]
    delete?: TpoProfileWhereUniqueInput | TpoProfileWhereUniqueInput[]
    connect?: TpoProfileWhereUniqueInput | TpoProfileWhereUniqueInput[]
    update?: TpoProfileUpdateWithWhereUniqueWithoutCollegeInput | TpoProfileUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: TpoProfileUpdateManyWithWhereWithoutCollegeInput | TpoProfileUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: TpoProfileScalarWhereInput | TpoProfileScalarWhereInput[]
  }

  export type StudentProfileUncheckedUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<StudentProfileCreateWithoutCollegeInput, StudentProfileUncheckedCreateWithoutCollegeInput> | StudentProfileCreateWithoutCollegeInput[] | StudentProfileUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: StudentProfileCreateOrConnectWithoutCollegeInput | StudentProfileCreateOrConnectWithoutCollegeInput[]
    upsert?: StudentProfileUpsertWithWhereUniqueWithoutCollegeInput | StudentProfileUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: StudentProfileCreateManyCollegeInputEnvelope
    set?: StudentProfileWhereUniqueInput | StudentProfileWhereUniqueInput[]
    disconnect?: StudentProfileWhereUniqueInput | StudentProfileWhereUniqueInput[]
    delete?: StudentProfileWhereUniqueInput | StudentProfileWhereUniqueInput[]
    connect?: StudentProfileWhereUniqueInput | StudentProfileWhereUniqueInput[]
    update?: StudentProfileUpdateWithWhereUniqueWithoutCollegeInput | StudentProfileUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: StudentProfileUpdateManyWithWhereWithoutCollegeInput | StudentProfileUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: StudentProfileScalarWhereInput | StudentProfileScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<JobCreateWithoutCollegeInput, JobUncheckedCreateWithoutCollegeInput> | JobCreateWithoutCollegeInput[] | JobUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCollegeInput | JobCreateOrConnectWithoutCollegeInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCollegeInput | JobUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: JobCreateManyCollegeInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCollegeInput | JobUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCollegeInput | JobUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type OfferUncheckedUpdateManyWithoutCollegeNestedInput = {
    create?: XOR<OfferCreateWithoutCollegeInput, OfferUncheckedCreateWithoutCollegeInput> | OfferCreateWithoutCollegeInput[] | OfferUncheckedCreateWithoutCollegeInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutCollegeInput | OfferCreateOrConnectWithoutCollegeInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutCollegeInput | OfferUpsertWithWhereUniqueWithoutCollegeInput[]
    createMany?: OfferCreateManyCollegeInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutCollegeInput | OfferUpdateWithWhereUniqueWithoutCollegeInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutCollegeInput | OfferUpdateManyWithWhereWithoutCollegeInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTpoInput = {
    create?: XOR<UserCreateWithoutTpoInput, UserUncheckedCreateWithoutTpoInput>
    connectOrCreate?: UserCreateOrConnectWithoutTpoInput
    connect?: UserWhereUniqueInput
  }

  export type CollegeCreateNestedOneWithoutTposInput = {
    create?: XOR<CollegeCreateWithoutTposInput, CollegeUncheckedCreateWithoutTposInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutTposInput
    connect?: CollegeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTpoNestedInput = {
    create?: XOR<UserCreateWithoutTpoInput, UserUncheckedCreateWithoutTpoInput>
    connectOrCreate?: UserCreateOrConnectWithoutTpoInput
    upsert?: UserUpsertWithoutTpoInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTpoInput, UserUpdateWithoutTpoInput>, UserUncheckedUpdateWithoutTpoInput>
  }

  export type CollegeUpdateOneRequiredWithoutTposNestedInput = {
    create?: XOR<CollegeCreateWithoutTposInput, CollegeUncheckedCreateWithoutTposInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutTposInput
    upsert?: CollegeUpsertWithoutTposInput
    connect?: CollegeWhereUniqueInput
    update?: XOR<XOR<CollegeUpdateToOneWithWhereWithoutTposInput, CollegeUpdateWithoutTposInput>, CollegeUncheckedUpdateWithoutTposInput>
  }

  export type StudentProfileCreateskillsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutStudentInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    connect?: UserWhereUniqueInput
  }

  export type CollegeCreateNestedOneWithoutStudentsInput = {
    create?: XOR<CollegeCreateWithoutStudentsInput, CollegeUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutStudentsInput
    connect?: CollegeWhereUniqueInput
  }

  export type StudentResumeCreateNestedManyWithoutStudentInput = {
    create?: XOR<StudentResumeCreateWithoutStudentInput, StudentResumeUncheckedCreateWithoutStudentInput> | StudentResumeCreateWithoutStudentInput[] | StudentResumeUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentResumeCreateOrConnectWithoutStudentInput | StudentResumeCreateOrConnectWithoutStudentInput[]
    createMany?: StudentResumeCreateManyStudentInputEnvelope
    connect?: StudentResumeWhereUniqueInput | StudentResumeWhereUniqueInput[]
  }

  export type ApplicationCreateNestedManyWithoutStudentInput = {
    create?: XOR<ApplicationCreateWithoutStudentInput, ApplicationUncheckedCreateWithoutStudentInput> | ApplicationCreateWithoutStudentInput[] | ApplicationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutStudentInput | ApplicationCreateOrConnectWithoutStudentInput[]
    createMany?: ApplicationCreateManyStudentInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type OfferCreateNestedManyWithoutStudentInput = {
    create?: XOR<OfferCreateWithoutStudentInput, OfferUncheckedCreateWithoutStudentInput> | OfferCreateWithoutStudentInput[] | OfferUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutStudentInput | OfferCreateOrConnectWithoutStudentInput[]
    createMany?: OfferCreateManyStudentInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type StudentResumeUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<StudentResumeCreateWithoutStudentInput, StudentResumeUncheckedCreateWithoutStudentInput> | StudentResumeCreateWithoutStudentInput[] | StudentResumeUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentResumeCreateOrConnectWithoutStudentInput | StudentResumeCreateOrConnectWithoutStudentInput[]
    createMany?: StudentResumeCreateManyStudentInputEnvelope
    connect?: StudentResumeWhereUniqueInput | StudentResumeWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ApplicationCreateWithoutStudentInput, ApplicationUncheckedCreateWithoutStudentInput> | ApplicationCreateWithoutStudentInput[] | ApplicationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutStudentInput | ApplicationCreateOrConnectWithoutStudentInput[]
    createMany?: ApplicationCreateManyStudentInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type OfferUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<OfferCreateWithoutStudentInput, OfferUncheckedCreateWithoutStudentInput> | OfferCreateWithoutStudentInput[] | OfferUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutStudentInput | OfferCreateOrConnectWithoutStudentInput[]
    createMany?: OfferCreateManyStudentInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
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

  export type CollegeUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: XOR<CollegeCreateWithoutStudentsInput, CollegeUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutStudentsInput
    upsert?: CollegeUpsertWithoutStudentsInput
    connect?: CollegeWhereUniqueInput
    update?: XOR<XOR<CollegeUpdateToOneWithWhereWithoutStudentsInput, CollegeUpdateWithoutStudentsInput>, CollegeUncheckedUpdateWithoutStudentsInput>
  }

  export type StudentResumeUpdateManyWithoutStudentNestedInput = {
    create?: XOR<StudentResumeCreateWithoutStudentInput, StudentResumeUncheckedCreateWithoutStudentInput> | StudentResumeCreateWithoutStudentInput[] | StudentResumeUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentResumeCreateOrConnectWithoutStudentInput | StudentResumeCreateOrConnectWithoutStudentInput[]
    upsert?: StudentResumeUpsertWithWhereUniqueWithoutStudentInput | StudentResumeUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: StudentResumeCreateManyStudentInputEnvelope
    set?: StudentResumeWhereUniqueInput | StudentResumeWhereUniqueInput[]
    disconnect?: StudentResumeWhereUniqueInput | StudentResumeWhereUniqueInput[]
    delete?: StudentResumeWhereUniqueInput | StudentResumeWhereUniqueInput[]
    connect?: StudentResumeWhereUniqueInput | StudentResumeWhereUniqueInput[]
    update?: StudentResumeUpdateWithWhereUniqueWithoutStudentInput | StudentResumeUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: StudentResumeUpdateManyWithWhereWithoutStudentInput | StudentResumeUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: StudentResumeScalarWhereInput | StudentResumeScalarWhereInput[]
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

  export type OfferUpdateManyWithoutStudentNestedInput = {
    create?: XOR<OfferCreateWithoutStudentInput, OfferUncheckedCreateWithoutStudentInput> | OfferCreateWithoutStudentInput[] | OfferUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutStudentInput | OfferCreateOrConnectWithoutStudentInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutStudentInput | OfferUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: OfferCreateManyStudentInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutStudentInput | OfferUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutStudentInput | OfferUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type StudentResumeUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<StudentResumeCreateWithoutStudentInput, StudentResumeUncheckedCreateWithoutStudentInput> | StudentResumeCreateWithoutStudentInput[] | StudentResumeUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentResumeCreateOrConnectWithoutStudentInput | StudentResumeCreateOrConnectWithoutStudentInput[]
    upsert?: StudentResumeUpsertWithWhereUniqueWithoutStudentInput | StudentResumeUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: StudentResumeCreateManyStudentInputEnvelope
    set?: StudentResumeWhereUniqueInput | StudentResumeWhereUniqueInput[]
    disconnect?: StudentResumeWhereUniqueInput | StudentResumeWhereUniqueInput[]
    delete?: StudentResumeWhereUniqueInput | StudentResumeWhereUniqueInput[]
    connect?: StudentResumeWhereUniqueInput | StudentResumeWhereUniqueInput[]
    update?: StudentResumeUpdateWithWhereUniqueWithoutStudentInput | StudentResumeUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: StudentResumeUpdateManyWithWhereWithoutStudentInput | StudentResumeUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: StudentResumeScalarWhereInput | StudentResumeScalarWhereInput[]
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

  export type OfferUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<OfferCreateWithoutStudentInput, OfferUncheckedCreateWithoutStudentInput> | OfferCreateWithoutStudentInput[] | OfferUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutStudentInput | OfferCreateOrConnectWithoutStudentInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutStudentInput | OfferUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: OfferCreateManyStudentInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutStudentInput | OfferUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutStudentInput | OfferUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type StudentProfileCreateNestedOneWithoutResumesInput = {
    create?: XOR<StudentProfileCreateWithoutResumesInput, StudentProfileUncheckedCreateWithoutResumesInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutResumesInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type ApplicationCreateNestedManyWithoutResumeInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput> | ApplicationCreateWithoutResumeInput[] | ApplicationUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput | ApplicationCreateOrConnectWithoutResumeInput[]
    createMany?: ApplicationCreateManyResumeInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutResumeInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput> | ApplicationCreateWithoutResumeInput[] | ApplicationUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput | ApplicationCreateOrConnectWithoutResumeInput[]
    createMany?: ApplicationCreateManyResumeInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StudentProfileUpdateOneRequiredWithoutResumesNestedInput = {
    create?: XOR<StudentProfileCreateWithoutResumesInput, StudentProfileUncheckedCreateWithoutResumesInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutResumesInput
    upsert?: StudentProfileUpsertWithoutResumesInput
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutResumesInput, StudentProfileUpdateWithoutResumesInput>, StudentProfileUncheckedUpdateWithoutResumesInput>
  }

  export type ApplicationUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput> | ApplicationCreateWithoutResumeInput[] | ApplicationUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput | ApplicationCreateOrConnectWithoutResumeInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutResumeInput | ApplicationUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ApplicationCreateManyResumeInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutResumeInput | ApplicationUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutResumeInput | ApplicationUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput> | ApplicationCreateWithoutResumeInput[] | ApplicationUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput | ApplicationCreateOrConnectWithoutResumeInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutResumeInput | ApplicationUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ApplicationCreateManyResumeInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutResumeInput | ApplicationUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutResumeInput | ApplicationUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type CompanyCreateimagesInput = {
    set: string[]
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

  export type OfferCreateNestedManyWithoutCompanyInput = {
    create?: XOR<OfferCreateWithoutCompanyInput, OfferUncheckedCreateWithoutCompanyInput> | OfferCreateWithoutCompanyInput[] | OfferUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutCompanyInput | OfferCreateOrConnectWithoutCompanyInput[]
    createMany?: OfferCreateManyCompanyInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
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

  export type OfferUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<OfferCreateWithoutCompanyInput, OfferUncheckedCreateWithoutCompanyInput> | OfferCreateWithoutCompanyInput[] | OfferUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutCompanyInput | OfferCreateOrConnectWithoutCompanyInput[]
    createMany?: OfferCreateManyCompanyInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type CompanyUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
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

  export type OfferUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<OfferCreateWithoutCompanyInput, OfferUncheckedCreateWithoutCompanyInput> | OfferCreateWithoutCompanyInput[] | OfferUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutCompanyInput | OfferCreateOrConnectWithoutCompanyInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutCompanyInput | OfferUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: OfferCreateManyCompanyInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutCompanyInput | OfferUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutCompanyInput | OfferUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
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

  export type OfferUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<OfferCreateWithoutCompanyInput, OfferUncheckedCreateWithoutCompanyInput> | OfferCreateWithoutCompanyInput[] | OfferUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutCompanyInput | OfferCreateOrConnectWithoutCompanyInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutCompanyInput | OfferUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: OfferCreateManyCompanyInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutCompanyInput | OfferUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutCompanyInput | OfferUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
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

  export type CollegeCreateNestedOneWithoutJobsInput = {
    create?: XOR<CollegeCreateWithoutJobsInput, CollegeUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutJobsInput
    connect?: CollegeWhereUniqueInput
  }

  export type ApplicationCreateNestedManyWithoutJobInput = {
    create?: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput> | ApplicationCreateWithoutJobInput[] | ApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutJobInput | ApplicationCreateOrConnectWithoutJobInput[]
    createMany?: ApplicationCreateManyJobInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type OfferCreateNestedManyWithoutJobInput = {
    create?: XOR<OfferCreateWithoutJobInput, OfferUncheckedCreateWithoutJobInput> | OfferCreateWithoutJobInput[] | OfferUncheckedCreateWithoutJobInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutJobInput | OfferCreateOrConnectWithoutJobInput[]
    createMany?: OfferCreateManyJobInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput> | ApplicationCreateWithoutJobInput[] | ApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutJobInput | ApplicationCreateOrConnectWithoutJobInput[]
    createMany?: ApplicationCreateManyJobInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type OfferUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<OfferCreateWithoutJobInput, OfferUncheckedCreateWithoutJobInput> | OfferCreateWithoutJobInput[] | OfferUncheckedCreateWithoutJobInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutJobInput | OfferCreateOrConnectWithoutJobInput[]
    createMany?: OfferCreateManyJobInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
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

  export type CollegeUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<CollegeCreateWithoutJobsInput, CollegeUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutJobsInput
    upsert?: CollegeUpsertWithoutJobsInput
    connect?: CollegeWhereUniqueInput
    update?: XOR<XOR<CollegeUpdateToOneWithWhereWithoutJobsInput, CollegeUpdateWithoutJobsInput>, CollegeUncheckedUpdateWithoutJobsInput>
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

  export type OfferUpdateManyWithoutJobNestedInput = {
    create?: XOR<OfferCreateWithoutJobInput, OfferUncheckedCreateWithoutJobInput> | OfferCreateWithoutJobInput[] | OfferUncheckedCreateWithoutJobInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutJobInput | OfferCreateOrConnectWithoutJobInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutJobInput | OfferUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: OfferCreateManyJobInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutJobInput | OfferUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutJobInput | OfferUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
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

  export type OfferUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<OfferCreateWithoutJobInput, OfferUncheckedCreateWithoutJobInput> | OfferCreateWithoutJobInput[] | OfferUncheckedCreateWithoutJobInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutJobInput | OfferCreateOrConnectWithoutJobInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutJobInput | OfferUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: OfferCreateManyJobInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutJobInput | OfferUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutJobInput | OfferUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
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

  export type StudentResumeCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<StudentResumeCreateWithoutApplicationsInput, StudentResumeUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: StudentResumeCreateOrConnectWithoutApplicationsInput
    connect?: StudentResumeWhereUniqueInput
  }

  export type OfferCreateNestedOneWithoutApplicationInput = {
    create?: XOR<OfferCreateWithoutApplicationInput, OfferUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: OfferCreateOrConnectWithoutApplicationInput
    connect?: OfferWhereUniqueInput
  }

  export type OfferUncheckedCreateNestedOneWithoutApplicationInput = {
    create?: XOR<OfferCreateWithoutApplicationInput, OfferUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: OfferCreateOrConnectWithoutApplicationInput
    connect?: OfferWhereUniqueInput
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

  export type StudentResumeUpdateOneWithoutApplicationsNestedInput = {
    create?: XOR<StudentResumeCreateWithoutApplicationsInput, StudentResumeUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: StudentResumeCreateOrConnectWithoutApplicationsInput
    upsert?: StudentResumeUpsertWithoutApplicationsInput
    disconnect?: StudentResumeWhereInput | boolean
    delete?: StudentResumeWhereInput | boolean
    connect?: StudentResumeWhereUniqueInput
    update?: XOR<XOR<StudentResumeUpdateToOneWithWhereWithoutApplicationsInput, StudentResumeUpdateWithoutApplicationsInput>, StudentResumeUncheckedUpdateWithoutApplicationsInput>
  }

  export type OfferUpdateOneWithoutApplicationNestedInput = {
    create?: XOR<OfferCreateWithoutApplicationInput, OfferUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: OfferCreateOrConnectWithoutApplicationInput
    upsert?: OfferUpsertWithoutApplicationInput
    disconnect?: OfferWhereInput | boolean
    delete?: OfferWhereInput | boolean
    connect?: OfferWhereUniqueInput
    update?: XOR<XOR<OfferUpdateToOneWithWhereWithoutApplicationInput, OfferUpdateWithoutApplicationInput>, OfferUncheckedUpdateWithoutApplicationInput>
  }

  export type OfferUncheckedUpdateOneWithoutApplicationNestedInput = {
    create?: XOR<OfferCreateWithoutApplicationInput, OfferUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: OfferCreateOrConnectWithoutApplicationInput
    upsert?: OfferUpsertWithoutApplicationInput
    disconnect?: OfferWhereInput | boolean
    delete?: OfferWhereInput | boolean
    connect?: OfferWhereUniqueInput
    update?: XOR<XOR<OfferUpdateToOneWithWhereWithoutApplicationInput, OfferUpdateWithoutApplicationInput>, OfferUncheckedUpdateWithoutApplicationInput>
  }

  export type ApplicationCreateNestedOneWithoutOfferInput = {
    create?: XOR<ApplicationCreateWithoutOfferInput, ApplicationUncheckedCreateWithoutOfferInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutOfferInput
    connect?: ApplicationWhereUniqueInput
  }

  export type StudentProfileCreateNestedOneWithoutOffersInput = {
    create?: XOR<StudentProfileCreateWithoutOffersInput, StudentProfileUncheckedCreateWithoutOffersInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutOffersInput
    connect?: StudentProfileWhereUniqueInput
  }

  export type JobCreateNestedOneWithoutOffersInput = {
    create?: XOR<JobCreateWithoutOffersInput, JobUncheckedCreateWithoutOffersInput>
    connectOrCreate?: JobCreateOrConnectWithoutOffersInput
    connect?: JobWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutOffersInput = {
    create?: XOR<CompanyCreateWithoutOffersInput, CompanyUncheckedCreateWithoutOffersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutOffersInput
    connect?: CompanyWhereUniqueInput
  }

  export type CollegeCreateNestedOneWithoutOffersInput = {
    create?: XOR<CollegeCreateWithoutOffersInput, CollegeUncheckedCreateWithoutOffersInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutOffersInput
    connect?: CollegeWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumOfferStatusFieldUpdateOperationsInput = {
    set?: $Enums.OfferStatus
  }

  export type ApplicationUpdateOneRequiredWithoutOfferNestedInput = {
    create?: XOR<ApplicationCreateWithoutOfferInput, ApplicationUncheckedCreateWithoutOfferInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutOfferInput
    upsert?: ApplicationUpsertWithoutOfferInput
    connect?: ApplicationWhereUniqueInput
    update?: XOR<XOR<ApplicationUpdateToOneWithWhereWithoutOfferInput, ApplicationUpdateWithoutOfferInput>, ApplicationUncheckedUpdateWithoutOfferInput>
  }

  export type StudentProfileUpdateOneRequiredWithoutOffersNestedInput = {
    create?: XOR<StudentProfileCreateWithoutOffersInput, StudentProfileUncheckedCreateWithoutOffersInput>
    connectOrCreate?: StudentProfileCreateOrConnectWithoutOffersInput
    upsert?: StudentProfileUpsertWithoutOffersInput
    connect?: StudentProfileWhereUniqueInput
    update?: XOR<XOR<StudentProfileUpdateToOneWithWhereWithoutOffersInput, StudentProfileUpdateWithoutOffersInput>, StudentProfileUncheckedUpdateWithoutOffersInput>
  }

  export type JobUpdateOneRequiredWithoutOffersNestedInput = {
    create?: XOR<JobCreateWithoutOffersInput, JobUncheckedCreateWithoutOffersInput>
    connectOrCreate?: JobCreateOrConnectWithoutOffersInput
    upsert?: JobUpsertWithoutOffersInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutOffersInput, JobUpdateWithoutOffersInput>, JobUncheckedUpdateWithoutOffersInput>
  }

  export type CompanyUpdateOneRequiredWithoutOffersNestedInput = {
    create?: XOR<CompanyCreateWithoutOffersInput, CompanyUncheckedCreateWithoutOffersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutOffersInput
    upsert?: CompanyUpsertWithoutOffersInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutOffersInput, CompanyUpdateWithoutOffersInput>, CompanyUncheckedUpdateWithoutOffersInput>
  }

  export type CollegeUpdateOneRequiredWithoutOffersNestedInput = {
    create?: XOR<CollegeCreateWithoutOffersInput, CollegeUncheckedCreateWithoutOffersInput>
    connectOrCreate?: CollegeCreateOrConnectWithoutOffersInput
    upsert?: CollegeUpsertWithoutOffersInput
    connect?: CollegeWhereUniqueInput
    update?: XOR<XOR<CollegeUpdateToOneWithWhereWithoutOffersInput, CollegeUpdateWithoutOffersInput>, CollegeUncheckedUpdateWithoutOffersInput>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumOfferStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusFilter<$PrismaModel> | $Enums.OfferStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel> | $Enums.OfferStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOfferStatusFilter<$PrismaModel>
    _max?: NestedEnumOfferStatusFilter<$PrismaModel>
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
    college: CollegeCreateNestedOneWithoutStudentsInput
    resumes?: StudentResumeCreateNestedManyWithoutStudentInput
    applications?: ApplicationCreateNestedManyWithoutStudentInput
    offers?: OfferCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileUncheckedCreateWithoutUserInput = {
    id?: string
    collegeId: string
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
    resumes?: StudentResumeUncheckedCreateNestedManyWithoutStudentInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutStudentInput
    offers?: OfferUncheckedCreateNestedManyWithoutStudentInput
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

  export type TpoProfileCreateWithoutUserInput = {
    id?: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    college: CollegeCreateNestedOneWithoutTposInput
  }

  export type TpoProfileUncheckedCreateWithoutUserInput = {
    id?: string
    collegeId: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TpoProfileCreateOrConnectWithoutUserInput = {
    where: TpoProfileWhereUniqueInput
    create: XOR<TpoProfileCreateWithoutUserInput, TpoProfileUncheckedCreateWithoutUserInput>
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
    college?: CollegeUpdateOneRequiredWithoutStudentsNestedInput
    resumes?: StudentResumeUpdateManyWithoutStudentNestedInput
    applications?: ApplicationUpdateManyWithoutStudentNestedInput
    offers?: OfferUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
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
    resumes?: StudentResumeUncheckedUpdateManyWithoutStudentNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutStudentNestedInput
    offers?: OfferUncheckedUpdateManyWithoutStudentNestedInput
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

  export type TpoProfileUpsertWithoutUserInput = {
    update: XOR<TpoProfileUpdateWithoutUserInput, TpoProfileUncheckedUpdateWithoutUserInput>
    create: XOR<TpoProfileCreateWithoutUserInput, TpoProfileUncheckedCreateWithoutUserInput>
    where?: TpoProfileWhereInput
  }

  export type TpoProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: TpoProfileWhereInput
    data: XOR<TpoProfileUpdateWithoutUserInput, TpoProfileUncheckedUpdateWithoutUserInput>
  }

  export type TpoProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    college?: CollegeUpdateOneRequiredWithoutTposNestedInput
  }

  export type TpoProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TpoProfileCreateWithoutCollegeInput = {
    id?: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTpoInput
  }

  export type TpoProfileUncheckedCreateWithoutCollegeInput = {
    id?: string
    userId: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TpoProfileCreateOrConnectWithoutCollegeInput = {
    where: TpoProfileWhereUniqueInput
    create: XOR<TpoProfileCreateWithoutCollegeInput, TpoProfileUncheckedCreateWithoutCollegeInput>
  }

  export type TpoProfileCreateManyCollegeInputEnvelope = {
    data: TpoProfileCreateManyCollegeInput | TpoProfileCreateManyCollegeInput[]
    skipDuplicates?: boolean
  }

  export type StudentProfileCreateWithoutCollegeInput = {
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
    resumes?: StudentResumeCreateNestedManyWithoutStudentInput
    applications?: ApplicationCreateNestedManyWithoutStudentInput
    offers?: OfferCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileUncheckedCreateWithoutCollegeInput = {
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
    resumes?: StudentResumeUncheckedCreateNestedManyWithoutStudentInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutStudentInput
    offers?: OfferUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileCreateOrConnectWithoutCollegeInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutCollegeInput, StudentProfileUncheckedCreateWithoutCollegeInput>
  }

  export type StudentProfileCreateManyCollegeInputEnvelope = {
    data: StudentProfileCreateManyCollegeInput | StudentProfileCreateManyCollegeInput[]
    skipDuplicates?: boolean
  }

  export type JobCreateWithoutCollegeInput = {
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
    offers?: OfferCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutCollegeInput = {
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
    offers?: OfferUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutCollegeInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutCollegeInput, JobUncheckedCreateWithoutCollegeInput>
  }

  export type JobCreateManyCollegeInputEnvelope = {
    data: JobCreateManyCollegeInput | JobCreateManyCollegeInput[]
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutCollegeInput = {
    id?: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    application: ApplicationCreateNestedOneWithoutOfferInput
    student: StudentProfileCreateNestedOneWithoutOffersInput
    job: JobCreateNestedOneWithoutOffersInput
    company: CompanyCreateNestedOneWithoutOffersInput
  }

  export type OfferUncheckedCreateWithoutCollegeInput = {
    id?: string
    applicationId: string
    studentId: string
    jobId: string
    companyId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateOrConnectWithoutCollegeInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutCollegeInput, OfferUncheckedCreateWithoutCollegeInput>
  }

  export type OfferCreateManyCollegeInputEnvelope = {
    data: OfferCreateManyCollegeInput | OfferCreateManyCollegeInput[]
    skipDuplicates?: boolean
  }

  export type TpoProfileUpsertWithWhereUniqueWithoutCollegeInput = {
    where: TpoProfileWhereUniqueInput
    update: XOR<TpoProfileUpdateWithoutCollegeInput, TpoProfileUncheckedUpdateWithoutCollegeInput>
    create: XOR<TpoProfileCreateWithoutCollegeInput, TpoProfileUncheckedCreateWithoutCollegeInput>
  }

  export type TpoProfileUpdateWithWhereUniqueWithoutCollegeInput = {
    where: TpoProfileWhereUniqueInput
    data: XOR<TpoProfileUpdateWithoutCollegeInput, TpoProfileUncheckedUpdateWithoutCollegeInput>
  }

  export type TpoProfileUpdateManyWithWhereWithoutCollegeInput = {
    where: TpoProfileScalarWhereInput
    data: XOR<TpoProfileUpdateManyMutationInput, TpoProfileUncheckedUpdateManyWithoutCollegeInput>
  }

  export type TpoProfileScalarWhereInput = {
    AND?: TpoProfileScalarWhereInput | TpoProfileScalarWhereInput[]
    OR?: TpoProfileScalarWhereInput[]
    NOT?: TpoProfileScalarWhereInput | TpoProfileScalarWhereInput[]
    id?: StringFilter<"TpoProfile"> | string
    userId?: StringFilter<"TpoProfile"> | string
    collegeId?: StringFilter<"TpoProfile"> | string
    designation?: StringNullableFilter<"TpoProfile"> | string | null
    createdAt?: DateTimeFilter<"TpoProfile"> | Date | string
    updatedAt?: DateTimeFilter<"TpoProfile"> | Date | string
  }

  export type StudentProfileUpsertWithWhereUniqueWithoutCollegeInput = {
    where: StudentProfileWhereUniqueInput
    update: XOR<StudentProfileUpdateWithoutCollegeInput, StudentProfileUncheckedUpdateWithoutCollegeInput>
    create: XOR<StudentProfileCreateWithoutCollegeInput, StudentProfileUncheckedCreateWithoutCollegeInput>
  }

  export type StudentProfileUpdateWithWhereUniqueWithoutCollegeInput = {
    where: StudentProfileWhereUniqueInput
    data: XOR<StudentProfileUpdateWithoutCollegeInput, StudentProfileUncheckedUpdateWithoutCollegeInput>
  }

  export type StudentProfileUpdateManyWithWhereWithoutCollegeInput = {
    where: StudentProfileScalarWhereInput
    data: XOR<StudentProfileUpdateManyMutationInput, StudentProfileUncheckedUpdateManyWithoutCollegeInput>
  }

  export type StudentProfileScalarWhereInput = {
    AND?: StudentProfileScalarWhereInput | StudentProfileScalarWhereInput[]
    OR?: StudentProfileScalarWhereInput[]
    NOT?: StudentProfileScalarWhereInput | StudentProfileScalarWhereInput[]
    id?: StringFilter<"StudentProfile"> | string
    userId?: StringFilter<"StudentProfile"> | string
    collegeId?: StringFilter<"StudentProfile"> | string
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
  }

  export type JobUpsertWithWhereUniqueWithoutCollegeInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutCollegeInput, JobUncheckedUpdateWithoutCollegeInput>
    create: XOR<JobCreateWithoutCollegeInput, JobUncheckedCreateWithoutCollegeInput>
  }

  export type JobUpdateWithWhereUniqueWithoutCollegeInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutCollegeInput, JobUncheckedUpdateWithoutCollegeInput>
  }

  export type JobUpdateManyWithWhereWithoutCollegeInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutCollegeInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    collegeId?: StringFilter<"Job"> | string
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

  export type OfferUpsertWithWhereUniqueWithoutCollegeInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutCollegeInput, OfferUncheckedUpdateWithoutCollegeInput>
    create: XOR<OfferCreateWithoutCollegeInput, OfferUncheckedCreateWithoutCollegeInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutCollegeInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutCollegeInput, OfferUncheckedUpdateWithoutCollegeInput>
  }

  export type OfferUpdateManyWithWhereWithoutCollegeInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutCollegeInput>
  }

  export type OfferScalarWhereInput = {
    AND?: OfferScalarWhereInput | OfferScalarWhereInput[]
    OR?: OfferScalarWhereInput[]
    NOT?: OfferScalarWhereInput | OfferScalarWhereInput[]
    id?: StringFilter<"Offer"> | string
    applicationId?: StringFilter<"Offer"> | string
    studentId?: StringFilter<"Offer"> | string
    jobId?: StringFilter<"Offer"> | string
    companyId?: StringFilter<"Offer"> | string
    collegeId?: StringFilter<"Offer"> | string
    designation?: StringFilter<"Offer"> | string
    salaryPackage?: StringFilter<"Offer"> | string
    location?: StringFilter<"Offer"> | string
    joiningDate?: DateTimeNullableFilter<"Offer"> | Date | string | null
    letterUrl?: StringNullableFilter<"Offer"> | string | null
    notes?: StringNullableFilter<"Offer"> | string | null
    status?: EnumOfferStatusFilter<"Offer"> | $Enums.OfferStatus
    expiresAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    acceptedAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    declinedAt?: DateTimeNullableFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
  }

  export type UserCreateWithoutTpoInput = {
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

  export type UserUncheckedCreateWithoutTpoInput = {
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

  export type UserCreateOrConnectWithoutTpoInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTpoInput, UserUncheckedCreateWithoutTpoInput>
  }

  export type CollegeCreateWithoutTposInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentProfileCreateNestedManyWithoutCollegeInput
    jobs?: JobCreateNestedManyWithoutCollegeInput
    offers?: OfferCreateNestedManyWithoutCollegeInput
  }

  export type CollegeUncheckedCreateWithoutTposInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentProfileUncheckedCreateNestedManyWithoutCollegeInput
    jobs?: JobUncheckedCreateNestedManyWithoutCollegeInput
    offers?: OfferUncheckedCreateNestedManyWithoutCollegeInput
  }

  export type CollegeCreateOrConnectWithoutTposInput = {
    where: CollegeWhereUniqueInput
    create: XOR<CollegeCreateWithoutTposInput, CollegeUncheckedCreateWithoutTposInput>
  }

  export type UserUpsertWithoutTpoInput = {
    update: XOR<UserUpdateWithoutTpoInput, UserUncheckedUpdateWithoutTpoInput>
    create: XOR<UserCreateWithoutTpoInput, UserUncheckedCreateWithoutTpoInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTpoInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTpoInput, UserUncheckedUpdateWithoutTpoInput>
  }

  export type UserUpdateWithoutTpoInput = {
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

  export type UserUncheckedUpdateWithoutTpoInput = {
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

  export type CollegeUpsertWithoutTposInput = {
    update: XOR<CollegeUpdateWithoutTposInput, CollegeUncheckedUpdateWithoutTposInput>
    create: XOR<CollegeCreateWithoutTposInput, CollegeUncheckedCreateWithoutTposInput>
    where?: CollegeWhereInput
  }

  export type CollegeUpdateToOneWithWhereWithoutTposInput = {
    where?: CollegeWhereInput
    data: XOR<CollegeUpdateWithoutTposInput, CollegeUncheckedUpdateWithoutTposInput>
  }

  export type CollegeUpdateWithoutTposInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentProfileUpdateManyWithoutCollegeNestedInput
    jobs?: JobUpdateManyWithoutCollegeNestedInput
    offers?: OfferUpdateManyWithoutCollegeNestedInput
  }

  export type CollegeUncheckedUpdateWithoutTposInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentProfileUncheckedUpdateManyWithoutCollegeNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCollegeNestedInput
    offers?: OfferUncheckedUpdateManyWithoutCollegeNestedInput
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
    tpo?: TpoProfileCreateNestedOneWithoutUserInput
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
    tpo?: TpoProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStudentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
  }

  export type CollegeCreateWithoutStudentsInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tpos?: TpoProfileCreateNestedManyWithoutCollegeInput
    jobs?: JobCreateNestedManyWithoutCollegeInput
    offers?: OfferCreateNestedManyWithoutCollegeInput
  }

  export type CollegeUncheckedCreateWithoutStudentsInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tpos?: TpoProfileUncheckedCreateNestedManyWithoutCollegeInput
    jobs?: JobUncheckedCreateNestedManyWithoutCollegeInput
    offers?: OfferUncheckedCreateNestedManyWithoutCollegeInput
  }

  export type CollegeCreateOrConnectWithoutStudentsInput = {
    where: CollegeWhereUniqueInput
    create: XOR<CollegeCreateWithoutStudentsInput, CollegeUncheckedCreateWithoutStudentsInput>
  }

  export type StudentResumeCreateWithoutStudentInput = {
    id?: string
    title: string
    fileUrl: string
    publicId?: string | null
    fileType?: string | null
    fileSize?: number | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationCreateNestedManyWithoutResumeInput
  }

  export type StudentResumeUncheckedCreateWithoutStudentInput = {
    id?: string
    title: string
    fileUrl: string
    publicId?: string | null
    fileType?: string | null
    fileSize?: number | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutResumeInput
  }

  export type StudentResumeCreateOrConnectWithoutStudentInput = {
    where: StudentResumeWhereUniqueInput
    create: XOR<StudentResumeCreateWithoutStudentInput, StudentResumeUncheckedCreateWithoutStudentInput>
  }

  export type StudentResumeCreateManyStudentInputEnvelope = {
    data: StudentResumeCreateManyStudentInput | StudentResumeCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ApplicationCreateWithoutStudentInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutApplicationsInput
    resume?: StudentResumeCreateNestedOneWithoutApplicationsInput
    offer?: OfferCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateWithoutStudentInput = {
    id?: string
    jobId: string
    status?: $Enums.ApplicationStatus
    resumeId?: string | null
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offer?: OfferUncheckedCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationCreateOrConnectWithoutStudentInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutStudentInput, ApplicationUncheckedCreateWithoutStudentInput>
  }

  export type ApplicationCreateManyStudentInputEnvelope = {
    data: ApplicationCreateManyStudentInput | ApplicationCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutStudentInput = {
    id?: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    application: ApplicationCreateNestedOneWithoutOfferInput
    job: JobCreateNestedOneWithoutOffersInput
    company: CompanyCreateNestedOneWithoutOffersInput
    college: CollegeCreateNestedOneWithoutOffersInput
  }

  export type OfferUncheckedCreateWithoutStudentInput = {
    id?: string
    applicationId: string
    jobId: string
    companyId: string
    collegeId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateOrConnectWithoutStudentInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutStudentInput, OfferUncheckedCreateWithoutStudentInput>
  }

  export type OfferCreateManyStudentInputEnvelope = {
    data: OfferCreateManyStudentInput | OfferCreateManyStudentInput[]
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
    tpo?: TpoProfileUpdateOneWithoutUserNestedInput
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
    tpo?: TpoProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CollegeUpsertWithoutStudentsInput = {
    update: XOR<CollegeUpdateWithoutStudentsInput, CollegeUncheckedUpdateWithoutStudentsInput>
    create: XOR<CollegeCreateWithoutStudentsInput, CollegeUncheckedCreateWithoutStudentsInput>
    where?: CollegeWhereInput
  }

  export type CollegeUpdateToOneWithWhereWithoutStudentsInput = {
    where?: CollegeWhereInput
    data: XOR<CollegeUpdateWithoutStudentsInput, CollegeUncheckedUpdateWithoutStudentsInput>
  }

  export type CollegeUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tpos?: TpoProfileUpdateManyWithoutCollegeNestedInput
    jobs?: JobUpdateManyWithoutCollegeNestedInput
    offers?: OfferUpdateManyWithoutCollegeNestedInput
  }

  export type CollegeUncheckedUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tpos?: TpoProfileUncheckedUpdateManyWithoutCollegeNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCollegeNestedInput
    offers?: OfferUncheckedUpdateManyWithoutCollegeNestedInput
  }

  export type StudentResumeUpsertWithWhereUniqueWithoutStudentInput = {
    where: StudentResumeWhereUniqueInput
    update: XOR<StudentResumeUpdateWithoutStudentInput, StudentResumeUncheckedUpdateWithoutStudentInput>
    create: XOR<StudentResumeCreateWithoutStudentInput, StudentResumeUncheckedCreateWithoutStudentInput>
  }

  export type StudentResumeUpdateWithWhereUniqueWithoutStudentInput = {
    where: StudentResumeWhereUniqueInput
    data: XOR<StudentResumeUpdateWithoutStudentInput, StudentResumeUncheckedUpdateWithoutStudentInput>
  }

  export type StudentResumeUpdateManyWithWhereWithoutStudentInput = {
    where: StudentResumeScalarWhereInput
    data: XOR<StudentResumeUpdateManyMutationInput, StudentResumeUncheckedUpdateManyWithoutStudentInput>
  }

  export type StudentResumeScalarWhereInput = {
    AND?: StudentResumeScalarWhereInput | StudentResumeScalarWhereInput[]
    OR?: StudentResumeScalarWhereInput[]
    NOT?: StudentResumeScalarWhereInput | StudentResumeScalarWhereInput[]
    id?: StringFilter<"StudentResume"> | string
    studentId?: StringFilter<"StudentResume"> | string
    title?: StringFilter<"StudentResume"> | string
    fileUrl?: StringFilter<"StudentResume"> | string
    publicId?: StringNullableFilter<"StudentResume"> | string | null
    fileType?: StringNullableFilter<"StudentResume"> | string | null
    fileSize?: IntNullableFilter<"StudentResume"> | number | null
    isDefault?: BoolFilter<"StudentResume"> | boolean
    createdAt?: DateTimeFilter<"StudentResume"> | Date | string
    updatedAt?: DateTimeFilter<"StudentResume"> | Date | string
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
    resumeId?: StringNullableFilter<"Application"> | string | null
    resumeUrl?: StringNullableFilter<"Application"> | string | null
    notes?: StringNullableFilter<"Application"> | string | null
    createdAt?: DateTimeFilter<"Application"> | Date | string
    updatedAt?: DateTimeFilter<"Application"> | Date | string
  }

  export type OfferUpsertWithWhereUniqueWithoutStudentInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutStudentInput, OfferUncheckedUpdateWithoutStudentInput>
    create: XOR<OfferCreateWithoutStudentInput, OfferUncheckedCreateWithoutStudentInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutStudentInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutStudentInput, OfferUncheckedUpdateWithoutStudentInput>
  }

  export type OfferUpdateManyWithWhereWithoutStudentInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutStudentInput>
  }

  export type StudentProfileCreateWithoutResumesInput = {
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
    college: CollegeCreateNestedOneWithoutStudentsInput
    applications?: ApplicationCreateNestedManyWithoutStudentInput
    offers?: OfferCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileUncheckedCreateWithoutResumesInput = {
    id?: string
    userId: string
    collegeId: string
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
    offers?: OfferUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileCreateOrConnectWithoutResumesInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutResumesInput, StudentProfileUncheckedCreateWithoutResumesInput>
  }

  export type ApplicationCreateWithoutResumeInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutApplicationsInput
    student: StudentProfileCreateNestedOneWithoutApplicationsInput
    offer?: OfferCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateWithoutResumeInput = {
    id?: string
    jobId: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offer?: OfferUncheckedCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationCreateOrConnectWithoutResumeInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput>
  }

  export type ApplicationCreateManyResumeInputEnvelope = {
    data: ApplicationCreateManyResumeInput | ApplicationCreateManyResumeInput[]
    skipDuplicates?: boolean
  }

  export type StudentProfileUpsertWithoutResumesInput = {
    update: XOR<StudentProfileUpdateWithoutResumesInput, StudentProfileUncheckedUpdateWithoutResumesInput>
    create: XOR<StudentProfileCreateWithoutResumesInput, StudentProfileUncheckedCreateWithoutResumesInput>
    where?: StudentProfileWhereInput
  }

  export type StudentProfileUpdateToOneWithWhereWithoutResumesInput = {
    where?: StudentProfileWhereInput
    data: XOR<StudentProfileUpdateWithoutResumesInput, StudentProfileUncheckedUpdateWithoutResumesInput>
  }

  export type StudentProfileUpdateWithoutResumesInput = {
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
    college?: CollegeUpdateOneRequiredWithoutStudentsNestedInput
    applications?: ApplicationUpdateManyWithoutStudentNestedInput
    offers?: OfferUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
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
    offers?: OfferUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ApplicationUpsertWithWhereUniqueWithoutResumeInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutResumeInput, ApplicationUncheckedUpdateWithoutResumeInput>
    create: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutResumeInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutResumeInput, ApplicationUncheckedUpdateWithoutResumeInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutResumeInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutResumeInput>
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
    college: CollegeCreateNestedOneWithoutJobsInput
    applications?: ApplicationCreateNestedManyWithoutJobInput
    offers?: OfferCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutCompanyInput = {
    id?: string
    collegeId: string
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
    offers?: OfferUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutCompanyInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobCreateManyCompanyInputEnvelope = {
    data: JobCreateManyCompanyInput | JobCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutCompanyInput = {
    id?: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    application: ApplicationCreateNestedOneWithoutOfferInput
    student: StudentProfileCreateNestedOneWithoutOffersInput
    job: JobCreateNestedOneWithoutOffersInput
    college: CollegeCreateNestedOneWithoutOffersInput
  }

  export type OfferUncheckedCreateWithoutCompanyInput = {
    id?: string
    applicationId: string
    studentId: string
    jobId: string
    collegeId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateOrConnectWithoutCompanyInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutCompanyInput, OfferUncheckedCreateWithoutCompanyInput>
  }

  export type OfferCreateManyCompanyInputEnvelope = {
    data: OfferCreateManyCompanyInput | OfferCreateManyCompanyInput[]
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

  export type OfferUpsertWithWhereUniqueWithoutCompanyInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutCompanyInput, OfferUncheckedUpdateWithoutCompanyInput>
    create: XOR<OfferCreateWithoutCompanyInput, OfferUncheckedCreateWithoutCompanyInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutCompanyInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutCompanyInput, OfferUncheckedUpdateWithoutCompanyInput>
  }

  export type OfferUpdateManyWithWhereWithoutCompanyInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutCompanyInput>
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
    tpo?: TpoProfileCreateNestedOneWithoutUserInput
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
    tpo?: TpoProfileUncheckedCreateNestedOneWithoutUserInput
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
    images?: CompanyCreateimagesInput | string[]
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobCreateNestedManyWithoutCompanyInput
    offers?: OfferCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutRecruitersInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    images?: CompanyCreateimagesInput | string[]
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
    offers?: OfferUncheckedCreateNestedManyWithoutCompanyInput
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
    tpo?: TpoProfileUpdateOneWithoutUserNestedInput
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
    tpo?: TpoProfileUncheckedUpdateOneWithoutUserNestedInput
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
    images?: CompanyUpdateimagesInput | string[]
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUpdateManyWithoutCompanyNestedInput
    offers?: OfferUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutRecruitersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CompanyUpdateimagesInput | string[]
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
    offers?: OfferUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutJobsInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    images?: CompanyCreateimagesInput | string[]
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiters?: RecruiterProfileCreateNestedManyWithoutCompanyInput
    offers?: OfferCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutJobsInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    images?: CompanyCreateimagesInput | string[]
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiters?: RecruiterProfileUncheckedCreateNestedManyWithoutCompanyInput
    offers?: OfferUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutJobsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
  }

  export type CollegeCreateWithoutJobsInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tpos?: TpoProfileCreateNestedManyWithoutCollegeInput
    students?: StudentProfileCreateNestedManyWithoutCollegeInput
    offers?: OfferCreateNestedManyWithoutCollegeInput
  }

  export type CollegeUncheckedCreateWithoutJobsInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tpos?: TpoProfileUncheckedCreateNestedManyWithoutCollegeInput
    students?: StudentProfileUncheckedCreateNestedManyWithoutCollegeInput
    offers?: OfferUncheckedCreateNestedManyWithoutCollegeInput
  }

  export type CollegeCreateOrConnectWithoutJobsInput = {
    where: CollegeWhereUniqueInput
    create: XOR<CollegeCreateWithoutJobsInput, CollegeUncheckedCreateWithoutJobsInput>
  }

  export type ApplicationCreateWithoutJobInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentProfileCreateNestedOneWithoutApplicationsInput
    resume?: StudentResumeCreateNestedOneWithoutApplicationsInput
    offer?: OfferCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateWithoutJobInput = {
    id?: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeId?: string | null
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offer?: OfferUncheckedCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationCreateOrConnectWithoutJobInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput>
  }

  export type ApplicationCreateManyJobInputEnvelope = {
    data: ApplicationCreateManyJobInput | ApplicationCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutJobInput = {
    id?: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    application: ApplicationCreateNestedOneWithoutOfferInput
    student: StudentProfileCreateNestedOneWithoutOffersInput
    company: CompanyCreateNestedOneWithoutOffersInput
    college: CollegeCreateNestedOneWithoutOffersInput
  }

  export type OfferUncheckedCreateWithoutJobInput = {
    id?: string
    applicationId: string
    studentId: string
    companyId: string
    collegeId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateOrConnectWithoutJobInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutJobInput, OfferUncheckedCreateWithoutJobInput>
  }

  export type OfferCreateManyJobInputEnvelope = {
    data: OfferCreateManyJobInput | OfferCreateManyJobInput[]
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
    images?: CompanyUpdateimagesInput | string[]
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiters?: RecruiterProfileUpdateManyWithoutCompanyNestedInput
    offers?: OfferUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CompanyUpdateimagesInput | string[]
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiters?: RecruiterProfileUncheckedUpdateManyWithoutCompanyNestedInput
    offers?: OfferUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CollegeUpsertWithoutJobsInput = {
    update: XOR<CollegeUpdateWithoutJobsInput, CollegeUncheckedUpdateWithoutJobsInput>
    create: XOR<CollegeCreateWithoutJobsInput, CollegeUncheckedCreateWithoutJobsInput>
    where?: CollegeWhereInput
  }

  export type CollegeUpdateToOneWithWhereWithoutJobsInput = {
    where?: CollegeWhereInput
    data: XOR<CollegeUpdateWithoutJobsInput, CollegeUncheckedUpdateWithoutJobsInput>
  }

  export type CollegeUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tpos?: TpoProfileUpdateManyWithoutCollegeNestedInput
    students?: StudentProfileUpdateManyWithoutCollegeNestedInput
    offers?: OfferUpdateManyWithoutCollegeNestedInput
  }

  export type CollegeUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tpos?: TpoProfileUncheckedUpdateManyWithoutCollegeNestedInput
    students?: StudentProfileUncheckedUpdateManyWithoutCollegeNestedInput
    offers?: OfferUncheckedUpdateManyWithoutCollegeNestedInput
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

  export type OfferUpsertWithWhereUniqueWithoutJobInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutJobInput, OfferUncheckedUpdateWithoutJobInput>
    create: XOR<OfferCreateWithoutJobInput, OfferUncheckedCreateWithoutJobInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutJobInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutJobInput, OfferUncheckedUpdateWithoutJobInput>
  }

  export type OfferUpdateManyWithWhereWithoutJobInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutJobInput>
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
    college: CollegeCreateNestedOneWithoutJobsInput
    offers?: OfferCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutApplicationsInput = {
    id?: string
    companyId: string
    collegeId: string
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
    offers?: OfferUncheckedCreateNestedManyWithoutJobInput
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
    college: CollegeCreateNestedOneWithoutStudentsInput
    resumes?: StudentResumeCreateNestedManyWithoutStudentInput
    offers?: OfferCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileUncheckedCreateWithoutApplicationsInput = {
    id?: string
    userId: string
    collegeId: string
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
    resumes?: StudentResumeUncheckedCreateNestedManyWithoutStudentInput
    offers?: OfferUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileCreateOrConnectWithoutApplicationsInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutApplicationsInput, StudentProfileUncheckedCreateWithoutApplicationsInput>
  }

  export type StudentResumeCreateWithoutApplicationsInput = {
    id?: string
    title: string
    fileUrl: string
    publicId?: string | null
    fileType?: string | null
    fileSize?: number | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentProfileCreateNestedOneWithoutResumesInput
  }

  export type StudentResumeUncheckedCreateWithoutApplicationsInput = {
    id?: string
    studentId: string
    title: string
    fileUrl: string
    publicId?: string | null
    fileType?: string | null
    fileSize?: number | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentResumeCreateOrConnectWithoutApplicationsInput = {
    where: StudentResumeWhereUniqueInput
    create: XOR<StudentResumeCreateWithoutApplicationsInput, StudentResumeUncheckedCreateWithoutApplicationsInput>
  }

  export type OfferCreateWithoutApplicationInput = {
    id?: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentProfileCreateNestedOneWithoutOffersInput
    job: JobCreateNestedOneWithoutOffersInput
    company: CompanyCreateNestedOneWithoutOffersInput
    college: CollegeCreateNestedOneWithoutOffersInput
  }

  export type OfferUncheckedCreateWithoutApplicationInput = {
    id?: string
    studentId: string
    jobId: string
    companyId: string
    collegeId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateOrConnectWithoutApplicationInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutApplicationInput, OfferUncheckedCreateWithoutApplicationInput>
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
    college?: CollegeUpdateOneRequiredWithoutJobsNestedInput
    offers?: OfferUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
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
    offers?: OfferUncheckedUpdateManyWithoutJobNestedInput
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
    college?: CollegeUpdateOneRequiredWithoutStudentsNestedInput
    resumes?: StudentResumeUpdateManyWithoutStudentNestedInput
    offers?: OfferUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
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
    resumes?: StudentResumeUncheckedUpdateManyWithoutStudentNestedInput
    offers?: OfferUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentResumeUpsertWithoutApplicationsInput = {
    update: XOR<StudentResumeUpdateWithoutApplicationsInput, StudentResumeUncheckedUpdateWithoutApplicationsInput>
    create: XOR<StudentResumeCreateWithoutApplicationsInput, StudentResumeUncheckedCreateWithoutApplicationsInput>
    where?: StudentResumeWhereInput
  }

  export type StudentResumeUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: StudentResumeWhereInput
    data: XOR<StudentResumeUpdateWithoutApplicationsInput, StudentResumeUncheckedUpdateWithoutApplicationsInput>
  }

  export type StudentResumeUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentProfileUpdateOneRequiredWithoutResumesNestedInput
  }

  export type StudentResumeUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUpsertWithoutApplicationInput = {
    update: XOR<OfferUpdateWithoutApplicationInput, OfferUncheckedUpdateWithoutApplicationInput>
    create: XOR<OfferCreateWithoutApplicationInput, OfferUncheckedCreateWithoutApplicationInput>
    where?: OfferWhereInput
  }

  export type OfferUpdateToOneWithWhereWithoutApplicationInput = {
    where?: OfferWhereInput
    data: XOR<OfferUpdateWithoutApplicationInput, OfferUncheckedUpdateWithoutApplicationInput>
  }

  export type OfferUpdateWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentProfileUpdateOneRequiredWithoutOffersNestedInput
    job?: JobUpdateOneRequiredWithoutOffersNestedInput
    company?: CompanyUpdateOneRequiredWithoutOffersNestedInput
    college?: CollegeUpdateOneRequiredWithoutOffersNestedInput
  }

  export type OfferUncheckedUpdateWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateWithoutOfferInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutApplicationsInput
    student: StudentProfileCreateNestedOneWithoutApplicationsInput
    resume?: StudentResumeCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutOfferInput = {
    id?: string
    jobId: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeId?: string | null
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutOfferInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutOfferInput, ApplicationUncheckedCreateWithoutOfferInput>
  }

  export type StudentProfileCreateWithoutOffersInput = {
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
    college: CollegeCreateNestedOneWithoutStudentsInput
    resumes?: StudentResumeCreateNestedManyWithoutStudentInput
    applications?: ApplicationCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileUncheckedCreateWithoutOffersInput = {
    id?: string
    userId: string
    collegeId: string
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
    resumes?: StudentResumeUncheckedCreateNestedManyWithoutStudentInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentProfileCreateOrConnectWithoutOffersInput = {
    where: StudentProfileWhereUniqueInput
    create: XOR<StudentProfileCreateWithoutOffersInput, StudentProfileUncheckedCreateWithoutOffersInput>
  }

  export type JobCreateWithoutOffersInput = {
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
    college: CollegeCreateNestedOneWithoutJobsInput
    applications?: ApplicationCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutOffersInput = {
    id?: string
    companyId: string
    collegeId: string
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

  export type JobCreateOrConnectWithoutOffersInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutOffersInput, JobUncheckedCreateWithoutOffersInput>
  }

  export type CompanyCreateWithoutOffersInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    images?: CompanyCreateimagesInput | string[]
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiters?: RecruiterProfileCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutOffersInput = {
    id?: string
    name: string
    website?: string | null
    logoUrl?: string | null
    images?: CompanyCreateimagesInput | string[]
    industry?: string | null
    location?: string | null
    description?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiters?: RecruiterProfileUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutOffersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutOffersInput, CompanyUncheckedCreateWithoutOffersInput>
  }

  export type CollegeCreateWithoutOffersInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tpos?: TpoProfileCreateNestedManyWithoutCollegeInput
    students?: StudentProfileCreateNestedManyWithoutCollegeInput
    jobs?: JobCreateNestedManyWithoutCollegeInput
  }

  export type CollegeUncheckedCreateWithoutOffersInput = {
    id?: string
    name: string
    code?: string | null
    domain?: string | null
    city?: string | null
    state?: string | null
    logoUrl?: string | null
    images?: CollegeCreateimagesInput | string[]
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tpos?: TpoProfileUncheckedCreateNestedManyWithoutCollegeInput
    students?: StudentProfileUncheckedCreateNestedManyWithoutCollegeInput
    jobs?: JobUncheckedCreateNestedManyWithoutCollegeInput
  }

  export type CollegeCreateOrConnectWithoutOffersInput = {
    where: CollegeWhereUniqueInput
    create: XOR<CollegeCreateWithoutOffersInput, CollegeUncheckedCreateWithoutOffersInput>
  }

  export type ApplicationUpsertWithoutOfferInput = {
    update: XOR<ApplicationUpdateWithoutOfferInput, ApplicationUncheckedUpdateWithoutOfferInput>
    create: XOR<ApplicationCreateWithoutOfferInput, ApplicationUncheckedCreateWithoutOfferInput>
    where?: ApplicationWhereInput
  }

  export type ApplicationUpdateToOneWithWhereWithoutOfferInput = {
    where?: ApplicationWhereInput
    data: XOR<ApplicationUpdateWithoutOfferInput, ApplicationUncheckedUpdateWithoutOfferInput>
  }

  export type ApplicationUpdateWithoutOfferInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    student?: StudentProfileUpdateOneRequiredWithoutApplicationsNestedInput
    resume?: StudentResumeUpdateOneWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutOfferInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentProfileUpsertWithoutOffersInput = {
    update: XOR<StudentProfileUpdateWithoutOffersInput, StudentProfileUncheckedUpdateWithoutOffersInput>
    create: XOR<StudentProfileCreateWithoutOffersInput, StudentProfileUncheckedCreateWithoutOffersInput>
    where?: StudentProfileWhereInput
  }

  export type StudentProfileUpdateToOneWithWhereWithoutOffersInput = {
    where?: StudentProfileWhereInput
    data: XOR<StudentProfileUpdateWithoutOffersInput, StudentProfileUncheckedUpdateWithoutOffersInput>
  }

  export type StudentProfileUpdateWithoutOffersInput = {
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
    college?: CollegeUpdateOneRequiredWithoutStudentsNestedInput
    resumes?: StudentResumeUpdateManyWithoutStudentNestedInput
    applications?: ApplicationUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
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
    resumes?: StudentResumeUncheckedUpdateManyWithoutStudentNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type JobUpsertWithoutOffersInput = {
    update: XOR<JobUpdateWithoutOffersInput, JobUncheckedUpdateWithoutOffersInput>
    create: XOR<JobCreateWithoutOffersInput, JobUncheckedCreateWithoutOffersInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutOffersInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutOffersInput, JobUncheckedUpdateWithoutOffersInput>
  }

  export type JobUpdateWithoutOffersInput = {
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
    college?: CollegeUpdateOneRequiredWithoutJobsNestedInput
    applications?: ApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
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

  export type CompanyUpsertWithoutOffersInput = {
    update: XOR<CompanyUpdateWithoutOffersInput, CompanyUncheckedUpdateWithoutOffersInput>
    create: XOR<CompanyCreateWithoutOffersInput, CompanyUncheckedCreateWithoutOffersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutOffersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutOffersInput, CompanyUncheckedUpdateWithoutOffersInput>
  }

  export type CompanyUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CompanyUpdateimagesInput | string[]
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiters?: RecruiterProfileUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CompanyUpdateimagesInput | string[]
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiters?: RecruiterProfileUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CollegeUpsertWithoutOffersInput = {
    update: XOR<CollegeUpdateWithoutOffersInput, CollegeUncheckedUpdateWithoutOffersInput>
    create: XOR<CollegeCreateWithoutOffersInput, CollegeUncheckedCreateWithoutOffersInput>
    where?: CollegeWhereInput
  }

  export type CollegeUpdateToOneWithWhereWithoutOffersInput = {
    where?: CollegeWhereInput
    data: XOR<CollegeUpdateWithoutOffersInput, CollegeUncheckedUpdateWithoutOffersInput>
  }

  export type CollegeUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tpos?: TpoProfileUpdateManyWithoutCollegeNestedInput
    students?: StudentProfileUpdateManyWithoutCollegeNestedInput
    jobs?: JobUpdateManyWithoutCollegeNestedInput
  }

  export type CollegeUncheckedUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    images?: CollegeUpdateimagesInput | string[]
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tpos?: TpoProfileUncheckedUpdateManyWithoutCollegeNestedInput
    students?: StudentProfileUncheckedUpdateManyWithoutCollegeNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCollegeNestedInput
  }

  export type TpoProfileCreateManyCollegeInput = {
    id?: string
    userId: string
    designation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentProfileCreateManyCollegeInput = {
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

  export type JobCreateManyCollegeInput = {
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

  export type OfferCreateManyCollegeInput = {
    id?: string
    applicationId: string
    studentId: string
    jobId: string
    companyId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TpoProfileUpdateWithoutCollegeInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTpoNestedInput
  }

  export type TpoProfileUncheckedUpdateWithoutCollegeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TpoProfileUncheckedUpdateManyWithoutCollegeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentProfileUpdateWithoutCollegeInput = {
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
    resumes?: StudentResumeUpdateManyWithoutStudentNestedInput
    applications?: ApplicationUpdateManyWithoutStudentNestedInput
    offers?: OfferUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileUncheckedUpdateWithoutCollegeInput = {
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
    resumes?: StudentResumeUncheckedUpdateManyWithoutStudentNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutStudentNestedInput
    offers?: OfferUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentProfileUncheckedUpdateManyWithoutCollegeInput = {
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

  export type JobUpdateWithoutCollegeInput = {
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
    offers?: OfferUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutCollegeInput = {
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
    offers?: OfferUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutCollegeInput = {
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

  export type OfferUpdateWithoutCollegeInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: ApplicationUpdateOneRequiredWithoutOfferNestedInput
    student?: StudentProfileUpdateOneRequiredWithoutOffersNestedInput
    job?: JobUpdateOneRequiredWithoutOffersNestedInput
    company?: CompanyUpdateOneRequiredWithoutOffersNestedInput
  }

  export type OfferUncheckedUpdateWithoutCollegeInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyWithoutCollegeInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentResumeCreateManyStudentInput = {
    id?: string
    title: string
    fileUrl: string
    publicId?: string | null
    fileType?: string | null
    fileSize?: number | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationCreateManyStudentInput = {
    id?: string
    jobId: string
    status?: $Enums.ApplicationStatus
    resumeId?: string | null
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateManyStudentInput = {
    id?: string
    applicationId: string
    jobId: string
    companyId: string
    collegeId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentResumeUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutResumeNestedInput
  }

  export type StudentResumeUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type StudentResumeUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    resume?: StudentResumeUpdateOneWithoutApplicationsNestedInput
    offer?: OfferUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offer?: OfferUncheckedUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: ApplicationUpdateOneRequiredWithoutOfferNestedInput
    job?: JobUpdateOneRequiredWithoutOffersNestedInput
    company?: CompanyUpdateOneRequiredWithoutOffersNestedInput
    college?: CollegeUpdateOneRequiredWithoutOffersNestedInput
  }

  export type OfferUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyResumeInput = {
    id?: string
    jobId: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationUpdateWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    student?: StudentProfileUpdateOneRequiredWithoutApplicationsNestedInput
    offer?: OfferUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offer?: OfferUncheckedUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateManyWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
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
    collegeId: string
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

  export type OfferCreateManyCompanyInput = {
    id?: string
    applicationId: string
    studentId: string
    jobId: string
    collegeId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
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
    college?: CollegeUpdateOneRequiredWithoutJobsNestedInput
    applications?: ApplicationUpdateManyWithoutJobNestedInput
    offers?: OfferUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
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
    offers?: OfferUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
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

  export type OfferUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: ApplicationUpdateOneRequiredWithoutOfferNestedInput
    student?: StudentProfileUpdateOneRequiredWithoutOffersNestedInput
    job?: JobUpdateOneRequiredWithoutOffersNestedInput
    college?: CollegeUpdateOneRequiredWithoutOffersNestedInput
  }

  export type OfferUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyJobInput = {
    id?: string
    studentId: string
    status?: $Enums.ApplicationStatus
    resumeId?: string | null
    resumeUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferCreateManyJobInput = {
    id?: string
    applicationId: string
    studentId: string
    companyId: string
    collegeId: string
    designation: string
    salaryPackage: string
    location: string
    joiningDate?: Date | string | null
    letterUrl?: string | null
    notes?: string | null
    status?: $Enums.OfferStatus
    expiresAt?: Date | string | null
    acceptedAt?: Date | string | null
    declinedAt?: Date | string | null
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
    resume?: StudentResumeUpdateOneWithoutApplicationsNestedInput
    offer?: OfferUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offer?: OfferUncheckedUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: ApplicationUpdateOneRequiredWithoutOfferNestedInput
    student?: StudentProfileUpdateOneRequiredWithoutOffersNestedInput
    company?: CompanyUpdateOneRequiredWithoutOffersNestedInput
    college?: CollegeUpdateOneRequiredWithoutOffersNestedInput
  }

  export type OfferUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    collegeId?: StringFieldUpdateOperationsInput | string
    designation?: StringFieldUpdateOperationsInput | string
    salaryPackage?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    joiningDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    letterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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