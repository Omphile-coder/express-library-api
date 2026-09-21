import { Request, Response } from 'express';
import { authors } from './authors';
import { title } from 'node:process';
import { error } from 'node:console';

export let books = [
    {id: 1, title: "Game of Thrones", year: 1996, authorId: 1}
];

export const getAllBooks = (req: Request, res: Response) => {
    const { title, year, author } = req.query
    
    let filteredBooks = books;

    // Filtering

    if (title) {
        filteredBooks = filteredBooks.filter(b => b.title.toLowerCase().includes(String(title).toLowerCase()))
    }

    if (year) {
        filteredBooks = filteredBooks.filter(y => y.year === parseInt(String(year), 10))
    }

    if (author) {
        const matchingAuthors = authors.filter(a => a.name.toLowerCase().includes(String(author).toLowerCase()));
        const validAuthorIds = matchingAuthors.map(a => a.id);
        filteredBooks = filteredBooks.filter(b => validAuthorIds.includes(b.authorId));
    }

    res.status(200).json(filteredBooks);
};

export const getBookByID = (req: Request, res: Response) => { 
    const { id } = req.params;
    const book = books.find(b => b.id === parseInt(String(id), 10));

    if (!book) {
        return res.status(404).json({
            error: "Not Found",
            message: "Book not found"
        })

    }
    
    res.status(200).json(book);
}

export const createBook = (req: Request, res: Response) => {
    const { title, year, authorId } = req.body;

    // Enforce Relationship
    const authorExists = authors.some(a => a.id === authorId);

    if (!authorExists) {
        return res.status(404).json({
            error: "Bad Request",
            message: "Invalid author id, Authot does not exist."
        })
    }

    // // Detect and prevent duplicate books
    // const duplicateBook = books.find(b => b.title.toLowerCase() === title.toLowerCase());
    // if (duplicateBook) {
    //     return res.status(409).json({
    //         error: "Conflict",
    //         message: "A book with this title already exists."
    //     });
// }

    const newBook = { id: books.length ? books[books.length - 1].id + 1 : 1, title, year, authorId };
    books.push(newBook);
    res.status(201).json(newBook);

}
 

export const updateBook = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, year, authorId } = req.body;
    
    const book = books.find(b => b.id === parseInt(String(id), 10));
    if (!book) return res.status(404).json({ error: "Not Found", message: "Book not found" });

    if (authorId) {
        const authorExists = authors.some(a => a.id === authorId);
        if (!authorExists) return res.status(400).json({ error: "Bad Request", message: "Invalid authorId." });
        book.authorId = authorId;
    }

    if (title) {
         const duplicateBook = books.find(b => b.title.toLowerCase() === title.toLowerCase() && b.id !== book.id);
         if (duplicateBook) return res.status(409).json({ error: "Conflict", message: "Title already in use." });
         book.title = title;
    }
    
    if (year) book.year = year;

    res.status(200).json(book);
};

export const deleteBook = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = books.findIndex(b => b.id === parseInt(String(id), 10));
    
    if (index === -1) return res.status(404).json({ error: "Not Found", message: "Book not found" });
    
    books.splice(index, 1);
    res.status(204).send();
};

// // Sprint 4: List Books By an Author
// export const getBooksByAuthorId = (req: Request, res: Response) => {
//     const { id } = req.params;
//     const authorId = parseInt(id, 10);
    
//     const authorExists = authors.some(a => a.id === authorId);
//     if (!authorExists) return res.status(404).json({ error: "Not Found", message: "Author not found" });

//     const authorBooks = books.filter(b => b.authorId === authorId);
//     res.status(200).json(authorBooks);
// };