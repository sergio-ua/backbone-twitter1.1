<?php

require_once('TwitterAPIExchange.php');

//PUT YOUR CIKLUM CREDENTIALS HERE!
$settings = array(
    'oauth_access_token'        => "",
    'oauth_access_token_secret' => "",
    'consumer_key'              => "",
    'consumer_secret'           => ""
);
$twitter = new TwitterAPIExchange($settings);

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    $getfield = '?username=ciklum';
    $requestMethod = 'GET';
    echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
    die();
}else{
    $res = json_decode(file_get_contents('php://input'));

    if ($res->favorited == true) {
	    $url = 'https://api.twitter.com/1.1/favorites/create';
    }else{
	    $url = 'https://api.twitter.com/1.1/favorites/destroy';
    }
    $requestMethod = 'POST';
    $postfields = array(
        'username' => 'ciklum', 
        'ID' => $res->id
    );
    echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($postfields)
             ->performRequest();
    die();
}


