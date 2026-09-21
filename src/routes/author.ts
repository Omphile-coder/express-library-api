import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import {
    createUser,
    deleteAuthor,
    getAllAuthors,
    getAuthorByID,
    updateAuthor
} from '../controllers/authors';

const router = Router();

let authors = [
    {
        id: 1,
        name: "Professor Snape",
        email: "snape@hogwarts.com"
    },
    {
        id: 2,
        name: "Professor Dumbledore",
        email: "dumbledore@hogwarts.com"
    }
];

// Get all Authors
router.get("/", getAllAuthors);

// Get Author by ID
router.get(
    "/:id",
    [param("id").isInt().withMessage("ID must be an integer")],
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        console.log(errors, "errors from express-validator middleware");

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        getAuthorByID(req, res);
    }
);

// Adding an Author
router.post(
    "/",
    [
        body("name")
            .notEmpty()
            .withMessage("Name is required"),

        body("email")
            .isEmail()
            .withMessage("Must be a valid email address")
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        console.log(req.body, "request");

        createUser(req, res);
    }
);

// Update an Author
router.put(
    "/:id",
    [
        param("id")
            .isInt()
            .withMessage("ID must be an integer"),

        body("name")
            .optional()
            .notEmpty()
            .withMessage("Name cannot be empty"),

        body("email")
            .optional()
            .isEmail()
            .withMessage("Must be a valid email address")
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        updateAuthor(req, res);
    }
);

// Delete Author
router.delete(
    "/:id",
    [
        param("id")
            .isInt()
            .withMessage("ID must be an integer")
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        deleteAuthor(req, res);
    }
);

// Get Books by Author (Sprint 4)
// router.get(
//     "/:id/books",
//     [param("id").isInt().withMessage("ID must be an integer")],
//     (req: Request, res: Response) => {
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array()
//             });
//         }

//         getBooksByAuthorId(req, res);
//     }
// );

export default router;