<?php

class formulario extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form', 'url', 'html'));

        $this->load->driver('minify');

        $csss = $this->minify->combine_directory('assets/css/');
        $this->minify->save_file($csss,'assets/min/minified.css');

        $jss =$this->minify->combine_directory('assets/js/');
        $this->minify->save_file($jss,'assets/min/minified.js');
    }

    function index()
    {
        $link_css = array(
                'href' => 'assets/min/minified.css',
                'rel' => 'stylesheet',
                'type' => 'text/css'
        );

        $meta = array(
            array('name' => 'robots', 'content' => 'no-cache'),
            array('name' => 'description', 'content' => 'My Great Site'),
            array('name' => 'keywords', 'content' => 'love, passion, intrigue, deception'),
            array('name' => 'robots', 'content' => 'no-cache'),
            array('name' => 'Content-type', 'content' => 'text/html; charset=utf-8', 'type' => 'equiv')
        );

        $options = array(
                        'pequeno'  => 'Pequeno',
                        'medio'    => 'Médio',
                        'grande'   => 'Grande',
                        'Extra Grande' => 'Extra grande',
        );

        $this->load->view('formulario', array('error' => ' ', 'meta' => $meta, 'link_css' => $link_css, 'options' => $options));
    }

    function do_upload()
    {
        $config['upload_path'] =  './uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        /*
        $config['max_size']	= '100';
        $config['max_width']  = '1024';
        $config['max_height']  = '768';
        */

        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload())
        {
            $error = array('error' => $this->upload->display_errors());

            $this->load->view('upload_form', $error);
        }
        else
        {
            $data = array('upload_data' => $this->upload->data());

            $this->load->view('upload_success', $data);
        }
    }
}
?>