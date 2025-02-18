// Importamos el modelo de datos
const Library = require('../models/Library')

// Declaración de controladores 
const getBooks = (async (req, res) => {
    try{
        // Instanciamos un modelo Library
        let library = new Library({});
        // Lo usamos para listar libros
        let books = await library.listAll();
        console.log("Products loaded successfully "+ books)
        res.json(books);
        library.close();
    }
    catch{
        res.json("Error getting books...");
    }
})

const createBook = (async (req, res) => {
    try{
        // Instanciamos un modelo Library
        let library = new Library({});
        let books = await library.listAll();

        console.log("entra")

        // Creamos un libro nuevo
        const newBook = {
            id: books.length + 1,
            title: req.body.title,
            author: req.body.author,
            year: req.body.year
        };

        // Usamos el modelo Library para crear libro
        let created = await library.create(newBook);
    
        if(created){
            console.log("Product created successfully "+ created)
            res.json("Product created successfully")
        }
        else{
            console.log("Error creating new book...")
            res.json("Error creating new book...");
        }
        library.close()
    }
    catch{
        console.log("Error creating new book...")
        res.json("Error creating new book...");
    }
    
})

const deleteBook = (async (req, res) => {
    try {
        let library = new Library({});

        const delBook = {
            id: parseInt(req.body.id)
        };

        let deleted = await library.delete(delBook)

        if (deleted) {
            console.log("Product deleted successfully")
            res.json("Product deleted successfully")
        }
        else {
            console.log("Product not found... id:" + delBook.id)
            res.json("Product not found...")
        }

        library.close()
    }
    catch {
        console.log("Error deleting new book...")
        res.json("Error deleting new book...")
    }
})

const updateBook = (async (req, res) => {
    try {
        let library = new Library({});

        const updBook = {
            id: parseInt(req.body.id),
            title: req.body.title,
            author: req.body.author,
            year: parseInt(req.body.year)
        };

        let updated = await library.update(updBook)

        if (updated) {
            console.log("Product updated successfully")
            res.json("Product updated successfully")
        }
        else {
            console.log("Product not found... id:" + updBook.id)
            res.json("Product not found...")
        }
        
        library.close()
    }
    catch {
        console.log("Error updating new book...")
        res.json("Error updating new book...")
    }
})

module.exports = {
    getBooks: getBooks,
    createBook: createBook,
    updateBook: updateBook,
    deleteBook: deleteBook
}