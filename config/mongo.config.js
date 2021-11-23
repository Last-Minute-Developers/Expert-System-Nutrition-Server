const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect("mongodb+srv://william:immanuel245@cluster0.jaoq5.mongodb.net/nutritions?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => {
    console.log('connect to DB')
  })
}
