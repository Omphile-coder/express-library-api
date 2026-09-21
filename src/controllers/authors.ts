import { Request, Response } from 'express';
import { error } from 'node:console';


export let authors = [
    { id: 1, name: "Professor Snape", email: "snape@hogwarts.com" },
    { id: 2, name: "Professor Dumbledore", email: "dumbledore@hogwarts.com" },
    
];


export const getAllAuthors : any = (req: Request, res: Response) => {
    res.status(200).json(authors)
} 
 
export const getAuthorByID : any  = (req: Request, res: Response) => {       
       const { id } = req.params
       const author = authors.find((author) => author.id === parseInt(String(id), 10));
       
       if (!author) {
           return res.status(404).send("User not Found");
       }
       
       res.status(200).json(author);
} 

export const createUser = (req: Request, res: Response) => {
     const { name, email } = req.body;

    const newAuthor = { id: authors.length + 1, name, email };

    authors.push(newAuthor);

    res.status(201).json(newAuthor);
} 

export const updateAuthor = (req: Request, res: Response) => {
    const { id }: any = req.params;
    const { name, email } = req.body;

    const author = authors.find(a => a.id === parseInt(id, 10));

    if (!author) {
        return res.status(404).json({
            error: "Not Found",
            message: "Author not found"
        });
    }

    if (name) {
        author.name = name;
    }

    if (email) {
        author.email = email;
    }

    return res.status(200).json(author);
};

export const deleteAuthor = (req: Request, res: Response) => { 
    const { id } = req.params;
    const index = authors.findIndex(a => a.id === parseInt(String(id), 10));

    if (index === -1) {
        return res.status(404).json({
            error: "Not Found",
            message: "Author not found"
        })

        authors.splice(index, 1);
        res.status(204).send();
    }
}