const multer = require('multer');
const knex = require('./../db/database');

// Multer middleware
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img');
  },
  filename: (req, file, cb) => {
    // user-567sdcsd67dbcd-34567.jpg
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

exports.upload = multer({
  storage: multerStorage,
});

//------------------------------------------------------//

// 1. Add Product
exports.createProduct = async (req, res) => {
  try {
    const image = req.file.filename;
    const { title, price, brand, description, sale, count, category } =
      req.body;

    await knex('products').insert({
      title: title,
      price: price,
      brand: brand,
      description: description,
      count: count,
      category: category,
      sale: sale ? true : false,
      image: image,
    });

    // res.redirect('/login');
    // res.send(new_recipe);

    res.redirect('/add_product.html');
  } catch (error) {
    console.log(error);
  }
};

//-------------------------- API Endpoints --------------------------//

// 2. GET Products
exports.getProducts = async (req, res) => {
  try {
    const product = await knex('products').select('*');

    // const user = req.user;
    // res.locals.user = user;

    const user = res.locals.user;

    // res.send(JSON.stringify(product, user));
    res.json({ product, user });
  } catch (error) {
    console.log(error.message);
  }
};

// 3. GET Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await knex('categories').select('*');

    // const category_names = categories.map((cat) => cat.category_name);
    // res.render('add_product', { categories: category_names });

    res.send(JSON.stringify(categories));
  } catch (error) {
    console.log(error.message);
  }
};

// 4. GET Categories
exports.searchProducts = async (req, res) => {
  try {
    const { searchItem } = req.body;
    const results = await knex('products')
      .select('*')
      .where('title', 'like', `%${searchItem}%`)
      .orWhere('brand', 'like', `%${searchItem}%`)
      .orWhere('category', 'like', `%${searchItem}%`)
      .orWhere('description', 'like', `%${searchItem}%`);
    res.send(JSON.stringify(results));
  } catch (error) {
    console.log(error.message);
  }
};

// 4. Create Cart
exports.createCart = async (req, res) => {
  res.send('cart');
};
