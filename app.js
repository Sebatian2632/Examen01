const express = require("express");
const app = express();
const puerto = process.env.PORT || 3000;
//Midlware
app.use(express.json());

//Areglo de objetos de estudiantes
let estudiantes = [
    {
        id: 1,
        nombre: "Braulio",
        apellido: "Vazquez",
        fecha_nacimiento: "26/03/2002",
        carrera: "Sistemas digitales"
    },
    {
        id: 2,
        nombre: "Laura",
        apellido: "González",
        fecha_nacimiento: "15/07/1995",
        carrera: "Ingeniería Civil"
    },
    {
        id: 3,
        nombre: "Carlos",
        apellido: "Pérez",
        fecha_nacimiento: "02/11/1990",
        carrera: "Medicina"
    },
    {
        id: 4,
        nombre: "Ana",
        apellido: "Rodríguez",
        fecha_nacimiento: "10/05/1998",
        carrera: "Derecho"
    },
    {
        id: 5,
        nombre: "Pedro",
        apellido: "Martínez",
        fecha_nacimiento: "18/09/2005",
        carrera: "Arquitectura"
    },
    {
        id: 6,
        nombre: "María",
        apellido: "López",
        fecha_nacimiento: "03/12/1993",
        carrera: "Psicología"
    },
    {
        id: 7,
        nombre: "Juan",
        apellido: "Hernández",
        fecha_nacimiento: "20/08/1999",
        carrera: "Administración de Empresas"
    },
    {
        id: 8,
        nombre: "Sofía",
        apellido: "Gómez",
        fecha_nacimiento: "14/06/2000",
        carrera: "Contabilidad"
    },
    {
        id: 9,
        nombre: "Diego",
        apellido: "Ramírez",
        fecha_nacimiento: "07/04/1997",
        carrera: "Marketing"
    },
    {
        id: 10,
        nombre: "Elena",
        apellido: "Fernández",
        fecha_nacimiento: "30/01/2003",
        carrera: "Educación"
    }
];

app.get('/socios/v1/estudiantes', (req,res)=>{
    if(estudiantes.length > 0)
    {
        res.status(200).json({
            estado:1,
            mensaje:"Existen estudiantes",
            estudiantes: estudiantes
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"No se encontron estudiantes",
            estudiantes: estudiantes
        })
    }
})

app.get('/socios/v1/estudiantes/:id', (req,res)=>{
    const id = req.params.id;
    const estudiante = estudiantes.find(estudiante=>estudiante.id==id)
    if(estudiante)
    {
        res.status(200).json({
            estado:1,
            mensaje:"Estudiante encontrado",
            estudiante:estudiante
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"Estudiante no encontrado"
        })
    }
})

app.post('/socios/v1/estudiantes', (req,res)=>{
    const { nombre, apellido, fechaNacimiento, carrera } = req.body;
    const maxId = estudiantes.reduce((max, estudiante) => (estudiante.id > max ? estudiante.id : max), 0);
    const id = maxId + 1;
    if (!nombre || !apellido || !fechaNacimiento || !carrera) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parámetros en la solicitud"
        });
    }
    else
    {
        const estudiante = {id:id,nombre:nombre,apellido:apellido,fechaNacimiento:fechaNacimiento,carrera:carrera};
        const logitInicial = estudiantes.length;
        estudiantes.push(estudiante)
        if(estudiantes.length>logitInicial)
        {
            res.status(201).json({
                estado:1,
                mensaje:"Estudiante agregado con exito",
                estudiante:estudiante
            })
        }
        else
        {
            res.status(500).json({
                estado:0,
                mensaje:"Ocurrio un error desconocido",
            })
        }
    }
})

app.put('/socios/v1/estudiantes/:id', (req,res)=>{
    const {id} = req.params;
    const {nombre,apellido, fechaNacimiento,carrera} = req.body;
    if(!nombre || !apellido || !fechaNacimiento || !carrera)
    {
        res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros en la solicitud"
        })
    }
    else
    {
        const posActualizar = estudiantes.findIndex(estudiante => estudiante.id==id)
        if(posActualizar!= -1)
        {
            estudiantes[posActualizar].nombre = nombre;
            estudiantes[posActualizar].apellido = apellido;
            estudiantes[posActualizar].fecha_nacimiento = fechaNacimiento;
            estudiantes[posActualizar].carrera = carrera;
            res.status(200).json({
                estado: 1,
                mensaje: "Informacion del estudiante actualizada",
                estudiante: estudiantes[posActualizar]
            })            
        }
        else
        {
            res.status(404).json({
                estado:0,
                mensaje:"Estudiante no encontrado"
            })
        }
    }
})

app.delete('/socios/v1/estudiantes/:id', (req,res)=>{
    const {id} = req.params;
    const indiceEliminar = estudiantes.findIndex(estudiante => estudiante.id == id)
    if(indiceEliminar != -1)
    {
        estudiantes.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"Informacion del alumno eliminada con exito"
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"Estudiante no encontrado"
        })
    }
})

app.listen(puerto,()=>{
    console.log('Servidor corriendo en el pierto: ', puerto);
})