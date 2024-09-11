"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Check, Copy } from "lucide-react";

export const H1 = (props: any) => (
  <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
);
export const H2 = (props: any) => (
  <h2 className="text-2xl font-semibold mt-6 mb-3 text-primary" {...props} />
);
export const H3 = (props: any) => (
  <h3 className="text-xl font-medium mt-4 mb-2" {...props} />
);
export const P = (props: any) => <p className="mb-4" {...props} />;
export const UL = (props: any) => (
  <ul className="list-disc list-inside mb-4" {...props} />
);
export const OL = (props: any) => (
  <ol className="list-decimal list-inside mb-4" {...props} />
);
export const LI = (props: any) => <li className="mb-2" {...props} />;
export const A = (props: any) => (
  <a className="text-primary hover:underline" {...props} />
);

export const CodeBlock = ({ children, className }: any) => {
  const [copied, setCopied] = useState(false);
  const language = className ? className.replace(/language-/, "") : "text";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          padding: "1rem",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
        }}
        wrapLines={true}
        wrapLongLines={false}
      >
        {children}
      </SyntaxHighlighter>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded bg-background text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};
