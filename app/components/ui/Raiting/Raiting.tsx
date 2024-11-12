"use client";
import { useState } from "react";
import "./StarRating.css"; // Для стилей, чтобы менять цвет

interface Props {
  maxStars?: number;
  onChange: (rating: number) => void;
}

const StarRating = ({ maxStars = 5, onChange }: Props) => {
  const [rating, setRating] = useState(0); // Текущий рейтинг
  const [hoveredRating, setHoveredRating] = useState(0); // Рейтинг при наведении

  // Обработчик изменения рейтинга
  const handleClick = (index: any) => {
    setRating(index);
    onChange(index); // Вызов внешней функции для получения нового рейтинга
  };

  // Обработчик для наведения мышки
  const handleMouseEnter = (index: any) => {
    setHoveredRating(index);
  };

  // Обработчик, когда мышка покидает область
  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  // Создание массива звезд
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= (hoveredRating || rating) ? "filled" : ""}`}
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
      >
        ★
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
