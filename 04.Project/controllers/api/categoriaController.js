import { CategoriaEcom } from "../../models/index.js";

export const listCategorias = async (req, res, next) => {
  try {
    const cats = await CategoriaEcom.findAll()
    res.json(cats)
  } catch(e){ next(e) }
}