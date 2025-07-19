import Review from '../models/review.js';
import Product from '../models/product.js';

export const createReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const user = req.user.id;

    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const existingReview = await Review.findOne({ user, product });
    if (existingReview) {
      return res.status(400).json({ message: 'Ya has hecho una reseña de este producto' });
    }

    const review = new Review({
      user,
      product,
      rating,
      comment
    });

    await review.save();
    await review.populate(['user', 'product']);

    res.status(201).json({
      message: 'Reseña creada exitosamente',
      review
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error al crear la reseña', error: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('product', 'name price');

    res.status(200).json({
      message: 'Reseñas obtenidas exitosamente',
      count: reviews.length,
      reviews
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas', error: error.message });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
      .populate('user', 'name email')
      .populate('product', 'name price');

    res.status(200).json({
      message: 'Reseñas del producto obtenidas exitosamente',
      count: reviews.length,
      reviews
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas del producto', error: error.message });
  }
};

export const getReviewsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ user: userId })
      .populate('user', 'name email')
      .populate('product', 'name price');

    res.status(200).json({
      message: 'Reseñas del usuario obtenidas exitosamente',
      count: reviews.length,
      reviews
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas del usuario', error: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id)
      .populate('user', 'name email')
      .populate('product', 'name price');

    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    res.status(200).json({
      message: 'Reseña obtenida exitosamente',
      review
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error al obtener la reseña', error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: 'No tienes permisos para actualizar esta reseña' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true, runValidators: true }
    ).populate(['user', 'product']);

    res.status(200).json({
      message: 'Reseña actualizada exitosamente',
      review: updatedReview
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reseña', error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: 'No tienes permisos para eliminar esta reseña' });
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Reseña eliminada exitosamente'
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reseña', error: error.message });
  }
};

export const getProductReviewStats = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId });

    if (reviews.length === 0) {
      return res.status(200).json({
        message: 'No hay reseñas para este producto',
        averageRating: 0,
        totalReviews: 0,
        ratingsDistribution: {}
      });
    }

    const totalReviews = reviews.length;
    
    const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = sumRatings / totalReviews;

    const ratingsCount = {};
    reviews.forEach(review => {
      const rating = review.rating;
      ratingsCount[rating] = (ratingsCount[rating] || 0) + 1;
    });

     res.status(200).json({
      message: 'Estadísticas obtenidas exitosamente',
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      ratingsDistribution: ratingsCount
    });

  }
  catch (error) {
    res.status(500).json({ message: 'Error al obtener las estadísticas', error: error.message });
  }
};

export {
  createReview,
  getAllReviews,
  getReviewsByProduct, 
  getReviewsByUser,  
  getReviewById,
  updateReview,
  deleteReview,
  getProductReviewStats
}
