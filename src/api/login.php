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
$contra = $data['contra'];

try {
    // Conectar a la base de datos
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consultar si el usuario existe
    $stmt = $pdo->prepare("SELECT * FROM empleados WHERE correo = :correo");
    $stmt->bindParam(':correo', $correo);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Verificar la contraseña usando password_verify
        if (password_verify($contra, $user['contra'])) {
            // Generar un token único
            $token = md5($correo . time());

            // Actualizar el campo token en la base de datos
            $updateStmt = $pdo->prepare("UPDATE empleados SET token = :token WHERE idEmpleado = :idEmpleado");
            $updateStmt->bindParam(':token', $token);
            $updateStmt->bindParam(':idEmpleado', $user['idEmpleado']);
            $updateStmt->execute();

            // Contraseña válida, devolver los datos del usuario y el token
            echo json_encode([
                'success' => true,
                'message' => 'Inicio de sesión exitoso',
                'user' => [
                    'idEmpleado' => $user['idEmpleado'],
                    'userName' => $user['userName'],
                    'nombreUsuario' => $user['nombreUsuario'],
                    'apellidoUsuario' => $user['apellidoUsuario'],
                    'almacen' => $user['almacen'],
                    'correo' => $user['correo'],
                    'token' => $token // Incluir el token en la respuesta
                ]
            ]);
        } else {
            // Contraseña incorrecta
            echo json_encode([
                'success' => false,
                'message' => 'Credenciales incorrectas'
            ]);
        }
    } else {
        // Usuario no encontrado
        echo json_encode([
            'success' => false,
            'message' => 'Credenciales incorrectas'
        ]);
    }
} catch (PDOException $e) {
    // Error en la conexión o consulta
    echo json_encode([
        'success' => false,
        'message' => 'Error en el servidor: ' . $e->getMessage()
    ]);
}
?>