if (process.env.NODE_ENV === 'production') {
  module.exports = {mongoURI:
      'mongodb+srv://grant:mypassword@cluster0-cruhs.mongodb.net/test?retryWrites=true&w=majority'}

} else {
  module.exports = {mongoURI:
    'mongodb+srv://grant:mypassword@cluster0-cruhs.mongodb.net/test?retryWrites=true&w=majority'}
  //module.exports = {mongoURI: 'mongodb://localhost/Xinventory'}
}
