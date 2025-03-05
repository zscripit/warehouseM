<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Datos de conexión a la base de datos
$host = 'localhost';
$dbname = 'bd_awos_perjor225';
$username = 'perjor225';
$password = 'pcj@2023371055';

// Obtener los datos enviados desde el frontend
$data = json_decode(file_get_contents("php://input"), true);
$correo = $data['correo'];

try {
    // Conectar a la base de datos
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Actualizar el campo token a NULL
    $stmt = $pdo->prepare("UPDATE empleados SET token = NULL WHERE correo = :correo");
    $stmt->bindParam(':correo', $correo);
    $stmt->execute();

    // Verificar si se actualizó correctamente
    if ($stmt->rowCount() > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Token eliminado correctamente',
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No se encontró el usuario',
        ]);
    }
} catch (PDOException $e) {
    // Error en la conexión o consulta
    echo json_encode([
        'success' => false,
        'message' => 'Error en el servidor: ' . $e->getMessage(),
    ]);
}
?>