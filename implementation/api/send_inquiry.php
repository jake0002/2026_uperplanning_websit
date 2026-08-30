<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$company = isset($input['company']) ? trim($input['company']) : '고객사';
$email = isset($input['email']) ? trim($input['email']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

if (empty($name) && empty($phone) && empty($email)) {
    echo json_encode(['success' => false, 'message' => '필수 입력값이 누락되었습니다.']);
    exit;
}

$to = 'jake@superplanning.co.kr';
$subject = "=?UTF-8?B?" . base64_encode("[슈퍼플래닝 프로젝트 문의] {$name} - {$company}") . "?=";

$body = "=== 슈퍼플래닝 신규 프로젝트 문의 접수 ===\n\n";
$body .= "・ 담당자명 / 이름: {$name}\n";
$body .= "・ 연락처: {$phone}\n";
$body .= "・ 회사명 / 소속: {$company}\n";
$body .= "・ 이메일 주소: {$email}\n";
$body .= "・ 접수 시간: " . date('Y-m-d H:i:s') . "\n\n";
$body .= "=== 프로젝트 상세 내용 및 주요 요청사항 ===\n";
$body .= "{$message}\n\n";
$body .= "========================================\n";

$headers = "From: jake@superplanning.co.kr\r\n";
if (!empty($email)) {
    $headers .= "Reply-To: {$email}\r\n";
}
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mailSent = @mail($to, $subject, $body, $headers);

echo json_encode([
    'success' => true,
    'mailSent' => $mailSent,
    'message' => '프로젝트 문의가 정상적으로 전송되었습니다.'
]);
