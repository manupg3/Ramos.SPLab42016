
var miApp = angular.module("angularABM",['ui.router','satellizer','angular-jwt','angularFileUpload']);
       


miApp.config(function($stateProvider,$urlRouterProvider, $authProvider){

      $pathName = window.location.pathname.substring(1);
	$authProvider.loginUrl = $pathName +'PHP/jwt/php/auth.php';
	console.log($authProvider.loginUrl);
   
	//$authProvider.loginUrl = 'ABM_AngularJs_PHP_persona/PHP/jwt/php/auth.php';	
	$authProvider.tokenName = 'ElNombreDelToken';
	$authProvider.tokenPrefix = 'Aplicacion' ;
	$authProvider.authHearder = 'data';


	$stateProvider
	.state(
		"inicio",{
			url:"/inicio",
			templateUrl:"inicio.html",
			controller:"controlInicio"
		})


	.state('app',
			{
					url:'/app',
					abstract:true,					
					templateUrl: 'appabstract.html',
	})
		.state('headerLocales',
			{
					url:'/headerLocales',
					abstract:true,					
					templateUrl: 'headerLocalesAbstract.html',
	})


	.state(
		"app.login",{
			url:"/login",
			views: {
				"contenidoRL":{
					templateUrl:"login.html",
				    controller:"controlRegisterLogin"
					}
				}			
		})

.state(
		"app.registro",{
			url:"/registro",
			views: {
				"contenidoRL":{
					templateUrl:"altaUsuario.html",
				    controller:"controlRegistro"
					}
				}			
		})
.state(
		"headerLocales.alta",{
			url:"/alta",
			views: {
				"contenidoLocales":{
					templateUrl:"altaProducto.html",
				    controller:"controlAltaProducto"
					}
				}			
			})	

.state(
		"headerLocales.locales",{
			url:"/locales",
			views: {
				"contenidoLocales":{
					templateUrl:"locales.html",
				    controller:"controlLocales"
					}
				}			
		})

.state(
		"headerLocales.productos",{
			url:"/productos",
			views: {
				"contenidoLocales":{
					templateUrl:"productos.html",
				    controller:"controlGrillaProdcutos"
					}
				}			
		})

	.state(
		"persona",{
					url:"/persona",
					abstract:true,
					templateUrl:"abstractaPersona.html"
				})	

	.state(
		"headerLocales.menu",{
			url:"/menu",
			views: {
				"contenidoLocales":{
					templateUrl:"MenuAdmin.html",
				    controller:"controlMenuAdmin"
					}
				}			
		})

	.state(
		"persona.alta",{
			url:"/alta",
			views: {
				"contenido":{
					templateUrl:"personaAlta.html",
				    controller:"controlAltaPersonaALta"
					}
				}			
			})	
		
	.state(
		"persona.modificacion",
			{
				url: '/modificacion/:usuario',
				views: 
				{
					"contenido":{					
						templateUrl: "personaModificacion.html",
						controller: "controlModificacion"
						}
				},

			})


	.state(
		"persona.grilla",{
			url:"/grilla",
			views: {
				"contenido":{
					templateUrl:"personaGrilla.html",
				 	controller:"controlgrillaPersona"
					}
				}			
		})

	.state(
		"persona.listadoUsuarios",{
			url:"/listadoUsuarios",
			views: {
				"contenido":{
					templateUrl:"listadoUsuarios.html",
				 	controller:"controlListadoUsuarios"
					}
				}			
		})
		
		
	$urlRouterProvider.otherwise("/app/login");
});
miApp.filter('perfil',function(){
   return function(perfil){
       switch(perfil){
         case '1':
            return "admin";
 	     case '2':
            return "comprador";
         case '3':
            return "vendedor";

       }

   }

  });

