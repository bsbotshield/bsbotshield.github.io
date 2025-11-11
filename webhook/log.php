$zapier_url = 'https://hooks.zapier.com/hooks/catch/YOUR_ZAPIER_ID/';
$zap_data = array_merge($data, ['count' => substr_count(file_get_contents('bot_log.txt'), 'bot_log')]);
$ch = curl_init($zapier_url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($zap_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_exec($ch);
curl_close($ch);
