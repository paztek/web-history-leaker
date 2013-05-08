<?php
/**
 * Author: Damien
 * Date: 08/05/13
 */

namespace WHL\Model;

/**
 * Class Url
 * @package WHM\Model
 *
 * @Entity
 * @Table(name="url")
 */
class Url {

    /**
     * @var integer
     *
     * @Id
     * @GeneratedValue("AUTO")
     * @Column(name="id", type="integer")
     */
    protected $id;

    /**
     * @var string
     *
     * @Column(name="href", type="string", length=255)
     */
    protected $href;

    /**
     * @var integer
     *
     * @Column(name="counter", type="integer")
     */
    protected $counter;

    /**
     * @var \WHL\Model\Game
     *
     * @ManyToOne(targetEntity="\WHL\Model\Game", inversedBy="urls")
     */
    protected $game;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set href
     *
     * @param string $href
     * @return Url
     */
    public function setHref($href)
    {
        $this->href = $href;
    
        return $this;
    }

    /**
     * Get href
     *
     * @return string 
     */
    public function getHref()
    {
        return $this->href;
    }

    /**
     * Set game
     *
     * @param \WHL\Model\Game $game
     * @return $this
     */
    public function setGame(Game $game = null)
    {
        $this->game = $game;
    
        return $this;
    }

    /**
     * Get game
     *
     * @return \WHL\Model\Game 
     */
    public function getGame()
    {
        return $this->game;
    }

    /**
     * Set counter
     *
     * @param integer $counter
     * @return Url
     */
    public function setCounter($counter)
    {
        $this->counter = $counter;
    
        return $this;
    }

    /**
     * Get counter
     *
     * @return integer 
     */
    public function getCounter()
    {
        return $this->counter;
    }
}