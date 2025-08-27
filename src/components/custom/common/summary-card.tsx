import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { SummaryCardProps } from "@/types";

export function SummaryCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  color,
  iconClassName,
}: SummaryCardProps) {
  return (
    <Card
      className={cn(
        "hover:shadow-md transition-shadow border-border",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          as="h3"
          className="text-sm font-medium text-muted-foreground"
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-success" : "text-error"
                  )}
                >
                  {trend.isPositive ? "+" : "-"}
                  {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "h-12 w-12 rounded-full flex items-center justify-center",
              color
            )}
          >
            <Icon className={cn("h-6 w-6", iconClassName)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
