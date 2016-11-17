angular
  .module('angularABM')
  .factory('factoryConServicioProd',function(serviceProd){
   var ret={};
   ret.nombre="factory";
   ret.traerTodo=traerTodo;
   ret.borrar=borrar; 
   return ret;

   function traerTodo(){
   	return serviceProd.traerProductos();
   }   

   function borrar(id){
     return serviceProd.borrar(id);
   }

  })

  ;