miApp.controller('controlRegisterLogin', function($scope, $auth, $state,jwtHelper) { 
    
    $auth.logout(); 
     $scope.admin=function(){
	$scope.usuario = {};
	$scope.usuario.pass = "123" ;
	$scope.usuario.mail = "manu@mail" ;
	$scope.usuario.nombre = "jose" ;
        
     };
     $scope.comprador=function(){
	$scope.usuario = {};
	$scope.usuario.pass = "password" ;
	$scope.usuario.mail = "asd@asfadf" ;
	$scope.usuario.nombre = "Manuel" ;
        
     };
     $scope.vendedor=function(){
	$scope.usuario = {};
	$scope.usuario.pass = "1234" ;
	$scope.usuario.mail = "vendedor@mail" ;
	$scope.usuario.nombre = "Martin" ;
        
     };
  
	$scope.usuario = {};
	$scope.usuario.pass = "" ;
	$scope.usuario.mail = "" ;
	$scope.usuario.nombre = "" ;
	$scope.logueo = true; // false--> muestra
	// if ($auth.isAuthenticated()) {}else{$state.go("login");}
    console.log($scope.usuario);
	$scope.iniciarSesion = function()
	{
                   
  
		console.log($scope.usuario);
		  $auth.login({
             usuario:$scope.usuario.mail,
             clave:$scope.usuario.pass,
             nombre:$scope.usuario.nombre
		  })
  			.then(function(response) {
                  console.log(response);
                  console.info("correcto" + $auth.setToken());
    			  console.info("correcto:"  + response.data.ElNombreDelToken);
            
    			if($auth.isAuthenticated())
    			//if(response.data.ElNombreDelToken!=false)
    			{
    				var logeado=jwtHelper.decodeToken($auth.getToken());
    		        if(logeado.perfil=="1"){

    		        		$state.go("headerLocales.menu");
                      }
                      else{
                      	  $state.go("headerLocales.productos");
                      }
    				// agregrarlo al localstorage o al session storage
    				//console.info("correcto" + $auth.getPayload());
    		      //		$state.go("persona.menu");
    			}else
    			{
    				 console.info($auth.isAuthenticated());
    				$scope.logueo = false; // false--> muestra
    			}
    			
  			})
  			.catch(function(response) {    		
    			$scope.logueo = false; // false--> muestra
  		});
	}		

	$scope.irARegistro = function()
	{
		  $state.go("registro");
	}
});

miApp.controller("controlRegistro",function($scope,$http,$state,FileUploader,jwtHelper,$auth,factoryConServicioUser){
var logeado={};
  if($auth.isAuthenticated()){
   logeado=jwtHelper.decodeToken($auth.getToken());
  
     $scope.usuario={};
     $scope.usuario.nombre="";  
     $scope.usuario.email="";  
     $scope.usuario.password="";
     $scope.usuario.foto="Desert.png";
      if(logeado.perfil=="1"){
      	$scope.mPerfil=false;
         $scope.tituloRegistro="ALTA DE USUARIO";
      }   
  }
  else{
  	         $scope.tituloRegistro="Bienvenido Por Favor Registre";
  $scope.usuario={};
  $scope.mPerfil=true;
   $scope.usuario.nombre="";  
    $scope.usuario.email="";  
    $scope.usuario.password="";
     $scope.usuario.perfil="2";
     }
     
    $scope.uploader = new FileUploader({url: 'http://127.0.0.1/ramos.SPLab42016/vendor/index.php/fotos'});
	$scope.uploader.queueLimit = 10; // indico cuantos archivos permito cargar
	console.info($scope.uploader);
    
     $scope.Guardar=function(){
    	$scope.uploader.uploadAll();
        for (var i = 0; i < $scope.uploader.queue.length; i++) {
      $scope.foto = $scope.uploader.queue[i];
			if (i==0)
				$scope.usuario.foto = $scope.foto.file.name;
			else
				$scope.usuario.foto = $scope.usuario.foto + '-' + $scope.foto.file.name;
         
          console.info("asdad",$scope.usuario);
     }; 
      	  
      
    
           
           factoryConServicioUser.Guardar($scope.usuario)
		.then(function(respuesta) {    
		console.log(respuesta.data); 	
          if(logeado.perfil=="1"){
          	 $state.go('headerLocales.menu');
          }
          else{
		    $state.go("app.login");
}
		  console.info(respuesta);
		},function errorCallback(response) {
			console.log(response);
	 	}); 
	
  //       $http.post('http://127.0.0.1/ramos.SPLab42016/vendor/index.php/usuario/' + JSON.stringify($scope.usuario))
		// .then(function(respuesta) {
		// if(respuesta.data=="USUARIO LOGEADO"){
		// 	alert("NOMBRE DE USUARIO NO DISPONIBLE/ELIJA OTRO");
         
		// }  
		// else
		//  {   	
		//    $state.go("app.login");
		//  }
		//   console.info(respuesta);
		// },function errorCallback(response) {
		// 	console.log(response);
	 // 	});         

	 	$scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
	    console.info('onCompleteItem', fileItem, response, status, headers);
	};
    $scope.uploader.onCompleteAll = function() {
        console.info('Se cargo con exito');
    };


                 
   //   $http.get('PHP/nexo.php',{params:{ accion:"agregar",
     //                                      correo:$scope.usuario.email,
       //                                  password:$scope.usuario.password,
         //                                  perfil:$scope.usuario.perfil,
           //                                foto:$scope.usuario.foto,
                                         
             //                              }}).then(function(respuesta){
               //                                // $state.go('login');
                 //                           console.info("a bd",respuesta);
                     //                     },function errorCallback(respuesta){
                   //                             console.log(respuesta);

                       //                     });     


      }; 	
   
});

