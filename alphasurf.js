var alt_down = 		false;
var x_down =		false;
var global_a_idx = 	0;
var aa = 			document.getElementsByTagName('a');
var aa_sanitized =  aa;
var charmatch;
var oldbg;
var started = false;
var old_idx;

//write out the links
for (var i = 0 ; i < aa.length; i++){
	console.log(aa[i].innerHTML);
}
 

function search_links()
{	
	
	for (var i = global_a_idx ; i < aa.length; i++)
	{			
		var 	meat = aa[i].innerHTML;
		var 	wrapper = document.createElement('div');
							
		wrapper.innerHTML = meat;

		//buried
		while(	wrapper.innerHTML != null && 
				wrapper.firstChild != null && 
				wrapper.firstChild.innerHTML != null)
		{										
			wrapper.innerHTML = wrapper.firstChild.innerHTML;
			meat = wrapper.innerHTML;
		}

		meat = meat.replace(/\s+/g,'');	
		meat = meat.replace(/\"+/g,'');
		
		if( charmatch == meat.substring(0,1).toUpperCase() )
		{
			console.log(aa[i].innerHTML);
			
			//replace old bg
			if(started == true){
				
				console.log("trying to replace oldbg");
				console.log(aa[old_idx]);
				
				if(oldbg != "" && oldbg != undefined)
				{	
					console.log("!= nothing," + oldbg);
					aa[old_idx].style.backgroundColor = oldbg;					
				}
				else
				{
					console.log("removing property.");
					console.log(aa[old_idx].innerHTML);
					aa[old_idx].style.removeProperty('background-color');
				}
			}
			
			//
			
			//oldbg = aa[i].style.backgroundColor;
			//console.log(oldbg);
			
			aa[i].style.backgroundColor = "rgb(193,255,193)";
			aa[i].focus();
			
			started = true;
			old_idx = i;
			global_a_idx = i+1;
			
			return true;
		}
	}
	
	return false;	
}	

 
//set handler
document.onkeydown = kd;
document.onkeyup= ku; 

function kd(event) 
{
	console.log(event.keyCode);
 
	var kC = event.keyCode
 
	if(kC == 88)
	{
		//console.log("x key down");
		x_down = true; 	
	} 
	else
	{
		if(	x_down == 	true)
		{			
			charmatch = String.fromCharCode(kC);
			//console.log(String.fromCharCode(kC));
			var keeplooking = true;
			
			keeplooking = search_links();
			//console.log("keep looking returned: " + keeplooking);
			
			//loop around
			if(keeplooking == false)
			{				
				global_a_idx = 0;
				search_links();
			}			
		}
	}
}

function ku(event) 
{
	console.log(event.keyCode);
 
	var kC = event.keyCode

	if(kC == 88)
	{
		console.log("x key up");
		x_down = false; 	
	}		
 }
