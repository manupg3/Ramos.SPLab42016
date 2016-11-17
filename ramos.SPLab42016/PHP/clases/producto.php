<?php
require_once"AccesoDatos.php";

class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
 	public $nombre;
  	public $descripcion;
	public $foto;
    public $precio;
    public $codigo;



//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	 	public function GetCod()
	{
		return $this->codigo;
	}
	 	public function GetNom()
	{
		return $this->nombre;
	}
	 	public function GetDes()
	{
		return $this->descripcion;
	}

	public function GetFoto()
	{
		return $this->foto;
	}
	
	 	public function GetPrec()
	{
		return $this->precio;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
		public function SetCod($valor)
	{
		$this->codigo = $valor;
	}
		public function SetNom($valor)
	{
		$this->nombre = $valor;
	}
		public function SetDes($valor)
	{
		$this->descripcion = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
		public function SetPrec($valor)
	{
		$this->precio = $valor;
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
	  	return $this->nombre."-".$this->descripcion.$this->precio."-".$this->foto."-".$this->codigo;
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
		
	
	public static function TraerTodosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM productos");
		$consulta->execute();			
		$arrProductos= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");	
		return $arrProductos;
	}
	
	public static function BorrarProducto($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM productos WHERE id=:id");	
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
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

	public static function InsertarProducto($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO productos (nombre,descripcion,foto,precio,codigo) VALUES(:nombre,:descripcion,:foto,:precio,:codigo)");
		$consulta->bindValue(':nombre', $producto->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':descripcion', $producto->descripcion, PDO::PARAM_STR);
		$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $producto->foto, PDO::PARAM_STR);
		$consulta->bindValue(':codigo', $producto->codigo, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//



}