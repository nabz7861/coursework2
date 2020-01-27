const express = require('express');
let app = express()

app.get('/courses', (req, res) => {
res.json({'topic': 'math', 'location': 'hendon', 'price': 100 })

})
app.listen(3000);
        