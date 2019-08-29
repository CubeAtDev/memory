<?php

//namespace Memory;

class ScoreManager
{
    private $_db;

    public function __construct(PDO $db)
    {
        $this->setDb($db);
    }

    /* Setter */

    public function setDb(PDO $db)
    {
        $this->_db = $db;
    }

    /* Query */
    public function add(Score $score)
    {
        $q = $this->_db->prepare("INSERT INTO times(time) VALUES (:time)");
        $q->bindValue(':time', $score->getTime());
        $q->execute();
    }

    /**
     * @return Array $scores 
     */
    public function best()
    {
        $scores= [];

        $q = $this->_db->prepare("SELECT time FROM times  ORDER BY time DESC LIMIT 5");
        $q->execute();

        while ($datas = $q->fetch(PDO::FETCH_ASSOC)){
            $scores[] = new Score((int)$datas['time']);
        }

        return $scores;

    }

}