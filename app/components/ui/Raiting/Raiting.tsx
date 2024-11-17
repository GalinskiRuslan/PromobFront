"use client";
import { useEffect, useState } from "react";
import "./StarRating.css"; // Для стилей, чтобы менять цвет

interface Props {
  maxStars?: number;
  onChange: (rating: number) => void;
  readOnly?: boolean;
  value?: number;
}

const StarRating = ({
  maxStars = 5,
  onChange,
  readOnly = false,
  value,
}: Props) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleClick = (index: any) => {
    if (readOnly) return;
    setRating(index);
    onChange(index);
  };

  const handleMouseEnter = (index: any) => {
    if (readOnly) return;
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoveredRating(0);
  };
  useEffect(() => {
    setRating(value ? value : 0);
  }, [value]);

  // Создание массива звезд
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span
        key={i}
        className={
          readOnly
            ? `star1 ${i <= (hoveredRating || rating) ? "filled" : ""}`
            : `star ${i <= (hoveredRating || rating) ? "filled" : ""}`
        }
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: readOnly ? "default" : "pointer" }}
      >
        ★
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
