const mongoose = require('mongoose');

const createConnection = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Connection successful: ${connection.connection.host}`);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = createConnection;