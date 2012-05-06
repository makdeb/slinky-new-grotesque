
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ru" xml:lang="ru">
<head>
<title>Пример преобразования данных JSON</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="author" content="Gennady A. Samkov" />
<meta name="email" content="smkv@mail.ru" />
<meta name="domain" content="linkexchanger.su" />
<meta name="robots" content="noindex" />
<style type="text/css">
* {
    margin:0;
    padding:0;
}

html, body {
    background-color:#E2F2E2;
    font-family: "Trebuchet MS", Tahoma, Verdana, Arial, Helvetica, sans-serif;
    font-size: 8pt;
}

</style>
</head>
<body>

<?php if (isset($json)) : ?>
	"Объект JSON: ";
	
<?php	var_dump($json); ?> 
<?php endif; ?>	

<!--<?php foreach ($categories as $category) : ?>

<?php foreach($category as $field => $value) : ?>

<?php	var_dump($value); ?> 

<?php endforeach ; ?>

<?php endforeach ; ?>-->
<?php	var_dump($categories); ?> 

<h2>Create new item</h2>
<?php echo form_open($this->uri->uri_string()) ?>

	<label for="firm">Firm</label> 
	<input type="input" name="firm" /><br />

	<label for="model">model</label> 
	<input type="input" name="model" /><br />
	
	<label for="year">year</label> 
	<input type="input" name="year" /><br />
	
	<label for="price">price</label> 
	<input type="input" name="price" /><br />
	
	<label for="seller">seller</label> 
	<input type="input" name="seller" /><br />
	
	<input type="submit" name="submit" value="Create news item" /> 

</form>

</body>
</html>