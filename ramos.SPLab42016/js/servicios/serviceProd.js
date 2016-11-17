angular
  .module('angularABM')
  .service('serviceProd',function($http){
      
    var urlG="http://127.0.0.1/ramos.SPLab42016/vendor/index.php/traerProductos";
    var urlB="http://127.0.0.1/ramos.SPLab42016/vendor/index.php/borrarProd/"
    
    this.borrar=borrar;
    this.traerProductos = function(){
      return $http.get(urlG).then(function(data){
        return data.data;
      });
    }

function borrar(id){
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


  })

  ;