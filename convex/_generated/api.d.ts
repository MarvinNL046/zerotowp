/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as clusters from "../clusters.js";
import type * as comments from "../comments.js";
import type * as deals from "../deals.js";
import type * as lib_reservedSlugs from "../lib/reservedSlugs.js";
import type * as media from "../media.js";
import type * as pages from "../pages.js";
import type * as posts from "../posts.js";
import type * as reviews from "../reviews.js";
import type * as seed from "../seed.js";
import type * as seedArticle from "../seedArticle.js";
import type * as seedArticles10 from "../seedArticles10.js";
import type * as seedArticles11 from "../seedArticles11.js";
import type * as seedArticles12 from "../seedArticles12.js";
import type * as seedArticles13 from "../seedArticles13.js";
import type * as seedArticles15 from "../seedArticles15.js";
import type * as seedArticles16 from "../seedArticles16.js";
import type * as seedArticles17 from "../seedArticles17.js";
import type * as seedArticles18 from "../seedArticles18.js";
import type * as seedArticles19 from "../seedArticles19.js";
import type * as seedArticles2 from "../seedArticles2.js";
import type * as seedArticles20 from "../seedArticles20.js";
import type * as seedArticles21 from "../seedArticles21.js";
import type * as seedArticles22 from "../seedArticles22.js";
import type * as seedArticles23 from "../seedArticles23.js";
import type * as seedArticles24 from "../seedArticles24.js";
import type * as seedArticles25 from "../seedArticles25.js";
import type * as seedArticles26 from "../seedArticles26.js";
import type * as seedArticles27 from "../seedArticles27.js";
import type * as seedArticles28 from "../seedArticles28.js";
import type * as seedArticles29 from "../seedArticles29.js";
import type * as seedArticles3 from "../seedArticles3.js";
import type * as seedArticles30 from "../seedArticles30.js";
import type * as seedArticles31 from "../seedArticles31.js";
import type * as seedArticles32 from "../seedArticles32.js";
import type * as seedArticles33 from "../seedArticles33.js";
import type * as seedArticles34 from "../seedArticles34.js";
import type * as seedArticles35 from "../seedArticles35.js";
import type * as seedArticles36 from "../seedArticles36.js";
import type * as seedArticles37 from "../seedArticles37.js";
import type * as seedArticles38 from "../seedArticles38.js";
import type * as seedArticles39 from "../seedArticles39.js";
import type * as seedArticles4 from "../seedArticles4.js";
import type * as seedArticles5 from "../seedArticles5.js";
import type * as seedArticles6 from "../seedArticles6.js";
import type * as seedArticles7 from "../seedArticles7.js";
import type * as seedArticles8 from "../seedArticles8.js";
import type * as seedArticles9 from "../seedArticles9.js";
import type * as seedReview1 from "../seedReview1.js";
import type * as seedReview2 from "../seedReview2.js";
import type * as seedReview3 from "../seedReview3.js";
import type * as seedSecurityCluster from "../seedSecurityCluster.js";
import type * as seedSeoCluster from "../seedSeoCluster.js";
import type * as seedSpeedCluster from "../seedSpeedCluster.js";
import type * as seedThemesCluster from "../seedThemesCluster.js";
import type * as seedTutorialsCluster from "../seedTutorialsCluster.js";
import type * as shuffleDates from "../shuffleDates.js";
import type * as storage from "../storage.js";
import type * as subscribers from "../subscribers.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  clusters: typeof clusters;
  comments: typeof comments;
  deals: typeof deals;
  "lib/reservedSlugs": typeof lib_reservedSlugs;
  media: typeof media;
  pages: typeof pages;
  posts: typeof posts;
  reviews: typeof reviews;
  seed: typeof seed;
  seedArticle: typeof seedArticle;
  seedArticles10: typeof seedArticles10;
  seedArticles11: typeof seedArticles11;
  seedArticles12: typeof seedArticles12;
  seedArticles13: typeof seedArticles13;
  seedArticles15: typeof seedArticles15;
  seedArticles16: typeof seedArticles16;
  seedArticles17: typeof seedArticles17;
  seedArticles18: typeof seedArticles18;
  seedArticles19: typeof seedArticles19;
  seedArticles2: typeof seedArticles2;
  seedArticles20: typeof seedArticles20;
  seedArticles21: typeof seedArticles21;
  seedArticles22: typeof seedArticles22;
  seedArticles23: typeof seedArticles23;
  seedArticles24: typeof seedArticles24;
  seedArticles25: typeof seedArticles25;
  seedArticles26: typeof seedArticles26;
  seedArticles27: typeof seedArticles27;
  seedArticles28: typeof seedArticles28;
  seedArticles29: typeof seedArticles29;
  seedArticles3: typeof seedArticles3;
  seedArticles30: typeof seedArticles30;
  seedArticles31: typeof seedArticles31;
  seedArticles32: typeof seedArticles32;
  seedArticles33: typeof seedArticles33;
  seedArticles34: typeof seedArticles34;
  seedArticles35: typeof seedArticles35;
  seedArticles36: typeof seedArticles36;
  seedArticles37: typeof seedArticles37;
  seedArticles38: typeof seedArticles38;
  seedArticles39: typeof seedArticles39;
  seedArticles4: typeof seedArticles4;
  seedArticles5: typeof seedArticles5;
  seedArticles6: typeof seedArticles6;
  seedArticles7: typeof seedArticles7;
  seedArticles8: typeof seedArticles8;
  seedArticles9: typeof seedArticles9;
  seedReview1: typeof seedReview1;
  seedReview2: typeof seedReview2;
  seedReview3: typeof seedReview3;
  seedSecurityCluster: typeof seedSecurityCluster;
  seedSeoCluster: typeof seedSeoCluster;
  seedSpeedCluster: typeof seedSpeedCluster;
  seedThemesCluster: typeof seedThemesCluster;
  seedTutorialsCluster: typeof seedTutorialsCluster;
  shuffleDates: typeof shuffleDates;
  storage: typeof storage;
  subscribers: typeof subscribers;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
