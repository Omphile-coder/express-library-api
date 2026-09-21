import { Router, Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { getAllBooks, getBookByID, createBook, updateBook, deleteBook } from '../controllers/books';

const router = Router();

// Reusable validation check
const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get("/", [
    query("year").optional().isInt().withMessage("Year must be an integer")
], validate, getAllBooks);

router.get("/:id", [
    param("id").isInt().withMessage("ID must be an integer")
], validate, getBookByID);

router.post("/", [
    body("title").notEmpty().withMessage("Title is required"),
    body("year").isInt().withMessage("Year must be a valid integer"),
    body("authorId").isInt().withMessage("authorId is required and must be an integer")
], validate, createBook);

router.put("/:id", [
    param("id").isInt().withMessage("ID must be an integer"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("year").optional().isInt().withMessage("Year must be an integer"),
    body("authorId").optional().isInt().withMessage("authorId must be an integer")
], validate, updateBook);

router.delete("/:id", [
    param("id").isInt().withMessage("ID must be an integer")
], validate, deleteBook);

export default router;