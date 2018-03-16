// Gets the average rating for a user given their ratings array
export function GetAverageRating(ratings, length, total) {
  if (ratings.length === 0) {
    return total / length === 0 ? 1 : length;
  }
  const newTotal = total + ratings.pop().rating;
  return GetAverageRating(ratings, newTotal);
}
