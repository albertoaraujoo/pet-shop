import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type NavigationButtonProps = {
  tooltipText: string;
  children: React.ReactNode;
  onClick: () => void;
};

export const NavigationButton = ({
  tooltipText,
  children,
  onClick,
}: NavigationButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={onClick}
            className="h-12 w-9 border-border-primary bg-transparent text-content-primary hover:border-border-secondary hover:bg-background-tertiary hover:text-content-primary focus:border-border-brand focus-visible:border-border-brand focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0"
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-background-tertiary">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
