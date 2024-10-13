import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";

import { cn, range } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

const PaginationWrapper = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
PaginationWrapper.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  )
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      "px-3",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn("", className)} {...props}>
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationSuperPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn("", className)} {...props}>
    <ChevronsLeft className="h-4 w-4" />
  </PaginationLink>
);
PaginationSuperPrevious.displayName = "PaginationSuperPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("", className)} {...props}>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationSuperNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("", className)} {...props}>
    <ChevronsRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationSuperNext.displayName = "PaginationSuperNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

interface PaginationProps {
  totalPages?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, className }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (Number(searchParams.get("page")) > Number(totalPages)) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
  }, [searchParams, totalPages]);

  if (!totalPages || totalPages === 1) {
    return null;
  }

  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const goTo = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const goNext = () => {
    goTo(currentPage + 1);
  };
  const goPrev = () => {
    goTo(currentPage - 1);
  };

  const start =
    currentPage > 1 && totalPages > 5 ? (totalPages - currentPage <= 4 ? totalPages - 6 : currentPage - 2) : 0;
  const end = currentPage + 4 + (currentPage === 1 ? 1 : 0);

  return (
    <PaginationWrapper className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationSuperPrevious disabled={currentPage === 1} className="select-none" onClick={() => goTo(1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious disabled={currentPage === 1} className="select-none" onClick={goPrev} />
        </PaginationItem>
        {range(totalPages)
          .slice(start, end)
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink className="select-none" isActive={currentPage === page} onClick={() => goTo(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationNext disabled={currentPage === totalPages} className="select-none" onClick={goNext} />
        </PaginationItem>
        <PaginationItem>
          <PaginationSuperNext
            disabled={currentPage === totalPages}
            className="select-none"
            onClick={() => goTo(totalPages)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
};

export {
  Pagination,
  PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
