angular
  .module('angularABM')
  .service('serviceUser',function($http){
    
    this.Guardar=Guardar;
    this.TraerUsuarios=TraerUsuarios;
    this.borrarusuario=borrarusuario;
    this.Editar=Editar;
     this.modificarusuario=modificarusuario;
   
    var urlE="http://127.0.0.1/ramos.SPLab42016/vendor/index.php/EditarUsuario/";
    var urlG="http://127.0.0.1/ramos.SPLab42016/vendor/index.php/usuario/";
    var urlB="http://127.0.0.1/ramos.SPLab42016/vendor/index.php/borrarUsuario/"
    var urlT="http://127.0.0.1/ramos.SPLab42016/vendor/index.php/traerUsuarios";
    var urlM="http://127.0.0.1/ramos.SPLab42016/vendor/index.php/modificarUsuario/";

 function Guardar(parametro){
 console.info(parametro);
      return $http.post(urlG+JSON.stringify(parametro)).then(
        function (respuesta){
         
          return respuesta;
        },
        function (error){
          return error;
        }
      );
    }
     function Editar(parametro){
 console.info(parametro);
      return $http.put(urlE+JSON.stringify(parametro)).then(
        function (respuesta){
         
          return respuesta;
        },
        function (error){
          return error;
        }
      );
    }
     function borrarusuario(id){
 console.info(id);
      return $http.delete(urlB+id).then(
        function (respuesta){
         
          return respuesta;
        },
        function (error){
          return error;
        }
      );
    }
         function modificarusuario(id){
 console.info(id);
      return $http.put(urlM+id).then(
        function (respuesta){
         
          return respuesta;
        },
        function (error){
          return error;
        }
      );
    }
 function TraerUsuarios(){
      return $http.get(urlT).then(
        function (respuesta){
         
          return respuesta;
        },
        function (error){
          return error;
        }
      );
    }


  })

  ;