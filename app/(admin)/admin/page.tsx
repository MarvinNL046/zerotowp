"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";

export default function AdminDashboardPage() {
  const posts = useQuery(api.posts.listAll);
  const reviews = useQuery(api.reviews.listAll);
  const deals = useQuery(api.deals.listAll);
  const subscribers = useQuery(api.subscribers.list);

  const activeDeals = deals?.filter((d: Doc<"deals">) => d.isActive) ?? [];

  const isLoading =
    posts === undefined ||
    reviews === undefined ||
    deals === undefined ||
    subscribers === undefined;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  const stats = [
    {
      title: "Total Posts",
      value: posts.length,
    },
    {
      title: "Total Reviews",
      value: reviews.length,
    },
    {
      title: "Active Deals",
      value: activeDeals.length,
    },
    {
      title: "Subscribers",
      value: subscribers.length,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
