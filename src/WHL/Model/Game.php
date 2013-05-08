<?php
/**
 * Author: Damien
 * Date: 08/05/13
 */

namespace WHL\Model;

/**
 * Class Game
 * @package WHM\Model
 *
 * @Entity
 * @Table(name="game")
 */
class Game {

    /**
     * @var integer
     *
     * @Id
     * @GeneratedValue("AUTO")
     * @Column(name="id", type="integer")
     */
    protected $id;

    /**
     * @var boolean
     *
     * @Column(name="played", type="boolean")
     */
    protected $played;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @OneToMany(targetEntity="\WHL\Model\Url", mappedBy="game")
     */
    protected $urls;

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
     * Set played
     *
     * @param boolean $played
     * @return Game
     */
    public function setPlayed($played)
    {
        $this->played = $played;
    
        return $this;
    }

    /**
     * Get played
     *
     * @return boolean 
     */
    public function getPlayed()
    {
        return $this->played;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->urls = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Add urls
     *
     * @param \WHL\Model\Url $urls
     * @return $this
     */
    public function addUrl(Url $urls)
    {
        $this->urls[] = $urls;
    
        return $this;
    }

    /**
     * Remove url
     *
     * @param Url $url
     * @return $this
     */
    public function removeUrl(Url $url)
    {
        $this->urls->removeElement($url);

        return $this;
    }

    /**
     * Get urls
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUrls()
    {
        return $this->urls;
    }
}