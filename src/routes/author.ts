import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { createUser, getAllAuthors, getAuthorByID } from '../controllers/authors';

const router = Router();

let authors = [
    { id: 1, name: "Professor Snape", email: "snape@hogwarts.com" },
    {id: 2, name: "Professor Dumbledore", email: "dumbledore@hogwarts.com"},
    
]

//Get all Authors
router.get("/", getAllAuthors);

// Get Author by ID
router.get("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors, "errors from express-validator middleware")

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    getAuthorByID(req, res)

});

// Adding a Author
router.post("/", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Must be a valid email address"),
    
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    console.log(req.body, 'request');

    createUser(req, res);
        
});
export default router;