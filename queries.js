// Basic CRUD Operations

// Find all books in a specific genre
db.books.find({ genre: "Thriller" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } })

// Find books by a specific author
db.books.find({ author: "Tara Westover" })

// Update the price of a specific book
db.books.updateOne({ title: "Educated" }, { $set: { price: 12.99 } })

// Delete a book by its title
db.books.deleteOne({ title: "The Silent Patient" })

// Advanced Queries

// Find books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sort by price ascending
db.books.find().sort({ price: 1 })

// Sort by price descending
db.books.find().sort({ price: -1 })

// Pagination: page 1 (first 5 books)
db.books.find().skip(0).limit(5)

// Pagination: page 2 (next 5 books)
db.books.find().skip(5).limit(5)

// Aggregation Pipelines

// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] },
      count: 1,
      _id: 0
    }
  }
])

// Indexing

// Create index on title
db.books.createIndex({ title: 1 })

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Use explain() to analyze performance
db.books.find({ title: "Educated" }).explain("executionStats")
