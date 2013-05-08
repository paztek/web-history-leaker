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
     * @var boolean
     *
     * @Column(name="checked", type="boolean")
     */
    protected $checked;

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
     * Set checked
     *
     * @param boolean $checked
     * @return Url
     */
    public function setChecked($checked)
    {
        $this->checked = $checked;
    
        return $this;
    }

    /**
     * Get checked
     *
     * @return boolean 
     */
    public function getChecked()
    {
        return $this->checked;
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
}