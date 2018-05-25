// Gets the average rating for a user given their ratings array
export function GetAverageRating(ratings) {
  if (ratings.length == 0) {
    return 0;
  }
  let total = 0;
  for (let i = 0; i < ratings.length; i++) {
    total += ratings[i].rating;
  }
  return total / ratings.length;
}
