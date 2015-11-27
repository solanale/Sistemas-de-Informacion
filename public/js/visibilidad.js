function ocultarId(id)
{
 document.getElementById(id).style.display = 'none';
}

function ocultarClass(c)
{
	var cl = document.getElementsByClassName(c);

	for (i in cl) {
		cl[i].style.display = 'none';
	}
}

function mostrarBlockId(id)
{
 document.getElementById(id).style.display = 'block';
}

function mostrarBlockClass(c)
{
	var cl = document.getElementsByClassName(c);

	for (i in cl) {
		cl[i].style.display = 'block';
	}
}

function mostrarInlineId(id)
{
 document.getElementById(id).style.display = 'inline';
}

function mostrarInlineClass(c)
{
	var cl = document.getElementsByClassName(c);

	for (i in cl) {
		cl[i].style.display = 'inline';
	}
}

function visibilidadBlockId(id)
{
	if(document.getElementById(id).style.display == 'block')
	{
		document.getElementById(id).style.display = 'none';
	}
	else
	{
		document.getElementById(id).style.display = 'block';
	}
}

function visibilidadBlockClass(c)
{
	var cl = document.getElementsByClassName(c);

	for (i in cl) {
		if(cl[i].style.display == 'block')
		{
			cl[i].style.display = 'none';
		}
		else
		{
			cl[i].style.display = 'block';
		}
	}
}

function visibilidadInlineId(id)
{
	if(document.getElementById(id).style.display == 'inline')
	{
		document.getElementById(id).style.display = 'none';
	}
	else
	{
		document.getElementById(id).style.display = 'inline';
	}
}

function visibilidadInlineClass(c)
{
	var cl = document.getElementsByClassName(c);

	for (i in cl) {
		if(cl[i].style.display == 'inline')
		{
			cl[i].style.display = 'none';
		}
		else
		{
			cl[i].style.display = 'inline';
		}
	}
}
