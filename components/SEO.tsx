
import React from 'react';

interface SEOProps {
  schema: object;
}

/**
 * SEO component that renders a JSON-LD script tag.
 * Structured data helps search engines understand the content and provides rich snippets.
 */
const SEO: React.FC<SEOProps> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SEO;