miApp.controller("controlInicio",function($scope){
	$scope.DatoTest="Inicio";
});
miApp.controller("controlAltaProducto",function($scope,FileUploader,$http,$state){
     $scope.producto={};
     $scope.producto.nombre="don satur";
     $scope.producto.descripcion="galleta";
     $scope.producto.precio="20";
     $scope.producto.codigo="";
     $scope.producto.foto="Desert.png";
     

    $scope.uploader = new FileUploader({url: 'http://127.0.0.1/ramos.SPLab42016/vendor/index.php/fotos'});
	$scope.uploader.queueLimit = 10;
     
     $scope.guardarProducto=function(){
          $scope.uploader.uploadAll();
        for (var i = 0; i < $scope.uploader.queue.length; i++) {
      $scope.foto = $scope.uploader.queue[i];
			if (i==0)
				$scope.producto.foto = $scope.foto.file.name;
			else
				$scope.producto.foto = $scope.producto.foto + '-' + $scope.foto.file.name;
         
          console.info("asdad",$scope.producto);
     };

        $http.post('http://127.0.0.1/ramos.SPLab42016/vendor/index.php/altaproducto/' + JSON.stringify($scope.producto))
		.then(function(respuesta) {     	
		    $state.go("headerLocales.productos");
		  console.info(respuesta);
		},function errorCallback(response) {
			console.log(response);
	 	});         

	 	$scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
	    console.info('onCompleteItem', fileItem, response, status, headers);
	};
    $scope.uploader.onCompleteAll = function() {
        console.info('Se cargo con exito');
    };


                 
   //   $http.get('PHP/nexo.php',{params:{ accion:"agregar",
     //                                      correo:$scope.usuario.email,
       //                                  password:$scope.usuario.password,
         //                                  perfil:$scope.usuario.perfil,
           //                                foto:$scope.usuario.foto,
                                         
             //                              }}).then(function(respuesta){
               //                                // $state.go('login');
                 //                           console.info("a bd",respuesta);
                     //                     },function errorCallback(respuesta){
                   //                             console.log(respuesta);

                       //                     });     



     };
     


      });

miApp.controller("controlAltaPersonaALta",function($scope,$http,$state){
  	$scope.dato="Alta";
    var flag=0;
  
  	  	$scope.votacion={};
  	$scope.votacion.votacion= "" ;
  	$fecha = new Date();
 	$scope.votacion.fecha =  $fecha.getDay()+ "-"+$fecha.getMonth() + "-" +$fecha.getFullYear() ;
 	$scope.votacion.dni= "" ;
  	$scope.votacion.sexo= "" ;
  
  	$scope.Guardar=function(){
       if($scope.votacion.votacion=="" || $scope.votacion.dni=="" || $scope.votacion.sexo==""){
          flag=1;
          $state.go('persona.alta');
       }
       if($scope.votacion.votacion!="" && $scope.votacion.dni!="" && $scope.votacion.sexo!=""){
       	flag=0;
       }
       alert(flag);
      if(flag==0){

		$http.get('PHP/nexo.php', { 
								params: 
								{	
									accion :"agregarVotacion",									
									votacion :$scope.votacion.votacion,
									fecha :$scope.votacion.fecha,
									dni : $scope.votacion.dni,
									sexo : $scope.votacion.sexo,
			                        			
								}
		})
		.then(function(respuesta) 
		{            	
			console.log(respuesta);
		   $http.get('PHP/nexo.php', { params: {accion :"traer"}})
			.then(function(respuesta) { 
			console.log(respuesta);    					
			 	$scope.ListadoPersonas = respuesta.data.listado;	
			 
			    $state.go('persona.grilla');
			
			},function errorCallback(response) {
				 $scope.ListadoPersonas= [];				
				 $state.go("grilla");
		 	});
    		},function errorCallback(response) {        
        		//aca se ejecuta cuando hay errores
        		console.log( response); 
        		$state.go("grilla");            
    	});
  	}
  	}
	
});

