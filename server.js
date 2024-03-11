const app = require("./app");
const dotenv = require("dotenv");
const PORT = 3000;

const start = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }
)}

if (require.main === module) {
    start();
}