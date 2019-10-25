if (process.env.NODE_ENV === 'production') {
    module.exports = {mongoURI: 
        'mongodb+srv://grant:Tjackson1984@cluster0-cruhs.mongodb.net/test?retryWrites=true&w=majority'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost/Xinventory'}
}