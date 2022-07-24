const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
app.use(express.static('server/public'));

app.listen(port, () => {
    console.log('listening on port', port);
})