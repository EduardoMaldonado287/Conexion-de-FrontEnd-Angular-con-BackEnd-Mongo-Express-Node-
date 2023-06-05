import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit{
  formularioDeLibros:FormGroup;
  theISBN:any;

  constructor(
    private activeRoute: ActivatedRoute,
    private crudService: CrudService,
    public formulario: FormBuilder,
    private ruteador: Router
    ){
      this.theISBN=this.activeRoute.snapshot.paramMap.get('isbn');
      console.log(this.theISBN);
      this.crudService.ObtenerLibro(this.theISBN).subscribe(respuesta =>{
        console.log(respuesta);
        this.formularioDeLibros.setValue({
          isbn:respuesta[0]['isbn'],
          titulo:respuesta[0]['titulo'],
          autor:respuesta[0]['autor'],
          anio:respuesta[0]['anio'],
          editorial:respuesta[0]['editorial']
        });
      });

      this.formularioDeLibros = this.formulario.group({
        isbn:[''],
        titulo:[''],
        autor:[''],
        anio:[''],
        editorial:['']
      });
  }

  ngOnInit(): void {
    
  }

  EnviarDatos(){
    console.log(this.theISBN);
    console.log(this.formularioDeLibros.value);
    this.crudService.EditarLibro(this.theISBN, this.formularioDeLibros.value).subscribe(()=>{
      this.ruteador.navigateByUrl('/listar-libro');
    });
  }
  
}
