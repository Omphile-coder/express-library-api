import { Request, Response } from 'express';


let authors = [
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