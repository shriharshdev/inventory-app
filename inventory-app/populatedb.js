const mongoose = require('mongoose');
const Item = require('./models/items'); // Adjust the path as needed
const Category = require('./models/category'); // Adjust the path as needed

// Connect to the MongoDB database
mongoose.connect("mongodb+srv://shriharshdev:x3ZKlcBmEltBNqyQ@cluster0.nrltan4.mongodb.net/inventory_app?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database.');

  // Now, you can start populating your database with sample data.
  populateDatabase();
});

// Define a function to populate the database with sample data
function populateDatabase() {
  // Create and save sample categories
  const categories = [
    new Category({
      name: 'Electronics',
      description: 'Electronic products category',
    }),
    // Add more categories as needed
  
  ];

  // Create and save sample items
  const items = [
    new Item({
      name: 'Smartphone',
      description: 'Latest smartphone model',
      category: categories[0]._id, // Reference the first category
      price: 599,
      stock: 100,
    }),

    // Add more items as needed
  ];

  // Save categories and items to the database
Category.insertMany(categories)
.then((savedCategories) => {
  console.log('Categories saved successfully.');

  // Update the category references in the items
  items.forEach((item, index) => {
    item.category = savedCategories[index]._id;
  });

  return Item.insertMany(items);
})
.then((savedItems) => {
  console.log('Items saved successfully.');

  // Disconnect from the database after populating
  mongoose.connection.close();
  console.log('Database connection closed.');
})
.catch((err) => {
  console.error('Error saving categories or items:', err);
});
}