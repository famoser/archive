<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 25.12.2015
 * Time: 20:24
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\framework\logging\logger;
use famoser\opc\htmlnodes\base\basenode;

class table extends basenode
{
    private $body;
    private $head;

    public function __construct($id = null, $hover = false)
    {
        parent::__construct("table", $id);
        $this->addClass("table");
        if ($hover)
            $this->addClass("table-hover");
    }

    public function addRow(array $content)
    {
        if ($this->body == null)
            $this->addBody();

        $row = new basenode("tr");
        foreach ($content as $item) {
            $rowcontent = new basenode("td");
            $rowcontent->setText($item);
            $row->addChildren($rowcontent);
        }
        if ($this->body instanceof basenode) {
            $this->body->addChildren($row);
        }
    }

    public function addRows(array $rows)
    {
        foreach ($rows as $row) {
            $this->addRow($row);
        }
    }

    public function addHeader(array $header)
    {
        if ($this->head != null)
            logger::getInstance()->doLog(LOG_LEVEL_ASSERT, "added header twice with content " . json_encode($header));
        else
            $this->addHead();

        $row = new basenode("th");
        foreach ($header as $item) {
            $rowcontent = new basenode("td");
            $rowcontent->setText($item);
            $row->addChildren($rowcontent);
        }
        if ($this->head instanceof basenode)
            $this->head->addChildren($row);
    }

    private function addHead()
    {
        $this->head = new basenode("thead");
        if ($this->body != null) {
            $this->clearChildren();
            $this->addChildren($this->head);
            $this->addChildren($this->body);
        } else {
            $this->addChildren($this->head);
        }
    }

    private function addBody()
    {
        $this->body = new basenode("tbody");
        $this->addChildren($this->body);
    }
}