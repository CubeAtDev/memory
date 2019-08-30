<?php

class Score
{
    private $time;

    public function __construct(int $data){
        $this->hydrate($data);
    }

    /*    Hydratation de l'objet    */
    public function hydrate (int $data)
    {
        if(!empty($data)){
            $this->setTime($data);
        }
    }

    /* Setter */

    /**
     * @param int $time
     * @return void
     */
    public function setTime( int $time)
    {
        $this->time = $time;
        
    }

    /* Getter */

    /**
     * @return int 
     */
    public function getTime()
    {
        return $this->time;
    }
}