miApp.controller("controlLocales",function($scope, $state,$http){
         

	    $http.get('http://pizeriaargentasrl.esy.es/TP_LAB4_2016/vendor/index.php/traerlocales')
		.then(function(respuesta) {     	
		  //  $state.go("inicio");
		  $scope.locales=respuesta.data;
		  console.info($scope.locales);

		  console.info(respuesta);
		},function errorCallback(response) {
			console.log(response);
	 	});   
	 	$scope.promociones=function(local){
	 		alert(local.direccion);
         $state.go('headerLocales.productos',{local:local.direccion});
	 	};
      
   		
});
miApp.controller("controlGrillaProdcutos",function($scope, $state,$http,jwtHelper,$auth,$stateParams,factoryConServicioProd){


    $scope.altaProd=function(){
    	$state.go("headerLocales.alta");
            
    };

    $scope.Borrar=function(id){
console.info("ASDASD",id);
    factoryConServicioProd.borrar(id).then(function(respuesta){
     console.info(respuesta);
     factoryConServicioProd.traerTodo()
		.then(function(respuesta) {     	
		  //  $state.go("inicio");
		  $scope.productos=respuesta;
		  console.info(respuesta);

		  console.info(respuesta);
		},function errorCallback(response) {
			console.log(response);
	 	}); 
    },function errorCallback(respuesta){
     console.info(respuesta);
    });
    };

        var logeado=jwtHelper.decodeToken($auth.getToken());
       if(logeado.perfil=="2"){
       	   $scope.if=true;
       	   $scope.ifmod=true;
       	   $scope.borrarprod=false;	  
       	   $scope.mostrarcodigo=false;    
       }
         if(logeado.perfil=="3"){
         	$scope.borrarprod=true;
       	   $scope.ifmod=true;	      
       	    $scope.mostrarcodigo=true;
        console.info($scope.borrarprod);
       }
                

       console.info(jwtHelper.decodeToken($auth.getToken()));
	   console.info(factoryConServicioProd);
	   factoryConServicioProd.traerTodo()
		.then(function(respuesta) {     	
		  //  $state.go("inicio");
		  $scope.productos=respuesta;
		  console.info(respuesta);

		  console.info(respuesta);
		},function errorCallback(response) {
			console.log(response);
	 	});   
   		
});

miApp.controller("controlMenuAdmin",function($scope,$state){
    

	$scope.iraAlta=function(){
		$state.go("app.registro");  
	} 

	$scope.AltaUsuarios=function(){
		$state.go("app.registro");  
	} 


	$scope.AltaLocales=function(){
		$state.go("headerLocales.alta");  
	} 
	$scope.iraGrilla=function(){
		$state.go("persona.listadoUsuarios");  
	    } 
   		
});

miApp.controller("controlListadoUsuarios",function($scope,$http, $state,factoryConServicioUser){

	factoryConServicioUser.Traer()
 	.then(function(respuesta) {     	
 		  console.log(respuesta);
      	 $scope.Listadeusuarios = respuesta.data;
          },function errorCallback(response) {
     		 $scope.Listadeusuarios= [];
 	});
			
 $scope.Borrar=function(id){
      console.info("BORRAR",id);
      factoryConServicioUser.borraruser(id).then(function(respuesta){
        
        factoryConServicioUser.Traer()
 	.then(function(respuesta) {     	
 		  console.log(respuesta);
      	 $scope.Listadeusuarios = respuesta.data;
          },function errorCallback(response) {
     		 $scope.Listadeusuarios= [];
 	});



      },function errorCallback(respuesta){


      });
    };

 	$scope.Modificar=function(id){
 		
 		factoryConServicioUser.modificaruser(id).then(function(respuesta){
           var usuarioAeditar = JSON.stringify(respuesta.data);
          console.info(usuarioAeditar);
          $state.go('persona.modificacion',{usuario: usuarioAeditar})


 		},function errorCallback(respuesta){

 		});
		
	
	}		

});	
miApp.controller("controlModificacion",function($scope,$http, $state,$stateParams,factoryConServicioUser){
	$scope.usuario={};
	    $scope.usuario=JSON.parse($stateParams.usuario);
 
       $scope.Guardar=function(){
       factoryConServicioUser.editar($scope.usuario).then(function(respuesta){
           $state.go('persona.listadoUsuarios')

       },function errorCallback(respuesta){


       });
	   
          };
	});

miApp.controller("controlgrillaPersona",function($scope,$http, $state){
	$scope.dato="Grilla";});