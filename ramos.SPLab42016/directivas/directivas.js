angular
  .module('angularABM')
  .directive('mostrarProductos', function() {
    
    return {
    	    scope:{
        misProductos: '=productos',
        borrarprod:'=borrarprod',
        mostrarcodigo:'=mostrarcodigo', 
        clickborrar:'&borrar'
         },
    	restrict:"MEAC",
        replace:true,
    	templateUrl:"templates/mostrarproductos.html"
         
         }
    	;

  }).directive('mostrarUsuarios', function() {
    
    return {
    	    scope:{
        misUsuarios: '=usuarios',
        borrarusuario:'=borrarusuario',
        modificarusuario:'=modificarusuario', 
        clickmodificar:'&modificar',
        clickborraruser:'&borraruser'
    
         },
    	restrict:"MEAC",
        replace:true,
    	templateUrl:"templates/mostrarusuarios.html"
         
         }
    	;

  })






  ;