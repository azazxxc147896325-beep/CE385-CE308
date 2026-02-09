const express = require('express');
const app = express();

app.use(express.json());
const students = [
    { id: 1, name: "node" , age : 18 },
    { id: 2, name: "express", age : 19 },
    { id: 3, name: "Javascript", age : 20 }
];

function validateStudent(req, res, next) {
    const { name, age } = req.body;

    if (!req.body) {
        return res.status(400).send("Invalid data");
    }

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).send("Invalid data");
    }

    if (!age || isNaN(age)) {
        return res.status(400).send("Invalid data");
    }

    next();
}

app.get('/api/students', (req, res) => {
    res.send(students)
})
app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (student) {
        res.send(student);
    } else {
        res.status(404).send("Error 404: Student not found");
    }
})
app.post('/api/students',(req,res)=>{
    const { name , age } = req.body
    const idMax = Math.max(...students.map(s => s.id));
    const newStudent = {id: idMax + 1, name,age};
    

    students.push(newStudent)
    res.status(201).json(newStudent);
})
app.put('/api/students/:id', validateStudent, (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age } = req.body;

    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).send("Student not found");
    }

    student.name = name;
    student.age = age;

    res.json(student);
});
app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).send("Student not found");
    }

    students.splice(index, 1);
    res.send("Student deleted successfully");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});