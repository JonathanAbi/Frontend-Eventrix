require('dotenv').config();

const app = require('./src/app');
const PORT = process.env.PORT || 5000;

const sequelize = require('./src/config/database');
const User = require('./src/models/User');
const Event = require('./src/models/Event'); 
const Ticket = require('./src/models/Ticket');
const Token = require('./src/models/Token');

//{ alter: true } <-- ini gabisa ditaro terus karena dengan nodemon bisa bikin index penuh karena setiap restart 
sequelize.sync().then(() => { // alter: true untuk mengubah tabel yang sudah ada agar sesuai dengan model, digunakan pada development
    console.log('Database synced successfully.');
}).catch((err) => {
    console.error('Database sync failed:', err.message);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
