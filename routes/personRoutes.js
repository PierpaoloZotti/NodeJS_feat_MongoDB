const router = require('express').Router();
const Person = require('../models/Person')

// Create - Cadastro de usuario
router.post('/', async (req, res) => {        //router.post('/person', era assim, tirei person por ser redundate
    const { name, salary, approved } = req.body;

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatorio' });
        return
    }
    if (!salary) {
        res.status(422).json({ error: 'O salario é obrigatorio' })
        return
    }
    if (!approved) {
        res.status(422).json({ error: 'O estado é obrigatorio' })
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    //metodo create de Mangoose

    try {

        await Person.create(person)

        res.status(201).json({ message: 'Usuario criado com sucesso' });

    }
    catch (err) {
        res.status(500).json({ error: error });
    }
})
// Read - Leitura dos usuarios todos do banco de dados

router.get('/', async (req, res) => {

    try {
        const people = await Person.find();
        res.status(200).json(people)
    }
    catch (err) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {

    //estrair os dados da requisicao
    const id = req.params.id;

    try {
        const person = await Person.findOne({ _id: id });
        if (!person) {
            res.status(424).json({ message: 'usuario não encontrado' })
            return
        }
        res.status(200).json(person);
    }
    catch (err) {
        res.status(500).json({ error: error });
    }
})

//Update : modifica do singolo usuario
//Existe o PUT e o PATCH, o PUT espera uma atualizacao de um
//objeto completo, ja o PATCH me permite de modificar um singolo
//campo

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, salary, approved } = req.body;
    const person = {
        name,
        salary,
        approved,
    }

    try {

        const updatedPerson = await Person.updateOne({ _id: id }, person)
        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'usuario não encontrado' })
            return
        }
        res.status(201).json(updatedPerson);

    } catch (error) {
        res.status(500).json({ error: error });
    }
})


//Delete: Excluir um usuario do database

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const person = await Person.deleteOne({ _id: id });
        if (!person) {
            res.status(424).json({ message: 'usuario não encontrado' })
            return
        }
        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({ error: error });
    }
})
module.exports = router;
