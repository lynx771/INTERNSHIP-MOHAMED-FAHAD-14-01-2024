const express=require('express')
const mongoose=require('mongoose')
const Student = require('./models/Student')
const Class = require('./models/Class')
const app= express()


app.use(express.json())

app.post('/student',async(req,res)=>{
   try{
    const student= await Student.create(req.body)
    res.status(500).json(student);

   }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message})

   }
}
)
app.post('/clasS',async(req,res)=>{
    try{
     const clasS= await Class.create(req.body)
     res.status(500).json(clasS);
 
    }catch(error){
     console.log(error.message);
     res.status(500).json({message: error.message})
 
    }
 }
 )
 //update
// Update Student’s Class with standard and division
app.put('/student/:id', async (req, res) => {
    try {
        const { ClassId } = req.body;

        // Assuming your Student model has a reference to Class
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { $set: { ClassId } },
            { new: true }
        );

        // Retrieve the associated Class and update its information
        const studentClass = await Class.findById(updatedStudent.ClassId);
        // Assuming your Class model has 'standard' and 'division' fields
        studentClass.standard = req.body.standard;
        studentClass.division = req.body.division;
        await studentClass.save();

        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Assuming you have the necessary imports and middleware set up

// Read All Students in a class with standard and division
app.get('/student/clasS', async (req, res) => {
    try {
      const { standard, division } = req.query;
  
      // Find the class based on standard and division
      const targetClass = await Class.findOne({ standard, division });
  
      if (!targetClass) {
        return res.status(404).json({ error: 'Class not found' });
      }
  
      // Find all students belonging to the target class
      const studentsInClass = await Student.find({ ClassId: targetClass._id });
  
      res.json(studentsInClass);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/student/standard', async (req, res) => {
    try {
        const { standard } = req.query;

        if (!standard) {
            return res.status(400).json({ error: 'Please provide the standard parameter.' });
        }

        // Find all students with the specified standard
        const studentInStandard = await Student.find({ standard });

        if (studentInStandard.length === 0) {
            return res.status(404).json({ error: 'No students found for the specified standard.' });
        }

        res.json(studentInStandard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete student
app.delete('/student/:id', async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
  
      if (!deletedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

 //delete class
 app.delete('/class/:id', async (req, res) => {
    try {
      const deletedClass = await Class.findByIdAndDelete(req.params.id);
  
      if (!deletedClass) {
        return res.status(404).json({ error: 'Class not found' });
      }
  
      res.json({ message: 'Class deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


  
  

mongoose.
connect('mongodb+srv://som:sompass@cluster0.amjfqvw.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected to Mongodb")

    app.listen(3000,()=>{
        console.log('node api is rinning on port 3000')
    });
}).catch((error)=>{
    console.log('error')
})