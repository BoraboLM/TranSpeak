// import * as React from "react"

// import { cn } from "@/lib/utils"

// const Textarea = React.forwardRef(({ className, height, ...props }, ref) => {
//   return (
//     (<textarea
//       className={cn(
//         `flex min-h-[${height}] w-full rounded-md border border-input bg-background px-3 py-2 text-lg font-[500] ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
//         className
//       )}
//       ref={ref}
//       {...props} />)
//   );
// })
// Textarea.displayName = "Textarea"

// export { Textarea }
import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, height, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-lg font-[500] ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{ minHeight: height }}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
