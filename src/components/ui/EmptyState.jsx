import { RiCalendarCloseLine } from "react-icons/ri";
import Button from "./Button";

export default function EmptyState({
  icon: Icon = RiCalendarCloseLine,
  title = "Nothing here yet",
  message = "There are no items to display right now.",
  actionLabel,
  actionHref,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center">
      <Icon className="text-5xl text-base-content/20" />
      <h3 className="text-base-content/80">{title}</h3>
      <p className="text-sm text-base-content/50 max-w-sm">{message}</p>
      {actionLabel &&
        (actionHref ? (
          <a href={actionHref}>
            <Button variant="accent" size="sm">
              {actionLabel}
            </Button>
          </a>
        ) : (
          <Button variant="accent" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        ))}
    </div>
  );
}
