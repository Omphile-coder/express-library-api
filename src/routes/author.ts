import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

const router = Router();

let authors = [
    { id: 1, name: "Professor Snape", email: "snape@hogwarts.com" },
    {id: 2, name: "Professor Dumbledore", email: "dumbledore@hogwarts.com"},
    
]


router.get("/", (req: Request, res: Response) => { 
    res.status(200).json(authors)
})

// http://localhost:3000/:id/2
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

    
})
export default router;