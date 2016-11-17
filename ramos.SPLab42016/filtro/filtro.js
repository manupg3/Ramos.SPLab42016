angular.module('app')
  .filter('perfil',function(){
   return function(perfil){
       switch(perfil){
         case 1:
            return "admin";
 	     case 2:
            return "comprador";
         case 3:
            return "vendedor";

       }

   }

  })

  ;