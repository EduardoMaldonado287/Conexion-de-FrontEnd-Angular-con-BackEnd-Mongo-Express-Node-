const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');

router.get('/',async(req,res)=>{
    try{
        const arrayLibrosDB = await Libro.find();
        //console.log(arrayLibrosDB);
        res.json(arrayLibrosDB);
    }
    catch(error){
        console.log(error);
    }
});

router.get('/:id', async(req,res)=>{
    const id = req.params.id;
    try {
        const arrayLibrosDB = await Libro.find({isbn:id});
        console.log(arrayLibrosDB);
        res.json(arrayLibrosDB);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async(req,res)=>{
    const body = req.body;
    try {
        await Libro.create(body);
        res.json({estado:"Libro insertado correctamente"})
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id', async(req,res)=>{
    const id = req.params.id;
    try {
        const librosDB = await Libro.findOneAndDelete({isbn:id});
        if(librosDB){
            res.json({
                estado:true,
                mensaje:'libro eliminado'
            })
        }
        else{
            res.json({
                estado: false,
                mensaje:'No se pudo eliminar el libro solicitado'
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    try {
        const librosDB = await Libro.findOneAndUpdate({isbn:id}, body, {useFindAndModify:false});
        res.json({
            estado: true,
            mensaje: 'El libro ha sido actualizado correctamente'
        })
    } catch (error) {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'Los datos del libro no fueron actualizados'
        })
    }
});

module.exports=router;