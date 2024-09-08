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
  <a className="text-primary underline" {...props} />
);
