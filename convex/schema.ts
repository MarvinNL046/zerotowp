import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    featuredImage: v.optional(v.id("_storage")),
    status: v.string(),
    publishedAt: v.optional(v.number()),
    updatedAt: v.number(),
    author: v.string(),
    authorName: v.string(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    clusterId: v.optional(v.id("clusters")),
    clusterRole: v.optional(v.string()),
    learningPathOrder: v.optional(v.number()),
    relatedPosts: v.optional(v.array(v.id("posts"))),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_clusterId", ["clusterId"]),

  reviews: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    rating: v.number(),
    pros: v.array(v.string()),
    cons: v.array(v.string()),
    affiliateLink: v.string(),
    affiliateLabel: v.string(),
    productName: v.string(),
    productImage: v.optional(v.id("_storage")),
    category: v.string(),
    tags: v.array(v.string()),
    status: v.string(),
    publishedAt: v.optional(v.number()),
    updatedAt: v.number(),
    author: v.string(),
    authorName: v.string(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    clusterId: v.optional(v.id("clusters")),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_clusterId", ["clusterId"]),

  deals: defineTable({
    title: v.string(),
    description: v.string(),
    provider: v.string(),
    category: v.string(),
    discountPercentage: v.number(),
    couponCode: v.optional(v.string()),
    affiliateLink: v.string(),
    logo: v.optional(v.id("_storage")),
    isActive: v.boolean(),
    expiresAt: v.optional(v.number()),
    sortOrder: v.number(),
  }).index("by_isActive", ["isActive"]),

  pages: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    status: v.string(),
  }).index("by_slug", ["slug"]),

  clusters: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    pillarPostId: v.optional(v.id("posts")),
    sortOrder: v.number(),
  }).index("by_slug", ["slug"]),

  subscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
    source: v.string(),
  }).index("by_email", ["email"]),

  comments: defineTable({
    postSlug: v.string(),
    parentId: v.optional(v.id("comments")),
    authorName: v.string(),
    authorEmail: v.string(),
    content: v.string(),
    status: v.union(v.literal("pending"), v.literal("approved")),
    notifyOnReply: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_post_slug", ["postSlug"])
    .index("by_status", ["status"])
    .index("by_parent", ["parentId"]),

  media: defineTable({
    storageId: v.id("_storage"),
    filename: v.string(),
    mimeType: v.string(),
    alt: v.string(),
    caption: v.optional(v.string()),
  }),
});
