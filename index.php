<?php

/* La création d'un autolload très simple permet de charger automatiquement les class nécessaire lorsque celle-ci sont appelées */
spl_autoload_register(function ($class_name) {
    include 'lib/class/' . $class_name . '.php';
});



/* Création de la connection avec la BDD. Ici j'utilise un objet PDO, mais il est possible de créer un objet Mysql (exemple lib/class/Mysql.php). 
l'instanciation serait alors :
$db = new Mysql('localhost', 'memory', 'root', 'user');
*/
$db = new PDO('mysql:host=localhost;dbname=memory','root','');
// On récupère une alerte en cas d'échec d'une requête
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

$scoreManager = new ScoreManager($db);

// On traite ici les chrono reçus via la méthode post
if($_POST){
    $score = new Score((int)$_POST['score']); // création d'un nouvel objet Score
    $scoreManager->add($score); // Enristrement de ce dernier en BDD
}

$scores = $scoreManager->best();
?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Jeu de mémoire</title>
  <link rel="stylesheet" href="css/memory.css">
</head>
  
<body>
  <div class="jumbotron">
    <h1>Jeu de mémoire</h1>
  </div>
  <div class="container scores">
    <h2>Meilleurs chronos</h2>
    <?php
    if(!empty($scores)){ ?>
      <ul class="scoreList">
          <?php 
          foreach( $scores as $score){
              $time = $score->getTime() / 1000;
              echo '<li>' . $time . ' secondes</li>';
          }
          ?>
      </ul>
        <?php }else{
          echo 'Il n\'y pas encore de chrono enregistré';
        } ?>
    <h3 class="play">Cliquez ici pour jouer !</h3>
  </div>
  <div class="container">
        <div class="game"></div>
    </div>
    <div id="pbarContainer">
        <div id="pbar"></div>
    </div>
  <!-- Chargement des scripts js -->
  <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
  <script src="js/memory.js"></script>
  
</body>

</html>