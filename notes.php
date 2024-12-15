<?php
header('Content-Type: application/json');
$host = 'localhost';
$user = 'root';
$password = '';
$dbName = 'notes_app';
$conn = new mysqli($host, $user, $password, $dbName);

if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
}

$action = $_GET['action'] ?? null;

if ($action === 'fetch') {
    $result = $conn->query('SELECT * FROM notes ORDER BY id DESC');
    $notes = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($notes);
} elseif ($action === 'add') {
    $data = json_decode(file_get_contents('php://input'), true);
    $content = $conn->real_escape_string($data['content']);
    $conn->query("INSERT INTO notes (content) VALUES ('$content')");
    echo json_encode(['status' => 'success']);
} elseif ($action === 'delete') {
    $id = intval($_GET['id']);
    $conn->query("DELETE FROM notes WHERE id=$id");
    echo json_encode(['status' => 'success']);
}

$conn->close();
