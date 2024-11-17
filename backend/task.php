<?php
header('Content-Type: application/json');
require 'db.php'; // Conexión a la base de datos

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM tasks ORDER BY created_at DESC");
        $tasks = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($tasks);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $description = $data['description'] ?? '';
        if (!empty($description)) {
            $stmt = $conn->prepare("INSERT INTO tasks (description) VALUES (?)");
            $stmt->bind_param('s', $description);
            $stmt->execute();
            echo json_encode(['id' => $conn->insert_id, 'description' => $description]);
        } else {
            echo json_encode(['error' => 'Descripción vacía']);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!empty($id) && is_numeric($id)) {
            $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
            $stmt->bind_param('i', $id);
            $stmt->execute();
            echo json_encode(['message' => 'Tarea eliminada']);
        } else {
            echo json_encode(['error' => 'ID inválido']);
        }
        break;

    default:
        echo json_encode(['error' => 'Método no soportado']);
        break;
}
?>
