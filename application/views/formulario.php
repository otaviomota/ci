<?= doctype('html4-trans'); ?>
<html>
<head>
    <title>Formulário</title>
    <?php    echo meta($meta);?>

    <?php echo link_tag($link_css); ?>
    </head>
<body>

<?php echo $error;?>


<h2>Create</h2>
<?php echo br(3); ?>
<?php echo form_open_multipart('formulario/do_upload');?>

<?php echo form_fieldset('Formulário');?>
<p>
    <?php echo form_label('Combo: ', 'combo') ?>
    <?php echo form_dropdown('shirts', $options, 'large'); ?>
</p>

    <p>
        <?php echo form_label('Arquivos: ', 'userfile') ?>
        <?php echo form_upload('userfile') ?>
    </p>

<br /><br />

    <?php echo form_submit('submit', 'Enviar formulário') ?>
<?php echo form_fieldset_close();?>

</form>

</body>
</html>