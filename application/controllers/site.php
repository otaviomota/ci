<?php

class Site extends CI_Controller
{
	function index()
	{
		$data = array();
		
		if($query = $this->site_model->get_records())
		{
			$data['records'] = $query;
		}
		
		$this->load->view('options_view', $data);
	}
	
	function do_upload()
	{
        if (isset($_POST['submit']))
        {
            //$this->load->library('upload');

            $config['upload_path'] = './uploads/';
            $config['allowed_types'] = 'gif|jpg|png';
            $config['max_size'] = '100';
            $config['max_width']  = '1024';
            $config['max_height']  = '768';

            //$this->upload->initialize($config);
            $this->load->library('upload', $config);
            if ( ! $this->upload->do_upload())
            {
                $error = array('error' => $this->upload->display_errors());
                print_r("error " . $this->upload->display_errors());
                die;

               // $this->load->view('upload_form', $error);
            }
            else
            {
                $data = array('upload_data' => $this->upload->data());
                print_r( "data " . $this->upload->data());
                die;
                //$this->load->view('upload_success', $data);
            }/*

            foreach($_FILES as $field => $file)
            {
                // No problems with the file
                if($file['error'] == 0)
                {
                    // So lets upload
                    if ($this->upload->do_upload($field))
                    {
                        $data2 = $this->upload->data();
                    }
                    else
                    {
                        $errors = $this->upload->display_errors();
                    }
                }
            }*/
        }


		$data = array(
			'title' =>  $this->input->post('title'),
			'content' => $this->input->post('content')
		);
		
		$this->site_model->add_record($data);
		$this->index();
	}
	
	function update()
	{
		$data = array(
			'title' => 'My Freshly UPDATED Title',
			'content' => 'Content should go here; it is updated.'	
		);
		
		$this->site_model->update_record($data);
	}
	
	
	function delete()
	{
		$this->site_model->delete_row();
		$this->index();
	}
}
