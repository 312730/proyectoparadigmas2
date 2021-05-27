<template>
  <div>
    listado de libros:
    <form @submit.prevent="statusEditar ? update() : addLibro()">
      <p>
        <input type="text" v-model="titulo" placeholder="Titulo">
        <input type="text" v-model="autor" placeholder="Autor">
        <button type="submit">{{statusEditar ? "Editar": "Agregar"}}</button>
        <button v-if="statusEditar" @click="statusEditar = false, titulo='', autor=''">Cancelar</button>
      </p>
    </form>
    <br/>
    <img src="https://i.pinimg.com/originals/5c/88/7b/5c887b98b2e06f51d91a5b639fd7219b.gif" width="150" height="150" v-if="cargando">
    <ul>
      <li v-for="libro in libros" :key="libro.titulo">
        {{libro.titulo}} - {{libro.autor}} - <button @click="deleteLibro(libro)">Eliminar</button>
        <button @click="select(libro)">Editar</button>
      </li>
    </ul>

  </div>
</template>

<script>
import {db} from './firebase'

export default {
  name: 'App',
  data(){
    return{
      libros:[],
      id:"",
      titulo:"",
      autor:"",
      cargando: false,
      statusEditar: false,
    }
  },
  created(){
    this.listarLibros();
  },
  methods:{
    async listarLibros(){
        this.cargando = true;
        const data = await db.collection("libros").get();
        this.libros = data.docs.map(doc =>({
          id: doc.id, ... doc.data()
        }))
        this.cargando = false
    },
    async addLibro(){
      await db.collection('libros').add({
        titulo: this.titulo,
        autor: this.autor
      })
      this.titulo = "";
      this.autor = "";
      this.listarLibros();
    },
    async deleteLibro(libro){
      if(confirm(`Esta seguro de eliminar ${libro.titulo}`)){
      await db.collection('libros').doc(libro.id).delete();
      this.listarLibros();
      }
    },
    async select(libro){
      this.statusEditar = true;
      this.id = libro.id;
      this.titulo = libro.titulo;
      this.autor = libro.autor;
    },
    async update(){
      await db.collection('libros').doc(this.id).set({
        titulo: this.titulo,
        autor: this.autor
      })
      this.statusEditar = false
      this.id = ''
      this.titulo = ''
      this.autor = ''
      this.listarLibros();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: center;
  color: black;
  margin-top: 30px;
  background-color: hotpink;
}
</style>
