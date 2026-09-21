import { Request, Response } from 'express';
import { authors } from './authors';
import { title } from 'node:process';
import { error } from 'node:console';

export let books = [
    {id: 1, title: "Game of Thrones", year: 1996, authorId: 1}
];

// export const getAllBooks = (req: Request, res: Response) => {
//     const { title, year, author } = req.query
    
//     let filteredBooks = books;

//     // Filtering

//     if (title) {
//         filteredBooks = filteredBooks.filter(b => b.title.toLowerCase().includes(String(title).toLowerCase()))
//     }

//     if (year) {
//         filteredBooks = filteredBooks.filter(y => y.year === parseInt(String(year), 10))
//     }

//     if (author) {
//         const matchingAuthors = authors.filter(a => a.name.toLowerCase().includes(String(author).toLowerCase()));
//         const validAuthorIds = matchingAuthors.map(a => a.id);
//         filteredBooks = filteredBooks.filter(b => validAuthorIds.includes(b.authorId));
//     }

//     res.status(200).json(filteredBooks);
// };

// export const getBookById = (req: Request, res: Response) => { 
//     const { id } = req.params;
//     const book = books.find(b => b.id === parseInt(String(id), 10));

//     if (!book) {
//         return res.status(404).json({
//             error: "Not Found",
//             message: "Book not found"
//         })

//     }
    
//     res.status(200).json(book);
// }