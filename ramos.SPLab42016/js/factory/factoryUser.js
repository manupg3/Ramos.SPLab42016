angular
  .module('angularABM')
  .factory('factoryConServicioUser',function(serviceUser){
   var ret={};
   ret.nombre="factoryUser";
   ret.Traer=Traer;
   ret.Guardar=Guardar;
   ret.borraruser=borraruser;
   ret.editar=editar;
   ret.modificaruser=modificaruser;
   return ret;

    function Guardar(parametro){
      return serviceUser.Guardar(parametro);
    }   

    function editar(parametro){
      return serviceUser.Editar(parametro);
    }   
 function Traer(){
      return serviceUser.TraerUsuarios();
    }   

function borraruser(id){
      return serviceUser.borrarusuario(id);
    }
    function modificaruser(id){
      return serviceUser.modificarusuario(id);
    }
  })

  ;