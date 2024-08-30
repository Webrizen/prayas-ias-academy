import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-left">Miscellaneous</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/dashboard/miscellaneous/categories">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Organize content into broad groups</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Categories help you structure your content into main themes or topics. Use them to create a hierarchical organization for your site.
            </p>
          </CardContent>
        </Card>
        </Link>
        <Link href="/dashboard/miscellaneous/tags">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Label content with specific keywords</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Tags are flexible labels that can be applied to content across categories. They're great for creating cross-sections of your content based on specific attributes or themes.
            </p>
          </CardContent>
        </Card>
        </Link>
      </div>
    </div>
  )
}