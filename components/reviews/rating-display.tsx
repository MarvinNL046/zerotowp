interface RatingDisplayProps {
  rating: number;
}

export default function RatingDisplay({ rating }: RatingDisplayProps) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-orange-500" : "text-slate-300"}
          aria-hidden="true"
          style={{ fontSize: "1.25rem", lineHeight: 1 }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
