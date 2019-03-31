const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let todoItems = [];
todoItems.push({index: 1, value: "learn react", done: false});
todoItems.push({index: 2, value: "Go shopping", done: true});
todoItems.push({index: 3, value: "buy flowers", done: true});
todoItems.push({index: 4, value: "buy flowers", done: true});
let index = 5;

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/tasks', (req, res) => {
	try {
		res.json({data: todoItems, status: 'success'})
		return res.json({data: todoItems, status: 'success'})
	} catch {
		return res.json({message: 'something wrong ...', status: 'error'})
	}
})

app.post('/tasks', (req, res) => {
	try {
		todoItems.push({
			index: index++,
			value: req.body.value,
			done: false,
		})
		return res.json({data: todoItems, status: 'success'})
	} catch {
		return res.json({message: 'something wrong ...', status: 'error'})
	}
})

app.delete('/tasks/:id', (req, res) => {
	try {
		todoItems = todoItems.filter(d => d.index !== +req.params.id)
		return res.json({data: todoItems, status: 'success'})
	} catch {
		return res.json({message: 'something wrong ...', status: 'error'})
	}
})

app.patch('/tasks/:id', (req, res) => {
	try {
		todoItems.filter(d => d.index === +req.params.id)[0].done = req.body.done
		return res.json({data: todoItems, status: 'success'})
	} catch {
		return res.json({message: 'something wrong ...', status: 'error'})
	}
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))