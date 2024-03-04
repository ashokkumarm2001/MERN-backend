const mongoose = require('mongoose');
// Allow Promises
mongoose.Promise = global.Promise;
// Connection
mongoose.connect('mongodb+srv://ashokkumarm:GYqC9HgDx9XLdVKl@cluster0.z5cunk1.mongodb.net/test_db?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify:false  });
// Validation
mongoose.connection
  .once('open', () => console.log('Connected to the database!'))
  .on('error', err => console.log('Error with the database!', err));
