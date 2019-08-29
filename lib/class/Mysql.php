<?php

namespace Memory;

class Mysql
{
    protected $host,
              $dbname,
              $user,
              $pass,
              $sql_connect_id = 0;

    public function __construct( $host, $dbname, $user, $pass)
    {
        $this->host = $host;
        $this->dbname = $name;
        $this->user = $user;
        $this->pass = $pass; 
    }

    /**
     * @return Boolean
     */
    public function connect()
    {
        // On controle que la connection ne soit pas déjà effective
        if($this->sql_connect_id == 0){
            $this->sql_connect_id = mysql_connect( $this->host, $this->dbname, $this->user, $this->pass );
            // Si la connection échoue
            if(!$this->sql_connect_id){
                return false;
            }
        }
        return true;
    }

    /**
     * @return Void
     */
    public function closeConnect()
    {
        @mysql_close($this->sql_connect_id);
    }

    /*  Les fonctions qui seront ajoutée ensuite contiendront les query */
}