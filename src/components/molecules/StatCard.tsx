"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  iconClassName?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  iconClassName,
}: StatCardProps) {
  const TrendIcon =
    trend && trend.value > 0
      ? TrendingUp
      : trend && trend.value < 0
      ? TrendingDown
      : Minus;

  const trendColor =
    trend && trend.value > 0
      ? "text-emerald-600"
      : trend && trend.value < 0
      ? "text-red-500"
      : "text-gray-400";

  return (
    <div
      className={cn(
        "p-5 bg-white rounded-xl shadow hover:shadow-md transition",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{title}</p>

          <p className="text-2xl font-bold">{value}</p>

          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trendColor
              )}
            >
              <TrendIcon className="h-3 w-3" />
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-gray-400">{trend.label}</span>
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600",
            iconClassName
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}