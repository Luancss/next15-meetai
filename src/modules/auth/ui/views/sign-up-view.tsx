"use client";

import { Card, CardContent } from "@/components/ui/card";

export const SignUpView = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <p>Sign Up</p>
        </CardContent>
      </Card>
    </div>
  );
};
