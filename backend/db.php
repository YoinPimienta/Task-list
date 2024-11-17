<?php
$host = 'localhost'; // Cambia si usas un servidor diferente
$user = 'root';      // Usuario de MySQL
$password = '';      // Contraseña del usuario
$dbname = 'tasklist'; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
