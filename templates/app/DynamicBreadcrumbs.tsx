"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface Props {
  origin: string;
  originPathname: string;
}

const DynamicBreadcrumbs = ({ origin, originPathname }: Props) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${originPathname}`}>{origin}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          // Decode the segment to handle accents and other special characters
          const decodedSegment = decodeURIComponent(segment);

          // Skip the root segment if it's the same as the origin
          if (
            index === 0 &&
            decodedSegment.toLowerCase() === originPathname.toLowerCase()
          ) {
            return null;
          }

          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {decodedSegment.charAt(0).toUpperCase() +
                      decodedSegment.slice(1)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>
                      {decodedSegment.charAt(0).toUpperCase() +
                        decodedSegment.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumbs;
