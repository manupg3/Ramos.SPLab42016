<?php
require_once"AccesoDatos.php";

class Persona
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
 	public $user;
 	public $nombre;
  	public $pass;
	public $foto;
    public $perfil;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	 	public function GetNom()
	{
		return $this->nombre;
	}
	 	public function GetUser()
	{
		return $this->user;
	}
	 	public function GetPass()
	{
		return $this->pass;
	}

	public function GetFoto()
	{
		return $this->foto;
	}
	
	 	public function GetPerfil()
	{
		return $this->perfil;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
		public function SetNom($valor)
	{
		$this->nombre = $valor;
	}
		public function SetUser($valor)
	{
		$this->user = $valor;
	}
		public function SetPass($valor)
	{
		$this->pass = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
		public function SetPerfil($valor)
	{
		$this->perfil = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($dni=NULL)
	{
		if($dni != NULL){
			$obj = Persona::TraerUnaPersona($dni);
			
			$this->apellido = $obj->apellido;
			$this->nombre = $obj->nombre;
			$this->dni = $dni;
			$this->foto = $obj->foto;
		    $this->foto = $obj->user;
		    $this->foto = $obj->pass;
		            
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->user."-".$this->nombre."-".$this->pass.$this->foto."-".$this->perfil;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnUsuario($ParametroU,$ParametroC) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where id =:id");
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM persona WHERE correo=:correo AND password=:password");
		$consulta->bindValue(':correo', $ParametroU, PDO::PARAM_INT);
	    $consulta->bindValue(':password', $ParametroC, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('persona');
		return $personaBuscada;	
					
	}
		public static function TraerUsuarioPorId($id) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where id =:id");
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM persona WHERE id=:id");
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
	
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('persona');
		return $personaBuscada;	
					
	}
		
	
	public static function TraerTodosUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM persona");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "persona");	
		return $arrPersonas;
	}
	
	public static function BorrarUsuario($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM persona WHERE id=:id");	
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}

	public static function ModificarUsuario($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE persona SET nombre=:nombre,correo=:correo,password=:password,
				perfil=:perfil WHERE id=:id");
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
		    $consulta->bindValue(':password',$usuario->password, PDO::PARAM_STR);
			$consulta->bindValue(':perfil', $usuario->perfil, PDO::PARAM_STR);
			
			//$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}
	
	// public static function ModificarPersona($persona)
	// {
	// 		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
	// 		/*$consulta =$objetoAccesoDato->RetornarConsulta("
	// 			update persona 
	// 			set nombre=:nombre,
	// 			apellido=:apellido,
	// 			foto=:foto
	// 			WHERE id=:id");
	// 		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();*/ 
	// 		$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarPersona(:id,:nombre,:apellido,:foto)");
	// 		$consulta->bindValue(':id',$persona->id, PDO::PARAM_INT);
	// 		$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
	// 		$consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
	// 		$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
	// 		return $consulta->execute();
	// }

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarUsuario($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO persona (correo,nombre,password,perfil,foto) VALUES(:correo,:nombre,:password,:perfil,:foto)");
		$consulta->bindValue(':correo', $persona->email, PDO::PARAM_STR);
		$consulta->bindValue(':nombre', $persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':password', $persona->password, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
		$consulta->bindValue(':perfil', $persona->perfil, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



}
