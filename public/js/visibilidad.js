function ocultarId(id)
{
 document.getElementById(id).style.display = 'none';
}

function mostrarBlockId(id)
{
 document.getElementById(id).style.display = 'block';
}

function mostrarInlineId(id)
{
 document.getElementById(id).style.display = 'inline';
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
