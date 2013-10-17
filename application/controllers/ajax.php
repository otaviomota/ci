<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Ajax extends CI_Controller
{

    /* The default function that gets called when visiting the page */
    public function index() {
        $this->load->view('time_view');
    }
}?>