import Rating from "../../models/Management/Rating";

class RatingController {
  async store(req, res) {
    const {
      book_id,
      comment,
      star_rating,
    } = req.body;

    const student_id = req.userId;
    const student_name = req.userFullName;

    try {
      const newRating = await Rating.create({
        book_id, student_name, student_id, comment, star_rating,
      })

      return res.status(200).json(newRating)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}

export default new RatingController();
