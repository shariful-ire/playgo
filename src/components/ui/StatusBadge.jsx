const statusStyles = {
  pending: "badge-warning",
  confirmed: "badge-success",
  cancelled: "badge-error",
};

const statusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

export default function StatusBadge({ status, className = "" }) {
  return (
    <span
      className={`badge ${statusStyles[status] || "badge-neutral"} rounded-full px-3 py-2 text-xs font-semibold ${className}`}
    >
      {statusLabels[status] || status}
    </span>
  );
}
