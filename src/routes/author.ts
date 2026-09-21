import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

const router = Router();

let authors = [
    { id: 1, name: "Professor Snape", email: "snape@hogwarts.com" },
    {id: 2, name: "Professor Dumbledore", email: "dumbledore@hogwarts.com"},
    
]

//Get all Authors
router.get("/", (req: Request, res: Response) => { 
    res.status(200).json(authors)
})

// Get Author by ID
router.get("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors, "errors from express-validator middleware")

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { id } = req.params
    const author = authors.find((author) => author.id === parseInt(String(id), 10));
    
    if (!author) {
        return res.status(404).send("User not Found");
    }
    
    res.status(200).json(author);

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

    const { name, email } = req.body;

    const newAuthor = { id: authors.length + 1, name, email };

    authors.push(newAuthor);

    res.status(201).json(newAuthor);
        
});
export default router;