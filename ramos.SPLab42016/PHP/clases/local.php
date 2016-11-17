<?php
require_once"AccesoDatos.php";

class local
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
 	public $direccion;
  	public $localidad;
	public $foto;
    public $latitud;
    public $longitud;


//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	 	public function GetDir()
	{
		return $this->direccion;
	}
	 	public function GetLoc()
	{
		return $this->localidad;
	}

	public function GetFoto()
	{
		return $this->foto;
	}
	
	 	public function GetLat()
	{
		return $this->latitud;
	}

 	public function GetLon()
	{
		return $this->longitud;
	}
	public function SetId($valor)
	{
		$this->id = $valor;
	}
		public function SetDir($valor)
	{
		$this->direccion = $valor;
	}
		public function SetLoc($valor)
	{
		$this->localidad = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
		public function SetLon($valor)
	{
		$this->longitud = $valor;
	}
		public function SetLat($valor)
	{
		$this->latitud = $valor;
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
	  	return $this->direccion."-".$this->localidad.$this->foto."-".$this->latitud."-".$this->longitud;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnUsuario($ParametroU,$ParametroC) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where id =:id");
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:correo,:password)");
		$consulta->bindValue(':correo', $ParametroU, PDO::PARAM_INT);
	    $consulta->bindValue(':password', $ParametroC, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('persona');
		return $personaBuscada;	
					
	}
		
	
	public static function TraerTodosLocales()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from locales");
		$consulta->execute();			
		$arrLocales= $consulta->fetchAll(PDO::FETCH_CLASS, "local");	
		return $arrLocales;
	}
	
	public static function BorrarPersona($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}

	public static function ModificarPersona($id, $nombre, $apellido)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarPersonaSinFoto(:id,:nombre,:apellido)");
			$consulta->bindValue(':id',$persona->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
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

	public static function InsertarLocal($local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO locales (direccion,localidad,latitud,longitud,foto) VALUES(:direccion,:localidad,:latitud,:longitud,:foto)");
		$consulta->bindValue(':direccion', $local->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':localidad', $local->localidad, PDO::PARAM_STR);
		$consulta->bindValue(':latitud', $local->latitud, PDO::PARAM_STR);
		$consulta->bindValue(':longitud', $local->longitud, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $local->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



}