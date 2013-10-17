<!DOCTYPE html>

<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
	<title>untitled</title>
	<style type="text/css" media="screen">
		label {display: block;}
	</style>
</head>
<body>

<?php echo form_open_multipart('upload/do_upload');?>

<input type="file" name="userfile" size="20" />

<br /><br />

<input type="submit" value="upload" />
<?php echo form_close(); ?>


     <h2>Create</h2>
	<?php echo form_open_multipart('site/create');?>
	
	<p>
		<label for="title">Title:</label>
		<input type="text" name="title" id="title" />
	</p>
	
	<p>
		<label for="content">Content:</label>
		<input type="text" name="content" id="content" />
	</p>
     <p>
         <?php echo form_label('File 2: ', 'file2') ?>
         <?php echo form_upload('file2') ?>
     </p>
	<p>
        <?php echo form_submit('submit', 'Enviar formulário') ?>
	</p>
	<?php echo form_close(); ?>
	
	<hr />
	
	<h2>Read</h2>
	<?php if(isset($records)) : foreach($records as $row) : ?>
	
	<h2><?php echo anchor("site/delete/$row->id", $row->title); ?> </h2>
	<div><?php echo $row->content; ?></div>		

	<?php endforeach; ?>

	<?php else : ?>	
	<h2>No records were returned.</h2>
	<?php endif; ?>
	
	<hr />
	
	<h2>Delete</h2>
	
	<p>
		To sample the delete method, simply click on one of the headings listed above. A delete
		query will automatically run.
	</p>
	
</body>
</html>	