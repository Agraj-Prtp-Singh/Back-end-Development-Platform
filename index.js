const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());


const readNotes = ()=>{
  const data = fs.readFileSync('notes.json');
  return JSON.parse(data);
}

const writeNotes = (notes)=>{
  fs.writeFileSync('notes.json', JSON.stringify( notes, null, 2));
};


app.get('/notes', (req, res)=>{
  const notes = readNotes();
  res.json(notes);
});


app.get('/notes/:id', (req, res) => {
  const notes = readNotes();
  const note = notes.find(n => n.id == req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});


app.post('/notes', (req, res)=>{
  const notes = readNotes();
  const newNote = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote)
})

app.put('/notes/:id', (req, res) => {
  const notes = readNotes();
  const index = notes.findIndex(n => n.id == req.params.id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...req.body };
    writeNotes(notes);
    res.json(notes[index]);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});
app.delete('/notes/:id' ,(req, res)=>{
  const notes = readNotes();
  const filteredNotes = notes.filter(n => n.id != req.params.id);

  if(notes.length === filteredNotes.length){
    return res.status(404).json({ message: "Note not found" });
  }

  writeNotes(filteredNotes);
  res.json({ message: "Note Deleted."});
});




app.listen(PORT, ()=>{
console.log(`Server is running on http://localhost:${PORT}`);
})