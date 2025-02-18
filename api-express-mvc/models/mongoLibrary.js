const { MongoClient, ObjectId } = require("mongodb");
const dbConfig = require("../config/mongo.config.js");

class Library {
  constructor() {
    this.client = new MongoClient(dbConfig.URI);
    this.database = null;
    this.collection = null;
  }

  async connect() {
    if (!this.database) {
      await this.client.connect();
      console.log("Successfully connected to MongoDB.");
      this.database = this.client.db(dbConfig.DB);
      this.collection = this.database.collection("books");
    }
  }

  async close() {
    await this.client.close();
  }

  async listAll() {
    await this.connect();
    return await this.collection.find({}).toArray();
  }

  async create(newBook) {
    await this.connect();
    const result = await this.collection.insertOne(newBook);
    return result.insertedId;
  }

  async delete(delBook) {
    await this.connect();
    const book = await this.collection.findOne({ id: delBook.id });
  
    const result = await this.collection.deleteOne({ _id: book._id });
    return result.deletedCount;
  }
  
  async update(updBook) {
    await this.connect();
    const { title, author, year } = updBook;

    const book = await this.collection.findOne({ id: updBook.id });
    const result = await this.collection.updateOne(
      { _id: book._id },
      { $set: { title, author, year } }
    );
    return result.modifiedCount;
  }
  
}

module.exports = Library;
