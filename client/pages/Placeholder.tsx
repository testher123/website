import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, HelpCircle } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description?: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary-50">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {description}
              </p>
            )}
            <p className="text-muted-foreground mb-8">
              This page is coming soon! Let us know what you'd like to see here.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Back to Home <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
